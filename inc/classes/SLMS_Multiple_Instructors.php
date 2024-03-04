<?php

class SLMS_Multiple_Instructors {

    public function __construct()
    {
        add_filter('stm_wpcfto_fields', array($this, 'metabox_fields'));
        add_action( 'save_post', array( $this, 'wpcfto_save' ), 15, 3 );

        add_filter('masterstudy_lms_course_custom_fields', array($this, 'custom_fields'), 15);
        add_action( 'masterstudy_lms_custom_fields_updated', array($this, 'updated_custom_fields'), 15, 2 );

        add_action( 'slms_after_teacher_end', array( $this, 'front_co_instructor' ), 15 );
    }

    public function metabox_fields($fields): array
    {
        $instructors = [];

        $user_args = array(
            'role'   => STM_LMS_Instructor::role(),
            'number' => -1,
            'order'    => 'DESC',
        );

        $user_query = new WP_User_Query( $user_args );
        $users    = $user_query->get_results();

        if(count($users)) {
            $count_instructors = count($users);
            foreach ( $users as $k => $user ) {
                $user_data = STM_LMS_User::get_current_user( $user->ID );
                $instructors['pseudo__co_instructors__'.$user->ID] = array(
                    'type'  => 'checkbox',
                    'label' => $user_data['login'],
                    'options' => $instructors,
                    'toggle' => false
                );
                if($count_instructors > 1) {
                    if($k == 0) {
                        $instructors['pseudo__co_instructors__'.$user->ID]['group'] = 'started';
                    }
                    if(($k + 1) == $count_instructors) {
                        $instructors['pseudo__co_instructors__'.$user->ID]['group'] = 'ended';
                    }
                }
            }
        }

        $fields['stm_courses_settings']['section_multi_instructors'] = array(
            'name' => esc_html__('Co-Instructors', 'slms'),
            'label' => esc_html__('Co-Instructors', 'slms'),
            'fields' => $instructors
        );

        return $fields;
    }

    public static function get_ids($post_id = 0){
        $list = get_post_meta($post_id, 'co_instructors', true);
        $list = (!empty($list)) ? json_decode($list, true) : [];
        $list = array_column($list, 'user_id');
        return array_map('intval', $list);
    }


    public static function custom_fields($fields){

        $user_args = array(
            'role'   => STM_LMS_Instructor::role(),
            'number' => -1,
            'order'    => 'DESC',
        );

        $user_query = new WP_User_Query( $user_args );
        $users    = $user_query->get_results();

        $custom_fields = [];

        if(count($users)) {
            foreach ( $users as $k => $user ) {
                $user_data = STM_LMS_User::get_current_user( $user->ID );
                $custom_fields[] = array(
                    'type'  => 'checkbox',
                    'name' => 'pseudo__co_instructors__'.$user->ID,
                    'label' => $user_data['login'],
                );
            }
        }


        return array_merge( $fields, $custom_fields );
    }

    public function updated_custom_fields($post_id, $data){
        if(count($data)) {
            $natural_list = [];
            foreach ($data as $name => $val) {
                $exp_data = explode('__', $name);
                if(count($exp_data) == 3 && isset($exp_data[0]) == 'pseudo') {
                    if($val) {
                        $natural_name = sanitize_text_field($exp_data[1]);
                        $natural_value = sanitize_text_field($exp_data[2]);
                        $natural_list[$natural_name][] = $natural_value;
                    }
                }
            }

            if(count($natural_list)) {
                foreach ($natural_list as $name => $value) {
                    update_post_meta($post_id, $name, $value);
                }
            }
        }
    }

    public function wpcfto_save( $post_id, $post, $update ) {
        $post_type = get_post_type( $post_id );

        $stm_metaboxes = new STM_Metaboxes();

        if ( ! isset( $_REQUEST['_wpnonce'] )
            || ! wp_verify_nonce( sanitize_text_field( $_REQUEST['_wpnonce'] ), 'update-post_' . $post_id )
            || ! in_array( $post_type, $stm_metaboxes->wpcfto_post_types(), true )
        ) {
            return;
        }

        if ( ! empty( $_POST ) && ! empty( $_POST['action'] ) && 'editpost' === $_POST['action'] ) {
            $fields = $stm_metaboxes->get_fields( $stm_metaboxes->fields() );

            $natural_list = [];

            foreach ( $fields as $field_name => $field_value ) {
                update_post_meta( $post_id, $field_name, $field_value );

                $exp_data = explode('__', $field_name);
                if(count($exp_data) == 3 && isset($exp_data[0]) == 'pseudo') {
                    if($field_value) {
                        $natural_name = sanitize_text_field($exp_data[1]);
                        $natural_value = sanitize_text_field($exp_data[2]);
                        $natural_list[$natural_name][] = $natural_value;
                    }
                }
            }

            if(count($natural_list)) {
                foreach ($natural_list as $name => $value) {
                    update_post_meta($post_id, $name, $value);
                }
            }
        }
    }

