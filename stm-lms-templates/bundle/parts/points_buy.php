<?php
/**
 * @var $course_id
 */

$user = STM_LMS_User::get_current_user();

$my_points    = STM_LMS_Point_System::total_points( $user['id'] );
$course_price = (int)get_post_meta($course_id, 'bundle_point_price', true);

stm_lms_register_style( 'points-buy' );
stm_lms_register_script( 'points-buy' );
wp_localize_script(
    'stm-lms-points-buy',
    'stm_lms_points_buy',
    array(
        'translate' => array(
            'confirm' => sprintf(
            /* translators:  %1$s Course ID %2$s Course Price */
                esc_html__( 'Do you really want to buy %1$s for %2$s?', 'masterstudy-lms-learning-management-system-pro' ),
                get_the_title( $course_id ),
                STM_LMS_Point_System::display_points( $course_price )
            ),
        ),
    )
);

$classes = array( 'stm_lms_buy_for_points' );

if ( $my_points < $course_price ) {
    $classes[] = 'not-enough-points';
}

$button_attributes    = ! is_user_logged_in()
    ?
    apply_filters(
        'stm_lms_buy_button_auth',
        array(
            'data-target=".stm-lms-modal-login"',
            'data-lms-modal="login"',
        ),
        $course_id
    )
    : array();

$distribution = '<span class="points_dist" data-href=" '
    . esc_url( ms_plugin_user_account_url( 'points-distribution' ) ) . '">
<i class="fa fa-question-circle"></i>
</span>';

if ( ! empty( $course_price ) ) : ?>
<div class="stm_lms_mixed_button__list">
    <a class="stm_lms_mixed_button__single <?php echo is_user_logged_in() ? 'slms_buy_bundle' : ''; ?>" href="#"
       data-bundle="<?php echo intval( $course_id ); ?>"
        <?php echo wp_kses_post( implode( ' ', $button_attributes ) ); ?>>
        <span><?php esc_html_e( 'Get now', 'masterstudy-lms-learning-management-system-pro' ); ?></span>
    </a>

    <a href="#" class="
	<?php
    echo esc_attr(
        implode(
            ' ',
            $classes
        )
    );
    ?>
		" data-course="<?php echo esc_attr( $course_id ); ?>">
        <?php echo STM_LMS_Point_System::display_point_image(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
        <div class="stm_lms_buy_for_points__text">
            <span class="points_price"><?php echo STM_LMS_Point_System::display_points( $course_price ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></span>
            <span class="my_points">
				<?php
                if ( $my_points < $course_price ) {
                    printf(
                    /* translators:  %1$s Points %2$s Distribution */
                        esc_html__( 'You need %1$s. %2$s', 'masterstudy-lms-learning-management-system-pro' ),
                        STM_LMS_Point_System::display_points( $course_price - $my_points ), // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                        $distribution // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                    );
                } else {
                    printf(
                    /* translators:  %1$s Points %2$s Distribution */
                        esc_html__( 'You have %1$s. %2$s', 'masterstudy-lms-learning-management-system-pro' ),
                        STM_LMS_Point_System::display_points( $my_points ), // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                        $distribution // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                    );
                }
                ?>
			</span>
        </div>
    </a>
</div>
<?php
endif;
