<?php

class SLMS_Enrolled_Courses {

    public static function init(){
        remove_all_actions( 'wp_ajax_stm_lms_get_user_courses' );
        add_action( 'wp_ajax_stm_lms_get_user_courses', array(self::class, 'get_user_courses') );
    }

    public static function get_user_courses() {
        check_ajax_referer( 'stm_lms_get_user_courses', 'nonce' );

        $offset = ( ! empty( $_GET['offset'] ) ) ? intval( $_GET['offset'] ) : 0;

        $sort = ( ! empty( $_GET['sort'] ) ) ? sanitize_text_field( $_GET['sort'] ) : 0;

        $r = self::_get_user_courses( $offset, $sort );

        wp_send_json( apply_filters( 'stm_lms_get_user_courses_filter', $r ) );
    }

    public static function _get_user_courses( $offset, $sort = 'date_low' ) { // phpcs:ignore PSR2.Methods.MethodDeclaration.Underscore
        $user = STM_LMS_User::get_current_user();
        if ( empty( $user['id'] ) ) {
            die;
        }
        $user_id = $user['id'];
        $referer = basename($_SERVER['HTTP_REFERER']);
        $filter = ( ! empty( $_GET['filter'] ) ) ? $_GET['filter'] : [];
        $only_bundle_courses = ($referer == 'enrolled-bundles') ? true : false;

        $r = array(
            'posts' => array(),
            'total' => false,
        );

        $pp     = get_option( 'posts_per_page' );
        $offset = $offset * $pp;

        $r['offset'] = $offset;

        $sorts = array(
            'date_low'      => 'ORDER BY start_time DESC',
            'date_high'     => 'ORDER BY start_time ASC',
            'progress_low'  => 'ORDER BY progress_percent DESC',
            'progress_high' => 'ORDER BY progress_percent ASC',
        );

        $sort = ( ! empty( $sorts[ $sort ] ) ) ? $sorts[ $sort ] : '';

        $total       = 0;

        $args = array(
            'user_id' => $user_id,
            'limit' => '',
            'offset' => '',
            'fields' => ['course_id', 'bundle_id'],
            'get_total' => true,
            'courses' => null,
        );

        $courses_count = self::user_courses($args, $only_bundle_courses, $filter);
        if($courses_count) {
            $courses_count = array_values($courses_count[0]);
            $total = intval($courses_count[0]);
        }

        $columns = array( 'course_id', 'current_lesson_id', 'progress_percent', 'start_time', 'status', 'enterprise_id', 'bundle_id' );
        if ( stm_lms_points_column_available() ) {
            array_push( $columns, 'for_points' );
        }

        $args = array(
            'user_id' => $user_id,
            'limit' => $pp,
            'offset' => $offset,
            'fields' => $columns,
            'get_total' => null,
            'courses' => null,
            'sort' => $sort,
        );
        $courses = self::user_courses($args, $only_bundle_courses, $filter);

        $r['total_posts'] = $total;
        $r['total']       = $total <= $offset + $pp;
        $r['pages']       = ceil( $total / $pp );

        if ( ! empty( $courses ) ) {
            foreach ( $courses as $course ) {
                $id = intval($course['course_id']);

                if ( get_post_type( $id ) !== 'stm-courses' ) {
                    stm_lms_get_delete_courses( $id );
                    continue;
                }
                if ( ! get_post_status( $id ) ) {
                    continue;
                }

                // Filter by course_category
                if(!empty($filter['course_category'])) {
                    $category_id = intval($filter['course_category']);
                    $course_categories = [];
                    $course_terms = get_the_terms( $id,  'stm_lms_course_taxonomy' );
                    if(count($course_terms)) {
                        foreach ($course_terms as $term) {
                            $course_categories[] = $term->term_id;
                        }
                    }
                    if(!in_array($category_id, $course_categories)) {
                        continue;
                    }
                }


                $price      = get_post_meta( $id, 'price', true );
                $sale_price = STM_LMS_Course::get_sale_price( $id );

                if ( empty( $price ) && ! empty( $sale_price ) ) {
                    $price      = $sale_price;
                    $sale_price = '';
                }

                $post_status = STM_LMS_Course::get_post_status( $id );

                $image = ( function_exists( 'stm_get_VC_img' ) ) ? stm_get_VC_img( get_post_thumbnail_id( $id ), '272x161' ) : get_the_post_thumbnail( $id, 'img-300-225' );

                $course['progress_percent'] = ( $course['progress_percent'] > 100 ) ? 100 : $course['progress_percent'];

                if ( 'completed' === $course['status'] ) {
                    $course['progress_percent'] = '100';
                }

                $current_lesson = ( ! empty( $course['current_lesson_id'] ) ) ? $course['current_lesson_id'] : STM_LMS_Lesson::get_first_lesson( $id );

                /* Check for membership expiration*/
                $in_enterprise       = STM_LMS_Order::is_purchased_by_enterprise( $course, $user_id ); // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
                $my_course           = ( get_post_field( 'post_author', $id ) == $user_id ); // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
                $is_free             = ( ! get_post_meta( $id, 'not_single_sale', true ) && empty( STM_LMS_Course::get_course_price( $id ) ) );
                $is_bought           = STM_LMS_Order::has_purchased_courses( $user_id, $id );
                $not_in_membership   = get_post_meta( $id, 'not_membership', true );
                $in_bundle           = ( isset( $course['bundle_id'] ) ) ? empty( $course['bundle_id'] ) : false;
                $membership_level    = ( STM_LMS_Subscriptions::subscription_enabled() ) ? STM_LMS_Subscriptions::membership_plan_available() : false;
                $membership_status   = ( STM_LMS_Subscriptions::subscription_enabled() ) ? STM_LMS_Subscriptions::get_membership_status( get_current_user_id() ) : 'inactive';
                $membership_expired  = ( STM_LMS_Subscriptions::subscription_enabled() && $membership_level && 'expired' == $membership_status && ! $not_in_membership && ! $is_bought && ! $is_free && ! $my_course && ! $in_enterprise && $in_bundle && empty( $course['for_points'] ) ); // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
                $membership_inactive = ( STM_LMS_Subscriptions::subscription_enabled() && $membership_level && 'active' !== $membership_status && 'expired' !== $membership_status && ! $not_in_membership && ! $is_bought && ! $is_free && ! $my_course && ! $in_enterprise && $in_bundle && empty( $course['for_points'] ) );

                ob_start();
                STM_LMS_Templates::show_lms_template(
                    'global/expired_course',
                    array(
                        'course_id'     => $id,
                        'expired_popup' => false,
                    )
                );
                $expiration = ob_get_clean();

                $post = array(
                    'id'                  => $id,
                    'url'                 => get_the_permalink( $id ),
                    'image_id'            => get_post_thumbnail_id( $id ),
                    'title'               => get_the_title( $id ),
                    'link'                => get_the_permalink( $id ),
                    'image'               => $image,
                    'terms'               => wp_get_post_terms( $id, 'stm_lms_course_taxonomy' ),
                    'terms_list'          => stm_lms_get_terms_array( $id, 'stm_lms_course_taxonomy', 'name' ),
                    'views'               => STM_LMS_Course::get_course_views( $id ),
                    'price'               => STM_LMS_Helpers::display_price( $price ),
                    'sale_price'          => STM_LMS_Helpers::display_price( $sale_price ),
                    'post_status'         => $post_status,
                    'progress'            => strval( $course['progress_percent'] ),
                    /* translators: %s: course complete */
                    'progress_label'      => sprintf( esc_html__( '%s%% Complete', 'masterstudy-lms-learning-management-system' ), $course['progress_percent'] ),
                    'current_lesson_id'   => STM_LMS_Lesson::get_lesson_url( $id, $current_lesson ),
                    'course_id'           => $id,
                    'lesson_id'           => $current_lesson,
                    /* translators: %s: start time */
                    'start_time'          => sprintf( esc_html__( 'Started %s', 'masterstudy-lms-learning-management-system' ), date_i18n( get_option( 'date_format' ), $course['start_time'] ) ),
                    'duration'            => get_post_meta( $id, 'duration_info', true ),
                    'expiration'          => $expiration,
                    'is_expired'          => STM_LMS_Course::is_course_time_expired( get_current_user_id(), $id ),
                    'membership_expired'  => $membership_expired,
                    'membership_inactive' => $membership_inactive,
                );

                $r['posts'][] = $post;
            }
        }

        return $r;
    }


