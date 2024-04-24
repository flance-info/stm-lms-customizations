<?php
/**
 * Instructor review box.
 *
 * @var integer $assignment_id     - assignemnt ID.
 * @var string  $assignment_status - status of current assignment.
 * @var array   $assignment        - assignments arguments.
 *
 * @package masterstudy
 */
$grade       = get_post_meta( $assignment_id, 'grade', true );
?>
<div class="masterstudy-user-assignment__box-inner masterstudy-user-assignment__box-column">

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
			'content'   => get_post_meta( $assignment_id, 'editor_comment', true ),
			'settings'  => array(
				'quicktags'     => false,
				'media_buttons' => false,
				'textarea_rows' => 13,
			),
		)
	);
	STM_LMS_Templates::show_lms_template(
		'components/attachment-media',
		array(
			'assignment_id'     => $assignment_id,
			'instructor_review' => true,
			'dark_mode'         => false,
		)
	);
	?>
	<div class="masterstudy-user-assignment__submit">
		<?php
		STM_LMS_Templates::show_lms_template(
			'components/button',
			array(
				'id'    => 'masterstudy-review-submit',
				'title' => esc_html__( 'Submit review', 'masterstudy-lms-learning-management-system-pro' ),
				'link'  => '#',
				'style' => 'primary',
				'size'  => 'sm',
			)
		);
		?>
	</div>
</div>
