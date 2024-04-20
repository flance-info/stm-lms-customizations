<?php

if(class_exists('STM_LMS_User_Manager_Course')) {
    class SLMS_Manage_Students extends STM_LMS_User_Manager_Course {

        public function __construct()
        {
            remove_all_actions( 'wp_ajax_stm_lms_dashboard_get_course_students' );
            add_action( 'wp_ajax_stm_lms_dashboard_get_course_students', array( $this, 'students' ) );
        }

        public function students()
        {
            check_ajax_referer( 'stm_lms_dashboard_get_course_students', 'nonce' );

            $course_id = intval( $_GET['course_id'] );
            $filter = (isset($_GET['filter'])) ? $_GET['filter'] : [];

            $data = array_reverse( array_map( array( $this, 'map_students' ), stm_lms_get_course_users( $course_id ) ) );

            $students = [];

            if(count($filter) && count($data)) {
                foreach ($data as $key => $item) {
                    if(!isset($item['student']) && !isset($item['student']['id'])) continue;

                    $user_id = intval($item['student']['id']);

                    $has_match = true;

                    foreach ($filter as $filter_key => $filter_value) {
                        if($filter_value == 'undefined') continue;

                        $meta = get_user_meta($user_id, $filter_key, true);
                        if(empty($meta) || $meta != $filter_value) {
                            $has_match = false;
                        }
                    }

                    if($has_match) {
                        $students[] = $item;
                    }
                }
                $data['students']     = $students;
            } else {
                $data['students']     = $data;
            }

            $data['origin_title'] = get_the_title( $course_id );
            /* translators: %s: Course ID */
            $data['title'] = sprintf( esc_html__( 'Students of %s', 'masterstudy-lms-learning-management-system' ), get_the_title( $course_id ) );

            wp_send_json( $data );
        }

    }

    new SLMS_Manage_Students();
}
