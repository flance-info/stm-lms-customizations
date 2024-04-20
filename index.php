<?php
/*
Plugin Name: STM LMS Customizations
Plugin URI: https://stylemix.net/
Description: STM LMS Customizations plugin for Next-U Academy
Author: Stylemix
Author URI: https://stylemix.net/
Text Domain: slms
Version: 1.0.4
*/

define( 'SLMS_VERSION', '1.0.4' );
define( 'SLMS_PATH', dirname( __FILE__ ) );
define( 'SLMS_URL', plugin_dir_url( __FILE__ ) );
$plugin_path = dirname( __FILE__ );

require_once $plugin_path . '/inc/functions.php';


if ( ! is_textdomain_loaded( 'slms' ) ) {
    load_plugin_textdomain(
        'slms',
        false,
        'slms/languages'
    );
}


function pre_var($var){
    echo '<pre>';
    var_dump($var);
    echo '</pre>';
}

function pre_die($var){
    pre_var($var);
    die();
}
