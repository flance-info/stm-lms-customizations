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
use STM_LMS_Templates;

class CustomAssignmentMetaboxes {

	public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'remove_instructor_review_metabox' ), 11 );
		add_action( 'add_meta_boxes', array( $this, 'add_student_assignments_metaboxes' ), 20 );
		add_action('save_post', array($this, 'save_assignment_meta'), 10, 2);
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

	public function save_assignment_meta( $post_id, $post ) {
		if ( PostType::USER_ASSIGNMENT !== $post->post_type ) {
			return;
		}
		// Save assessment meta field
		if ( isset( $_POST['assessment'] ) ) {
			$assessment = sanitize_text_field( $_POST['assessment'] );
			update_post_meta( $post_id, 'assessment', $assessment );
		}
	}

	public function student_assignment_review( $post ) {
		wp_nonce_field( 'stm_lms_assignment_instructor_review_save', 'stm_lms_assignment_instructor_review' );
		$status      = get_post_meta( $post->ID, 'status', true );
		$assessment = get_post_meta( $post->ID, 'assessment', true );
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
									<input name="assessment" type="number" placeholder="<?php esc_attr_e( 'Assessment', 'slms' ); ?>" value="<?php echo esc_attr($assessment) ?>"/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<br />
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
}

add_action( 'init', function () {
	$custom_assignment_metaboxes = new CustomAssignmentMetaboxes();
} );
