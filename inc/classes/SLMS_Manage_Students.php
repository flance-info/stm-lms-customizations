<?php

if(class_exists('STM_LMS_User_Manager_Course')) {
    class SLMS_Manage_Students extends STM_LMS_User_Manager_Course {

        public function __construct()
        {
            remove_all_actions( 'wp_ajax_stm_lms_dashboard_get_course_students' );
            add_action( 'wp_ajax_stm_lms_dashboard_get_course_students', array( $this, 'students' ) );
			add_action( 'wp_ajax_stm_lms_dashboard_certify_user_from_course', array( $this, 'certify_user_from_course' ) );

        }

	    public function certify_user_from_course() {
		    check_ajax_referer( 'stm_lms_dashboard_delete_user_from_course', 'nonce' );
		    $course_id = intval( $_GET['course_id'] );
		    $user_id   = intval( $_GET['user_id'] );
		    $checked   = sanitize_text_field( $_GET['checked'] );
		    update_user_meta( $user_id, "stm_lms_completion_course_{$course_id}", $checked );
	    }

	    public function course_completions( $user_id, $course_id ) {
		    $total_progress = STM_LMS_Lesson::get_total_progress( $user_id ?? null, $course_id );
		    $course_passed  = false;
			$passing_grade = intval( STM_LMS_Options::get_option( 'certificate_threshold', 70 ) );
		    if ( ! empty( $total_progress['course']['progress_percent'] ) ) {
			    $course_passed = $total_progress['course']['progress_percent'] >= $passing_grade;
		    }

		    return $course_passed;
	    }

		public function student_loop($data){
			$new_data = [];
			   foreach ($data as $key => $item) {
                    if(!isset($item['student']) && !isset($item['student']['id'])) continue;
                    $user_id = intval($item['student']['id']);
					$course_id = intval($item['course_id']);
					$item['completion'] = $this->course_completions($user_id, $course_id);
					$new_data[] = $item;
                }

			   return $new_data;
		}
        public function students()
        {
            check_ajax_referer( 'stm_lms_dashboard_get_course_students', 'nonce' );

            $course_id = intval( $_GET['course_id'] );
            $filter = (isset($_GET['filter'])) ? $_GET['filter'] : [];

            $data = array_reverse( array_map( array( $this, 'map_students' ), stm_lms_get_course_users( $course_id ) ) );

            $students = [];
			$data = $this->student_loop($data);
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
