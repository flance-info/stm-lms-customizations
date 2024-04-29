<?php

SLMS_Manage_Certificates::init();

class SLMS_Manage_Certificates {
	public static function init() {
		add_filter( 'manage_stm-courses_posts_columns', 'SLMS_Manage_Certificates::columns', 20 );
		add_action( 'manage_stm-courses_posts_custom_column', 'SLMS_Manage_Certificates::column_fields', 10, 2 );
	}

	public static function columns( $columns ) {
		$columns = self::reorder_columns( $columns );
		return $columns;
	}

	public static function reorder_columns( $columns ) {
		$new_columns = [];
		foreach ( $columns as $key => $value ) {
			$new_columns[ $key ] = $value;
			if ( $key === 'lms_course_students' ) {
				$new_columns['lms_course_certificates'] = esc_html__( 'Manage Certifications', 'slms' );
			}
		}

		return $new_columns;
	}

	public static function column_fields( $columns, $post_id ) {

		switch ( $columns ) {
			case 'lms_course_certificates':
				?>
				<a href="<?php echo esc_url( admin_url( "?page=stm-lms-dashboard#/certifcate/{$post_id}" ) ); ?>" class="button action">
					<?php esc_html_e( 'Manage Certifications', 'masterstudy-lms-learning-management-system' ); ?>
				</a>
				<?php
				break;
		}
	}

}