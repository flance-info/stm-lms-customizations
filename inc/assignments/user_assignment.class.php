<?php
new STM_LMS_User_Assignment_Child();

class STM_LMS_User_Assignment_Child extends STM_LMS_User_Assignment {

	public function __construct() {
		remove_all_actions('wp_ajax_stm_lms_get_enrolled_assignments');
		add_action( 'wp_ajax_stm_lms_get_enrolled_assignments', array( $this, 'enrolled_assignments' ) );
	}

	public static function get_assignment( $assignment_id ) {
		$editor_id = STM_LMS_User::get_current_user();

		if ( empty( $editor_id ) ) {
			$answer = array(
				'message' => 'Failed',
			);
			return $answer;
		}
		$editor_id = $editor_id['id'];

		if ( ! self::is_my_assignment( $assignment_id, $editor_id ) ) {
			STM_LMS_User::js_redirect( ms_plugin_user_account_url( 'assignments' ) );
			$answer = array(
				'message' => 'Failed',
			);
			return $answer;
		}

		$args = array(
			'post_type'   => 'stm-user-assignment',
			'post_status' => array( 'pending', 'publish' ),
			'post__in'    => array( $assignment_id ),
		);

		$q = new WP_Query( $args );

		$answer = array();

		if ( $q->have_posts() ) {
			while ( $q->have_posts() ) {
				$q->the_post();

				$status = get_post_status();
				if ( 'pending' !== $status ) {
					$status = get_post_meta( $assignment_id, 'status', true );
				}

				$answer['title']            = get_the_title();
				$answer['status']           = $status;
				$answer['content']          = get_the_content();
				$answer['assignment_title'] = get_the_title( get_post_meta( $assignment_id, 'assignment_id', true ) );

				$answer['files'] = STM_LMS_Assignments::get_draft_attachments( $assignment_id, 'student_attachments' );
			}
		}

		wp_reset_postdata();

		return $answer;
	}
	private static function per_page() {
		return 6;
	}

	public static function statuses( $post_status, $status ) {
		if ( 'pending' === $post_status ) {
			return array(
				'status' => 'pending',
				'label'  => esc_html__( 'Pending...', 'masterstudy-lms-learning-management-system-pro' ),
			);
		}
		if ( 'draft' === $post_status ) {
			return array(
				'status' => 'draft',
				'label'  => esc_html__( 'Draft', 'masterstudy-lms-learning-management-system-pro' ),
			);
		}
		if ( 'publish' === $post_status && 'passed' === $status ) {
			return array(
				'status' => 'passed',
				'label'  => esc_html__( 'Approved', 'masterstudy-lms-learning-management-system-pro' ),
			);
		}
		if ( 'publish' === $post_status && 'not_passed' === $status ) {
			return array(
				'status' => 'not_passed',
				'label'  => esc_html__( 'Declined', 'masterstudy-lms-learning-management-system-pro' ),
			);
		}

		if ( empty($status) || !isset($status) || '' == $status) {
			return array(
				'status' => 'status_empty',
				'label'  => esc_html__( 'Pending...', 'masterstudy-lms-learning-management-system-pro' ),
			);
		}
	}
	public static function my_assignments( $user_id, $page = null ) {
		$args = array(
			'post_type'      => 'stm-user-assignment',
			'posts_per_page' => self::per_page(),
			'offset'         => ( $page * self::per_page() ) - self::per_page(),
			'post_status'    => array( 'pending', 'publish' ),
			'meta_query'     => array(
				'relation' => 'AND',
				array(
					'key'     => 'student_id',
					'value'   => $user_id,
					'compare' => '=',
				),
			),
		);

		if ( ! empty( $_GET['status'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$status = sanitize_text_field( $_GET['status'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			if ( 'pending' === $status ) {
				$args['post_status'] = 'pending';
			}
			if ( 'passed' === $status ) {
				$args['post_status']  = 'publish';
				$args['meta_query'][] = array(
					'key'     => 'status',
					'value'   => 'passed',
					'compare' => '=',
				);
			}
			if ( 'not_passed' === $status ) {
				$args['post_status']  = 'publish';
				$args['meta_query'][] = array(
					'key'     => 'status',
					'value'   => 'not_passed',
					'compare' => '=',
				);
			}
		}

		if ( ! empty( $_GET['s'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$args['s'] = sanitize_text_field( $_GET['s'] ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		}

		$q = new WP_Query( $args );

		$posts = array();
		if ( $q->have_posts() ) {
			while ( $q->have_posts() ) {
				$q->the_post();
				$id            = get_the_ID();
				$course_id     = get_post_meta( $id, 'course_id', true );
				$assignment_id = get_post_meta( $id, 'assignment_id', true );
				$who_view      = get_post_meta( $id, 'who_view', true );

				$posts[] = array(
					'assignment_title' => get_the_title( $assignment_id ),
					'course_title'     => get_the_title( $course_id ),
					'updated_at'       => stm_lms_time_elapsed_string( gmdate( 'Y-m-d H:i:s', get_post_timestamp() ) ),
					'status'           => self::statuses( get_post_status(), get_post_meta( $id, 'status', true ) ),
					'grade'           =>  (get_post_meta( $id, 'grade', true ))? get_post_meta( $id, 'grade', true ): esc_html__( 'No grade', 'slms' ),
					'instructor'       => STM_LMS_User::get_current_user( get_post_field( 'post_author', $course_id ) ),
					'url'              => STM_LMS_Lesson::get_lesson_url( $course_id, $assignment_id ),
					'who_view'         => $who_view,
					'pages'            => ceil( $q->found_posts / self::per_page() ),
				);

			}
		}
		return $posts;
	}

	public static function my_assignments_statuses( $user_id ) {
		$args = array(
			'post_type'      => 'stm-user-assignment',
			'posts_per_page' => 1,
			'post_status'    => array( 'publish' ),
			'meta_query'     => array(
				'relation' => 'AND',
				array(
					'key'     => 'student_id',
					'value'   => $user_id,
					'compare' => '=',
				),
				array(
					'key'     => 'who_view',
					'value'   => 0,
					'compare' => '=',
				),
			),
		);

		$q = new WP_Query( $args );

		return $q->found_posts;
	}

	public function assignment_passed( $user_id, $assignment_id ) {
		$args = array(
			'post_type'      => 'stm-user-assignment',
			'posts_per_page' => 1,
			'post_status'    => array( 'publish' ),
			'meta_query'     => array(
				'relation' => 'AND',
				array(
					'key'     => 'assignment_id',
					'value'   => $assignment_id,
					'compare' => '=',
				),
				array(
					'key'     => 'student_id',
					'value'   => $user_id,
					'compare' => '=',
				),
				array(
					'key'     => 'status',
					'value'   => 'passed',
					'compare' => '=',
				),
			),
		);

		$q = new WP_Query( $args );

		return $q->found_posts;
	}

	public function enrolled_assignments() {
		check_ajax_referer( 'stm_lms_get_enrolled_assingments', 'nonce' );
		$page = intval( $_GET['page'] );
		$user = STM_LMS_User::get_current_user();
		wp_send_json( self::my_assignments( $user['id'], $page ) );
	}

}