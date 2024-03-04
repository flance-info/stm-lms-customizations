<?php

class SLMS_Point_System {
    public function __construct() {
        remove_all_actions( 'wp_ajax_stm_lms_buy_for_points' );
        add_action( 'wp_ajax_stm_lms_buy_for_points', array( $this, 'buy_for_points' ) );
    }

    public function buy_for_points() {
        check_ajax_referer( 'stm_lms_buy_for_points', 'nonce' );

        $user      = STM_LMS_User::get_current_user();
        $user_id   = $user['id'];

        if(get_post_type(intval( $_GET['course_id'] )) == 'stm-course-bundles') {

            $bundle_id = intval( $_GET['course_id'] );

            $bundle_point_price = (int)get_post_meta($bundle_id, 'bundle_point_price', true);
            $my_points    = intval( STM_LMS_Point_System::total_points( $user_id ) );

            $r = array(
                'url' => get_the_permalink( $bundle_id ),
            );

            $courses = get_post_meta( $bundle_id, STM_LMS_My_Bundle::bundle_courses_key(), true );

            $url = '';

            foreach ( $courses as $course_id ) {
                $user_course = stm_lms_get_user_course( $user_id, $course_id, array( 'user_course_id' ) );

                if ( $my_points >= $bundle_point_price && empty( $user_course ) ) {
                    STM_LMS_Course::add_user_course( $course_id, $user_id, 0, 0, false, '', $bundle_id, '', 'for_points' );
                    STM_LMS_Course::add_student( $course_id );

//                    stm_lms_add_user_points( $user_id, $bundle_id, 'bundle_bought', "-{$bundle_point_price}", time() );
                }

                $url = (empty($url)) ? STM_LMS_Course::item_url( $course_id, STM_LMS_Lesson::get_first_lesson( $course_id ) ) : $url;
            }

            stm_lms_add_user_points( $user_id, $bundle_id, 'bundle_bought', "-{$bundle_point_price}", time() );

//            $r['url'] = $url;
            $r['url'] = get_the_permalink($bundle_id);

        } else {
            $course_id = intval( $_GET['course_id'] );

            $course_price = STM_LMS_Point_System::course_price( $course_id );
            $my_points    = intval( STM_LMS_Point_System::total_points( $user_id ) );

            $r = array(
                'url' => get_the_permalink( $course_id ),
            );

            $user_course = stm_lms_get_user_course( $user_id, $course_id, array( 'user_course_id' ) );

            if ( $my_points >= $course_price && empty( $user_course ) ) {
                STM_LMS_Course::add_user_course( $course_id, $user_id, 0, 0, false, '', '', '', 'for_points' );
                STM_LMS_Course::add_student( $course_id );

                stm_lms_add_user_points( $user_id, $course_id, 'course_bought', "-{$course_price}", time() );
            }

            $r['url'] = STM_LMS_Course::item_url( $course_id, STM_LMS_Lesson::get_first_lesson( $course_id ) );

        }

        wp_send_json( $r );
    }
}

new SLMS_Point_System();