    public static function user_courses( $args, $only_bundle_courses = false, $filter = [] ) {
        $args['user_id'] = (isset($args['user_id'])) ? $args['user_id'] : 0;
        $args['limit'] = (isset($args['limit'])) ? $args['limit'] : '';
        $args['offset'] = (isset($args['offset'])) ? $args['offset'] : '';
        $args['fields'] = (isset($args['fields'])) ? $args['fields'] : array();
        $args['get_total'] = (isset($args['get_total'])) ? $args['get_total'] : false;
        $args['courses'] = (isset($args['courses'])) ? $args['courses'] : '';
        $args['sort'] = (isset($args['sort'])) ? $args['sort'] : '';

        extract($args);

        $bundle_id = (!empty($filter['bundle_id'])) ? intval($filter['bundle_id']) : 0;
        $progress = (!empty($filter['progress'])) ? explode('-', $filter['progress']) : [];

        global $wpdb;
        $table = stm_lms_user_courses_name( $wpdb );

        $fields = ( empty( $fields ) ) ? '*' : implode( ',', $fields );

        if ( $get_total ) {
            $fields = 'COUNT(*)';
        }

        if ( defined( 'ICL_LANGUAGE_CODE' ) ) {
            global $sitepress;
            $courses = $wpdb->prepare( ' AND lng_code=%s ', $sitepress->get_locale( ICL_LANGUAGE_CODE ) ) . $courses;
        }

        if ( empty( $sort ) ) {
            $sort = 'ORDER BY user_course_id DESC';
        }

        $custom = '';

        if($only_bundle_courses) {
            $custom .= ' AND bundle_id > 0';
        }

        if( !empty($bundle_id) ) {
            $custom .= $wpdb->prepare( ' AND bundle_id = %d', $bundle_id );
        }

        if( !empty($progress) ) {
            $progress_start = intval($progress[0]);
            $progress_end = intval($progress[1]);
            $custom .= $wpdb->prepare( ' AND progress_percent >= %d', $progress_start );
            $custom .= $wpdb->prepare( ' AND progress_percent <= %d', $progress_end );
        }

        $request = $wpdb->prepare(
        // phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
            "SELECT {$fields} FROM {$table} WHERE user_id = %d {$custom} {$courses} {$sort}",
            $user_id
        );

        if ( ! empty( $limit ) ) {
            $request .= $wpdb->prepare( ' LIMIT %d', $limit );
        }
        if ( ! empty( $offset ) ) {
            $request .= $wpdb->prepare( ' OFFSET %d', $offset );
        }

        // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
        return $wpdb->get_results( $request, ARRAY_A );
    }

//    public static function _get_user_courses( $offset, $sort = 'date_low' ) { // phpcs:ignore PSR2.Methods.MethodDeclaration.Underscore
//        $user = STM_LMS_User::get_current_user();
//        if ( empty( $user['id'] ) ) {
//            die;
//        }
//        $user_id = $user['id'];
//
//        $r = array(
//            'posts' => array(),
//            'total' => false,
//        );
//
//        $pp     = get_option( 'posts_per_page' );
//        $offset = $offset * $pp;
//
//        $r['offset'] = $offset;
//
//        $sorts = array(
//            'date_low'      => 'ORDER BY start_time DESC',
//            'date_high'     => 'ORDER BY start_time ASC',
//            'progress_low'  => 'ORDER BY progress_percent DESC',
//            'progress_high' => 'ORDER BY progress_percent ASC',
//        );
//
//        $sort = ( ! empty( $sorts[ $sort ] ) ) ? $sorts[ $sort ] : '';
//
//        $total       = 0;
//        $all_courses = stm_lms_get_user_courses( $user_id, '', '', array() );
//        foreach ( $all_courses as $course_user ) {
//            if ( get_post_type( $course_user['course_id'] ) !== 'stm-courses' ) {
//                stm_lms_get_delete_courses( $course_user['course_id'] );
//                continue;
//            }
//
//            $total++;
//        }
//
//        $columns = array( 'course_id', 'current_lesson_id', 'progress_percent', 'start_time', 'status', 'enterprise_id', 'bundle_id' );
//        if ( stm_lms_points_column_available() ) {
//            array_push( $columns, 'for_points' );
//        }
//        $courses = stm_lms_get_user_courses(
//            $user_id,
//            $pp,
//            $offset,
//            $columns,
//            null,
//            null,
//            $sort
//        );
//
//        $referer = basename($_SERVER['HTTP_REFERER']);
//
//        $r['total_posts'] = $total;
//        $r['total']       = $total <= $offset + $pp;
//        $r['pages']       = ceil( $total / $pp );
//
//        $bundle_courses = SLMS_Enrolled_Bundles::get_bundle_courses();
//
//        $filter = ( ! empty( $_GET['filter'] ) ) ? $_GET['filter'] : [];
//
//        if ( ! empty( $courses ) ) {
//            foreach ( $courses as $course ) {
//                $id = intval($course['course_id']);
//
//                if ( get_post_type( $id ) !== 'stm-courses' ) {
//                    stm_lms_get_delete_courses( $id );
//                    continue;
//                }
//                if ( ! get_post_status( $id ) ) {
//                    continue;
//                }
//
//                if($referer == 'enrolled-bundles') {
//                    if(!in_array($id, $bundle_courses)) {
//                        continue;
//                    }
//                } else {
//                    if(in_array($id, $bundle_courses)) {
//                        continue;
//                    }
//                }
//
//                // Filter by bundle_id
//                if(!empty($filter['bundle_id']) && intval($filter['bundle_id']) !== intval($course['bundle_id'])) {
//                    continue;
//                }
//
//                // Filter by progress
//                if(!empty($filter['progress'])) {
//                    $progress = explode('-', $filter['progress']);
//                    $course_progress = intval($course['progress_percent']);
//                    $filter_progress = [
//                        'start' => intval($progress[0]),
//                        'end' => intval($progress[1])
//                    ];
//                    if($filter_progress['start'] > $course_progress || $filter_progress['end'] < $course_progress) {
//                        continue;
//                    }
//                }
//
//                // Filter by course_category
//                if(!empty($filter['course_category'])) {
//                    $category_id = intval($filter['course_category']);
//                    $course_categories = [];
//                    $course_terms = get_the_terms( $id,  'stm_lms_course_taxonomy' );
//                    if(count($course_terms)) {
//                        foreach ($course_terms as $term) {
//                            $course_categories[] = $term->term_id;
//                        }
//                    }
//                    if(!in_array($category_id, $course_categories)) {
//                        continue;
//                    }
//                }
//
//
//                $price      = get_post_meta( $id, 'price', true );
//                $sale_price = STM_LMS_Course::get_sale_price( $id );
//
//                if ( empty( $price ) && ! empty( $sale_price ) ) {
//                    $price      = $sale_price;
//                    $sale_price = '';
//                }
//
//                $post_status = STM_LMS_Course::get_post_status( $id );
//
//                $image = ( function_exists( 'stm_get_VC_img' ) ) ? stm_get_VC_img( get_post_thumbnail_id( $id ), '272x161' ) : get_the_post_thumbnail( $id, 'img-300-225' );
//
//                $course['progress_percent'] = ( $course['progress_percent'] > 100 ) ? 100 : $course['progress_percent'];
//
//                if ( 'completed' === $course['status'] ) {
//                    $course['progress_percent'] = '100';
//                }
//
//                $current_lesson = ( ! empty( $course['current_lesson_id'] ) ) ? $course['current_lesson_id'] : STM_LMS_Lesson::get_first_lesson( $id );
//
//                /* Check for membership expiration*/
//                $in_enterprise       = STM_LMS_Order::is_purchased_by_enterprise( $course, $user_id ); // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
//                $my_course           = ( get_post_field( 'post_author', $id ) == $user_id ); // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
//                $is_free             = ( ! get_post_meta( $id, 'not_single_sale', true ) && empty( STM_LMS_Course::get_course_price( $id ) ) );
//                $is_bought           = STM_LMS_Order::has_purchased_courses( $user_id, $id );
//                $not_in_membership   = get_post_meta( $id, 'not_membership', true );
//                $in_bundle           = ( isset( $course['bundle_id'] ) ) ? empty( $course['bundle_id'] ) : false;
//                $membership_level    = ( STM_LMS_Subscriptions::subscription_enabled() ) ? STM_LMS_Subscriptions::membership_plan_available() : false;
//                $membership_status   = ( STM_LMS_Subscriptions::subscription_enabled() ) ? STM_LMS_Subscriptions::get_membership_status( get_current_user_id() ) : 'inactive';
//                $membership_expired  = ( STM_LMS_Subscriptions::subscription_enabled() && $membership_level && 'expired' == $membership_status && ! $not_in_membership && ! $is_bought && ! $is_free && ! $my_course && ! $in_enterprise && $in_bundle && empty( $course['for_points'] ) ); // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
//                $membership_inactive = ( STM_LMS_Subscriptions::subscription_enabled() && $membership_level && 'active' !== $membership_status && 'expired' !== $membership_status && ! $not_in_membership && ! $is_bought && ! $is_free && ! $my_course && ! $in_enterprise && $in_bundle && empty( $course['for_points'] ) );
//
//                ob_start();
//                STM_LMS_Templates::show_lms_template(
//                    'global/expired_course',
//                    array(
//                        'course_id'     => $id,
//                        'expired_popup' => false,
//                    )
//                );
//                $expiration = ob_get_clean();
//
//                $post = array(
//                    'id'                  => $id,
//                    'url'                 => get_the_permalink( $id ),
//                    'image_id'            => get_post_thumbnail_id( $id ),
//                    'title'               => get_the_title( $id ),
//                    'link'                => get_the_permalink( $id ),
//                    'image'               => $image,
//                    'terms'               => wp_get_post_terms( $id, 'stm_lms_course_taxonomy' ),
//                    'terms_list'          => stm_lms_get_terms_array( $id, 'stm_lms_course_taxonomy', 'name' ),
//                    'views'               => STM_LMS_Course::get_course_views( $id ),
//                    'price'               => STM_LMS_Helpers::display_price( $price ),
//                    'sale_price'          => STM_LMS_Helpers::display_price( $sale_price ),
//                    'post_status'         => $post_status,
//                    'progress'            => strval( $course['progress_percent'] ),
//                    /* translators: %s: course complete */
//                    'progress_label'      => sprintf( esc_html__( '%s%% Complete', 'masterstudy-lms-learning-management-system' ), $course['progress_percent'] ),
//                    'current_lesson_id'   => STM_LMS_Lesson::get_lesson_url( $id, $current_lesson ),
//                    'course_id'           => $id,
//                    'lesson_id'           => $current_lesson,
//                    /* translators: %s: start time */
//                    'start_time'          => sprintf( esc_html__( 'Started %s', 'masterstudy-lms-learning-management-system' ), date_i18n( get_option( 'date_format' ), $course['start_time'] ) ),
//                    'duration'            => get_post_meta( $id, 'duration_info', true ),
//                    'expiration'          => $expiration,
//                    'is_expired'          => STM_LMS_Course::is_course_time_expired( get_current_user_id(), $id ),
//                    'membership_expired'  => $membership_expired,
//                    'membership_inactive' => $membership_inactive,
//                );
//
//                $r['posts'][] = $post;
//            }
//        }
//
//        return $r;
//
//    }

}

SLMS_Enrolled_Courses::init();
