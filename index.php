<?php
/*
Plugin Name: STM LMS Customizations
Plugin URI: https://stylemix.net/
Description: STM LMS Customizations plugin for Next-U Academy
Author: Stylemix
Author URI: https://stylemix.net/
Text Domain: slms
Version: 2.0.4
*/
//error_reporting( E_ALL );
// Display errors in the browser
//ini_set( 'display_errors', 1 );
define( 'SLMS_VERSION', '2.0.4' );
define( 'SLMS_PATH', dirname( __FILE__ ) );
define( 'SLMS_URL', plugin_dir_url( __FILE__ ) );
$plugin_path = dirname( __FILE__ );

require_once $plugin_path . '/inc/functions.php';
require_once $plugin_path . '/addons.php';

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

function custom_logger($message) {
    $log_file = SLMS_PATH . '/custom_log.txt';

	 $message = print_r($message, true);
	 $log_message = '[' . date('Y-m-d H:i:s') . '] ' . $message . "\n";
    file_put_contents($log_file, $log_message, FILE_APPEND);
}


