<?php

function override_assignments_routes() {
	global $router;
	$addon_folder = SLMS_PATH . '/addons';
	$files = scan_directory_recursive( $addon_folder );
	foreach ( $files as $file ) {
		require_once $file;
	}

}
function scan_directory_recursive($dir) {
    $files = [];
    foreach (scandir($dir) as $file) {
        if ($file != '.' && $file != '..') {
            if (is_dir($dir . '/' . $file)) {
                // Recursively scan subdirectories
                $files = array_merge($files, scan_directory_recursive($dir . '/' . $file));
            } elseif (pathinfo($file, PATHINFO_EXTENSION) === 'php') {
                // Add PHP files to the list
                $files[] = $dir . '/' . $file;
            }
        }
    }
    return $files;
}


add_action( 'init', 'override_assignments_routes' );
