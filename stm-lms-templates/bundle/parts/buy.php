<?php
/**
 * @var $course_id
 */
use MasterStudy\Lms\Pro\addons\CourseBundle\Repository\CourseBundleRepository;

$bundle_point_price = (int)get_post_meta($course_id, 'bundle_point_price', true);

stm_lms_register_script( 'buy-button' );
stm_lms_register_script( 'bundles/buy' );
if ( !empty( $bundle_point_price ) ) {
    slms_register_script( 'bundles/bundles_buy' );
}
stm_lms_register_style( 'buy-button-mixed' );


$bundle_price         = get_post_meta( $course_id, CourseBundleRepository::PRICE_META_KEY, true );
$bundle_courses_price = STM_LMS_Course_Bundle::get_bundle_courses_price( $course_id );
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

$class_btn = (!empty($bundle_point_price)) ? 'subscription_enabled' :'subscription_disabled';

?>
<div class="stm-lms-buy-buttons stm-lms-buy-buttons-mixed stm-lms-buy-buttons-mixed-pro">

    <?php /* <div class="stm_lms_mixed_button <?php echo $class_btn; ?> <?php echo is_user_logged_in() ? 'stm_lms_buy_bundle' : ''; ?>" data-bundle="<?php echo intval( $course_id ); ?>"> */ ?>
    <div class="stm_lms_mixed_button <?php echo $class_btn; ?> <?php echo ( empty( $bundle_point_price ) && is_user_logged_in()) ? 'stm_lms_buy_bundle' : ''; ?>"
        <?php if ( empty( $bundle_point_price ) ) : ?> data-bundle="<?php echo intval( $course_id ); ?>" <?php endif; ?>>

        <?php if(!empty($bundle_point_price)): ?>

            <div class="buy-button btn btn-default btn_big heading_font">

                <span><?php esc_html_e( 'Get now', 'masterstudy-lms-learning-management-system-pro' ); ?></span>

                <div class="btn-prices">

                    <?php if ( ! empty( $bundle_courses_price ) ) : ?>
                        <label class="sale_price"><?php echo STM_LMS_Helpers::display_price( $bundle_courses_price ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
                    <?php endif; ?>

                    <?php if ( ! empty( $bundle_price ) ) : ?>
                        <label class="price"><?php echo STM_LMS_Helpers::display_price( $bundle_price ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
                    <?php endif; ?>

                </div>

            </div>

            <?php
                if ( is_user_logged_in() ) {
                    STM_LMS_Templates::show_lms_template( 'bundle/parts/points_buy', array( 'course_id' => $course_id ) );
                }
            ?>

        <?php else: ?>

            <a href="#" class="btn btn-default btn_big heading_font" <?php echo wp_kses_post( implode( ' ', $button_attributes ) ); ?>>

                <span><?php esc_html_e( 'Get now', 'masterstudy-lms-learning-management-system-pro' ); ?></span>

                <div class="btn-prices">

                    <?php if ( ! empty( $bundle_courses_price ) ) : ?>
                        <label class="sale_price"><?php echo STM_LMS_Helpers::display_price( $bundle_courses_price ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
                    <?php endif; ?>

                    <?php if ( ! empty( $bundle_price ) ) : ?>
                        <label class="price"><?php echo STM_LMS_Helpers::display_price( $bundle_price ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></label>
                    <?php endif; ?>

                </div>

            </a>

        <?php endif; ?>

    </div>

</div>
