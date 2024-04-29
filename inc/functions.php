<?php

require_once SLMS_PATH . '/inc/classes/SLMS_Multiple_Instructors.php';
require_once SLMS_PATH . '/inc/classes/SLMS_Form_Builder.php';
require_once SLMS_PATH . '/inc/classes/SLMS_Form_Point.php';
require_once SLMS_PATH . '/inc/classes/SLMS_Manage_Students.php';
require_once SLMS_PATH . '/inc/classes/SLMS_My_Bundle.php';
require_once SLMS_PATH . '/inc/classes/SLMS_Point_System.php';
require_once SLMS_PATH . '/inc/classes/SLMS_Point_History.php';
require_once SLMS_PATH . '/inc/classes/SLMS_Certificate_Builder.php';
require_once SLMS_PATH . '/inc/classes/SLMS_Calendar.php';
require_once SLMS_PATH . '/inc/classes/SLMS_Enrolled_Bundles.php';
require_once SLMS_PATH . '/inc/classes/SLMS_Enrolled_Courses.php';
require_once SLMS_PATH . '/inc/classes/SLMS_Courses_Visibility.php';
require_once SLMS_PATH . '/inc/classes/SLMS_Course_Bundles.php';
require_once SLMS_PATH . '/inc/certificates/SLMS_Manage_Certificates.php';
require_once SLMS_PATH . '/inc/assignments/actions.php';
require_once SLMS_PATH . '/inc/user_manager/UserManager.CourseUserCustom.php';

function load_user_assignment_class() {
	$custom_files = [
		SLMS_PATH . '/inc/assignments/user_assignment.class.php',
		SLMS_PATH . '/inc/user_manager/UserManager.InterfaceCustom.php'
	];
	foreach ( $custom_files as $custom_file ) {
		if ( file_exists( $custom_file ) ) {
			require_once $custom_file;
		} else {
			error_log( "$custom_file file not found." );
		}
	}
}

add_action('init', 'load_user_assignment_class');



add_action('wp_enqueue_scripts', function(){

    wp_enqueue_style( 'slms-front', SLMS_URL. 'assets/css/front.css', [], SLMS_VERSION, 'all' );

}, 100);

add_action('admin_enqueue_scripts', function(){

    wp_enqueue_style( 'slms-admin', SLMS_URL. 'assets/css/admin.css', [], SLMS_VERSION, 'all' );

    wp_deregister_script('stm-lms-dashboard/components/course');
    wp_enqueue_script( 'stm-lms-dashboard/components/course', SLMS_URL. 'assets/js/dashboard/course.js', ['jquery', 'stm_lms_table_update_scripts'], SLMS_VERSION, 'all' );

}, 100);



add_filter('stm_lms_template_file', function($path, $template_name){
    if(file_exists(SLMS_PATH.$template_name)) {
        return SLMS_PATH;
    }
    return $path;
}, 100, 2);


function slms_locate_template($templates, $vars = [])
{
    extract($vars);
    $located = false;

    foreach ((array)$templates as $template) {
        if (substr($template, -4) !== '.php') {
            $template .= '.php';
        }

        if (!($located = locate_template('slms/' . $template))) {
            $located = SLMS_PATH . '/templates/' . $template;
        }

        if (file_exists($located)) {
            break;
        }
    }

    return apply_filters('slms_locate_template', $located, $templates);
}


function slms_include_template($template, $vars = []){
    extract($vars);

    $locate_template = slms_locate_template($template, $vars);

    if(file_exists($locate_template)) {
        include($locate_template);
    }
}

function slms_register_script( $script, $deps = array(), $footer = false, $inline_scripts = '' ) {
    if ( ! stm_lms_is_masterstudy_theme() ) {
        wp_enqueue_script( 'jquery' );
    }

    $handle = "stm-lms-{$script}";
    wp_enqueue_script( $handle, SLMS_URL . 'assets/js/' . $script . '.js', $deps, stm_lms_custom_styles_v(), $footer );
    if ( ! empty( $inline_scripts ) ) {
        wp_add_inline_script( $handle, $inline_scripts );
    }
}