    public static function front_co_instructor() {
        STM_LMS_Templates::show_lms_template( 'multi_instructor/front/main' );
    }


    public static function getCoCourses( $user_id = '', $return_args = false ) {
        if ( empty( $user_id ) ) {
            $user_id = get_current_user_id();
        }
        $r        = array( 'posts' => array() );
        $per_page = STM_LMS_Multi_Instructors::per_page();

        $page   = ( ! empty( $_GET['page'] ) ) ? intval( $_GET['page'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $offset = ( ! empty( $page ) ) ? ( $page * $per_page ) - $per_page : 0;

        $args = array(
            'post_type'      => 'stm-courses',
            'posts_per_page' => $per_page,
            'post_status'    => array( 'any' ),
            'meta_query'     => array(
                'relation' => 'OR',
                array(
                    'key'     => 'co_instructor',
                    'value'   => $user_id,
                    'compare' => '=',
                ),
                array(
                    'key'     => 'co_instructors',
                    'value'   => serialize( strval( $user_id ) ),
                    'compare' => 'LIKE',
                ),
            ),
        );

//        pre_var($user_id);

        if ( ! empty( $offset ) ) {
            $args['offset'] = $offset;
        }

        if ( $return_args ) {
            return $args;
        }

        $q = new WP_Query( $args );

        if ( $q->have_posts() ) {
            while ( $q->have_posts() ) {
                $q->the_post();
                $id = get_the_ID();

                $rating  = get_post_meta( $id, 'course_marks', true );
                $rates   = STM_LMS_Course::course_average_rate( $rating );
                $average = $rates['average'];
                $percent = $rates['percent'];

                $status = get_post_status( $id );

                $price      = get_post_meta( $id, 'price', true );
                $sale_price = STM_LMS_Course::get_sale_price( $id );

                if ( empty( $price ) && ! empty( $sale_price ) ) {
                    $price      = $sale_price;
                    $sale_price = '';
                }

                switch ( $status ) {
                    case 'publish':
                        $status_label = esc_html__( 'Published', 'masterstudy-lms-learning-management-system-pro' );
                        break;
                    case 'pending':
                        $status_label = esc_html__( 'Pending', 'masterstudy-lms-learning-management-system-pro' );
                        break;
                    default:
                        $status_label = esc_html__( 'Draft', 'masterstudy-lms-learning-management-system-pro' );
                        break;
                }

                $post_status = STM_LMS_Course::get_post_status( $id );

                $image       = ( function_exists( 'stm_get_VC_img' ) ) ? html_entity_decode( stm_get_VC_img( get_post_thumbnail_id(), '272x161' ) ) : get_the_post_thumbnail( $id, 'img-300-225' );
                $image_small = ( function_exists( 'stm_get_VC_img' ) ) ? html_entity_decode( stm_get_VC_img( get_post_thumbnail_id(), '50x50' ) ) : get_the_post_thumbnail( $id, 'img-300-225' );
                $is_featured = get_post_meta( $id, 'featured', true );

                $post = array(
                    'id'           => $id,
                    'time'         => get_post_time( 'U', true ),
                    'title'        => get_the_title(),
                    'link'         => get_the_permalink(),
                    'image'        => $image,
                    'image_small'  => $image_small,
                    'terms'        => stm_lms_get_terms_array( $id, 'stm_lms_course_taxonomy', false, true ),
                    'status'       => $status,
                    'status_label' => $status_label,
                    'percent'      => $percent,
                    'is_featured'  => $is_featured,
                    'average'      => $average,
                    'total'        => ( ! empty( $rating ) ) ? count( $rating ) : 0,
                    'views'        => STM_LMS_Course::get_course_views( $id ),
                    'simple_price' => $price,
                    'price'        => STM_LMS_Helpers::display_price( $price ),
                    'edit_link'    => ms_plugin_manage_course_url() . "/$id",
                    'post_status'  => $post_status,
                );

                $post['sale_price'] = ( ! empty( $sale_price ) ) ? STM_LMS_Helpers::display_price( $sale_price ) : '';

                $r['posts'][] = $post;
            }
        }

        $r['pages'] = ceil( $q->found_posts / $per_page );

        return $r;
    }

}

new SLMS_Multiple_Instructors();
