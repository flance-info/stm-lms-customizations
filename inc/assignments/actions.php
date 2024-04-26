<?php
/**
 * Assignment actions.
 */

namespace MasterStudy\Lms\Custom;

use MasterStudy\Lms\Plugin\PostType;
use MasterStudy\Lms\Pro\addons\assignments\Repositories\AssignmentRepository;
use MasterStudy\Lms\Pro\addons\assignments\Repositories\AssignmentStudentRepository;
use MasterStudy\Lms\Pro\addons\assignments\Repositories\AssignmentTeacherRepository;
use MasterStudy\Lms\Repositories\CurriculumRepository;
use STM_LMS_Assignments;
use STM_LMS_Helpers;
use STM_LMS_Instructor;
use STM_LMS_Templates;
use STM_LMS_User;

class CustomAssignmentMetaboxes {

	public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'remove_instructor_review_metabox' ), 11 );
		add_action( 'add_meta_boxes', array( $this, 'add_student_assignments_metaboxes' ), 20 );
		add_action( 'add_meta_boxes', array( $this, 'add_assignments_metaboxes' ), 20 );
		add_action( 'save_post', array( $this, 'save_student_assignment_meta' ), 10, 2 );
		add_action( 'save_post', array( $this, 'save_assignment_meta' ), 10, 2 );
		add_filter( 'manage_stm-user-assignment_posts_columns', array( $this, 'masterstudy_lms_student_assignments_columns' ) );
		add_filter( 'manage_edit-stm-user-assignment_sortable_columns', array( $this, 'masterstudy_lms_student_assignments_columns' ), 11 );
		add_action( 'manage_stm-user-assignment_posts_custom_column', array( $this, 'stm_lms_student_assignments_column_fields' ), 11, 2 );
		add_action( 'wp_enqueue_scripts', array($this, 'enqueue_script_styles'), 15 );
		remove_action( 'wp_ajax_stm_lms_assignment_student_answer', 'stm_lms_assignment_student_answer' );
		add_action( 'wp_ajax_stm_lms_assignment_student_answer', array($this, 'stm_lms_assignment_student_answer') );
	}

	 public function enqueue_script_styles(){
        $lms_template_current = get_query_var( 'lms_template' );
        if($lms_template_current == 'stm-lms-user-assignment') {
			wp_deregister_script( 'masterstudy-attachment-media' );
            wp_register_script( 'masterstudy-attachment-media', SLMS_URL . 'assets/js/components/attachment-media.js', array( 'jquery'), time(), true );
        }
    }

	public function stm_lms_assignment_student_answer() {
	check_ajax_referer( 'wp_rest', 'nonce' );

	$status        = sanitize_text_field( $_POST['status'] );
	$review        = wp_kses_post( $_POST['review'] );
	$assignment_id = intval( $_POST['assignment_id'] );
	$grade = intval( $_POST['grade'] );

	$student_id = get_post_meta( $assignment_id, 'student_id', true );
	$course_id  = get_post_meta( $assignment_id, 'course_id', true );

	wp_update_post(
		array(
			'ID'          => $assignment_id,
			'post_status' => 'publish',
		)
	);

	update_post_meta( $assignment_id, 'editor_comment', $review );
	update_post_meta( $assignment_id, 'status', $status );
	update_post_meta( $assignment_id, 'who_view', 0 );
	update_post_meta( $assignment_id, 'grade', $grade );

	if ( 'passed' === $status ) {
		STM_LMS_Course::update_course_progress( $student_id, $course_id );
	}

	if ( STM_LMS_Instructor::is_instructor() ) {
		$student = STM_LMS_User::get_current_user( $student_id );

		$message = esc_html__( 'Your assignment has been checked', 'masterstudy-lms-learning-management-system-pro' );
		STM_LMS_Helpers::send_email(
			$student['email'],
			esc_html__( 'Assignment status change.', 'masterstudy-lms-learning-management-system-pro' ),
			$message,
			'stm_lms_assignment_checked',
			compact( 'message' )
		);
	}

	do_action( 'stm_lms_assignment_' . $status, $student_id, $assignment_id );

	wp_send_json_success();
}

	public function add_student_assignments_metaboxes() {
		add_meta_box(
				'stm_lms_assignment_instructor_review',
				esc_html__( 'Instructor Review', 'masterstudy-lms-learning-management-system-pro' ),
				array( $this, 'student_assignment_review' ),
				'stm-user-assignment',
				'normal'
		);
	}

	public function masterstudy_lms_student_assignments_columns( $columns ) {
		unset( $columns['lms_status'] );
		$columns = $this->reorder_columns( $columns );

		return $columns;
	}

	public function stm_lms_student_assignments_column_fields( $columns, $assignment_id ) {
		switch ( $columns ) {
			case 'lms_grade':
				$grade       = get_post_meta( $assignment_id, 'grade', true );
				echo ($grade)? $grade: 'pending';
				break;

		}
	}

	public static function reorder_columns( $columns ) {
		$new_columns = [];
		foreach ( $columns as $key => $value ) {
			$new_columns[ $key ] = $value;
			if ( $key === 'lms_attempt' ) {
				$new_columns['lms_grade'] = esc_html__( 'Grade', 'slms' );
			}
		}

		return $new_columns;
	}

	public function add_assignments_metaboxes() {
		add_meta_box(
				'stm_lms_assignment',
				esc_html__( 'Attempts', 'slms' ),
				array( $this, 'assignment_attempts' ),
				'stm-assignments',
				'normal'
		);
	}

	public function save_student_assignment_meta( $post_id, $post ) {
		if ( PostType::USER_ASSIGNMENT !== $post->post_type ) {
			return;
		}
		if ( isset( $_POST['grade'] ) ) {
			$assessment = sanitize_text_field( $_POST['grade'] );
			update_post_meta( $post_id, 'grade', $assessment );
		}
	}

	public function save_assignment_meta( $post_id, $post ) {
		if ( PostType::ASSIGNMENT !== $post->post_type ) {
			return;
		}
		// Save assessment meta field
		if ( isset( $_POST['assignment_tries'] ) ) {
			$assessment = sanitize_text_field( $_POST['assignment_tries'] );
			update_post_meta( $post_id, 'assignment_tries', $assessment );
		}
	}

	public function student_assignment_review( $post ) {
		wp_nonce_field( 'stm_lms_assignment_instructor_review_save', 'stm_lms_assignment_instructor_review' );
		$status      = get_post_meta( $post->ID, 'status', true );
		$grade       = get_post_meta( $post->ID, 'grade', true );
		$review      = get_post_meta( $post->ID, 'editor_comment', true );
		$post_status = get_post_status( $post->ID );
		if ( 'pending' === $post_status ) {
			$status = $post_status;
		}
		?>
		<div class="masterstudy-assignment__metafields">
			<div class="masterstudy-assignment__instructor-review">
				<h2><?php echo esc_html__( 'Add review', 'masterstudy-lms-learning-management-system-pro' ); ?>:</h2>

				<div class="stm-lms-questions-single_input mb-3">
					<div class="container">
						<div class="row">
							<div class="column column-match">
								<div class="border">
									<input name="grade" type="number" placeholder="<?php esc_attr_e( 'Grade', 'slms' ); ?>" value="<?php echo esc_attr( $grade ) ?>"/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<br/>
				<?php
				STM_LMS_Templates::show_lms_template(
						'components/wp-editor',
						array(
								'id'        => 'editor_comment',
								'dark_mode' => false,
								'content'   => $review,
								'settings'  => array(
										'quicktags'     => false,
										'media_buttons' => false,
										'textarea_rows' => 13,
								),
						)
				);
				?>
				<div class="masterstudy-assignment__instructor-attachments">
					<?php
					$attachment_ids     = get_post_meta( $post->ID, 'instructor_attachments', true );
					$attachment_ids     = ! empty( $attachment_ids ) ? $attachment_ids : array();
					$review_attachments = STM_LMS_Assignments::get_draft_attachments( $post->ID, 'instructor_attachments' );
					STM_LMS_Templates::show_lms_template(
							'components/file-attachment',
							array(
									'attachments' => $review_attachments,
									'download'    => false,
									'deletable'   => true,
							)
					);
					?>
					<input name="instructor_attachments" type="hidden" value="<?php echo esc_attr( implode( ',', $attachment_ids ) ); ?>">
				</div>
				<div class="masterstudy-assignment__instructor-review__controls">
					<?php
					STM_LMS_Templates::show_lms_template(
							'components/button',
							array(
									'id'            => 'masterstudy-file-upload-field',
									'title'         => esc_html__( 'Attach file', 'masterstudy-lms-learning-management-system-pro' ),
									'link'          => '',
									'icon_position' => 'left',
									'icon_name'     => 'plus',
									'style'         => 'tertiary',
									'size'          => 'sm',
							)
					);
					STM_LMS_Templates::show_lms_template(
							'components/button',
							array(
									'id'            => 'masterstudy-audio-recorder',
									'title'         => esc_html__( 'Record audio', 'masterstudy-lms-learning-management-system-pro' ),
									'link'          => '',
									'icon_position' => 'left',
									'icon_name'     => 'mic',
									'style'         => 'tertiary',
									'size'          => 'sm',
							)
					);
					STM_LMS_Templates::show_lms_template(
							'components/button',
							array(
									'id'            => 'masterstudy-video-recorder',
									'title'         => esc_html__( 'Record video', 'masterstudy-lms-learning-management-system-pro' ),
									'link'          => '',
									'icon_position' => 'left',
									'icon_name'     => 'camera',
									'style'         => 'tertiary',
									'size'          => 'sm',
							)
					);
					?>
				</div>
				<div class="masterstudy-assignment__instructor-review__controls-items">
					<?php
					STM_LMS_Templates::show_lms_template(
							'components/audio-recorder',
							array(
									'preloader' => false,
							)
					);
					STM_LMS_Templates::show_lms_template(
							'components/video-recorder',
							array(
									'preloader' => false,
							)
					);
					STM_LMS_Templates::show_lms_template(
							'components/progress',
							array(
									'title'     => esc_html__( 'Processing', 'masterstudy-lms-learning-management-system-pro' ),
									'is_hidden' => true,
									'progress'  => 0,
							)
					);
					STM_LMS_Templates::show_lms_template(
							'components/alert',
							array(
									'id'                  => 'assignment_file_alert',
									'title'               => esc_html__( 'Delete file', 'masterstudy-lms-learning-management-system-pro' ),
									'text'                => esc_html__( 'Are you sure you want to delete this file?', 'masterstudy-lms-learning-management-system-pro' ),
									'submit_button_text'  => esc_html__( 'Delete', 'masterstudy-lms-learning-management-system-pro' ),
									'cancel_button_text'  => esc_html__( 'Cancel', 'masterstudy-lms-learning-management-system-pro' ),
									'submit_button_style' => 'danger',
									'cancel_button_style' => 'tertiary',
									'dark_mode'           => false,
							)
					);
					STM_LMS_Templates::show_lms_template(
							'components/message',
							array(
									'id'          => 'message-box',
									'bg'          => 'danger',
									'color'       => 'danger',
									'icon'        => 'warning',
									'show_header' => true,
									'link_url'    => '#',
									'is_vertical' => true,
							)
					);
					?>
					<div class="masterstudy-file-attachment" data-id="masterstudy-file-attachment__template">
						<div class="masterstudy-file-attachment__info">
							<img src="" class="masterstudy-file-attachment__image masterstudy-file-attachment__image_preview">
							<div class="masterstudy-file-attachment__wrapper">
								<div class="masterstudy-file-attachment__title-wrapper">
									<span class="masterstudy-file-attachment__title"></span>
								</div>
								<span class="masterstudy-file-attachment__size"></span>
								<a class="masterstudy-file-attachment__delete" href="#" data-id=""></a>
							</div>
						</div>
						<?php
						STM_LMS_Templates::show_lms_template(
								'components/audio-player',
								array(
										'hidden' => true,
								)
						);
						STM_LMS_Templates::show_lms_template(
								'components/video-player',
								array(
										'hidden' => true,
								)
						);
						?>
					</div>
				</div>
			</div>
		</div>
		<?php
	}

	public function remove_instructor_review_metabox() {
		remove_meta_box( 'stm_lms_assignment_instructor_review', 'stm-user-assignment', 'normal' );
	}

	public function assignment_attempts( $post ) {
		wp_nonce_field( 'stm_lms_assignment_instructor_review_save', 'stm_lms_assignment_instructor_review' );
		$total_attempts = STM_LMS_Assignments::attempts_num( $post->ID );
		?>
		<div class="masterstudy-assignment__metafields">
			<div class="masterstudy-assignment__instructor-review">
				<h2><?php echo esc_html__( 'Assignment attempts', 'slms' ); ?>:</h2>

				<div class="stm-lms-questions-single_input mb-3">
					<div class="container">
						<div class="row">
							<div class="column column-match">
								<div class="border">
									<input name="assignment_tries" type="number" placeholder="<?php esc_attr_e( 'Assignment attempts', 'slms' ); ?>" value="<?php echo esc_attr( $total_attempts ) ?>"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<?php
	}
}

add_action( 'init', function () {
	$custom_assignment_metaboxes = new CustomAssignmentMetaboxes();
} );
