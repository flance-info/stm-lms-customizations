<?php

$bundles = SLMS_Enrolled_Bundles::get_ids();

$atts     = array(
    'title'          => '',
    'columns'        => 3,
    'posts_per_page' => -1,
    'wishlist'       => [],
    'select_bundles' => (count($bundles)) ? implode(',',$bundles) : '',
);
if ( class_exists( 'STM_LMS_Course_Bundle' ) ) {
    ?>
    <div class="stm_lms_user_info_top">
        <h3><?php esc_html_e( 'Enrolled Bundles', 'slms' ); ?></h3>
    </div>

    <div class="multiseparator"></div>

    <?php
    STM_LMS_Templates::show_lms_template( 'shortcodes/stm_lms_course_bundles', $atts );
}

