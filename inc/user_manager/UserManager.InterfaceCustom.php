<?php

new STM_LMS_User_Manager_InterfaceCustom();

class STM_LMS_User_Manager_InterfaceCustom extends STM_LMS_User_Manager_Interface {

	public function __construct() {

		add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'scripts' ) );
		add_action( 'admin_footer', array( $this, 'components' ) );
		add_action( 'wp_footer', array( $this, 'components' ) );
	}

	public function scripts( $hook ) {
		if ( 'toplevel_page_stm-lms-dashboard' === $hook ) {


			stm_lms_register_style( 'dashboard/dashboard' );

			// phpcs:ignore WordPress.WP.EnqueuedResourceParameters.NotInFooter
			wp_register_script( 'vue-router.js', 'https://unpkg.com/vue-router@2.0.0/dist/vue-router.js', array(), STM_LMS_VERSION );

			$components = self::components_list();

			foreach ( $components as $component ) {
				if ('certificate' !== $component ) stm_lms_register_script( "dashboard/components/{$component}" );
			}

			wp_enqueue_script( 'stm-lms-dashboard/components/certificate', SLMS_URL. 'assets/js/dashboard/certificate.js', ['jquery', 'stm_lms_table_update_scripts'], time(), 'all' );
			wp_dequeue_script('dashboard/dashboard');
			wp_enqueue_script( 'dashboard/dashboard', SLMS_URL. 'assets/js/dashboard/dashboard.js', ['vue.js','vue-resource.js','vue-router.js'], time(), true );

		}
	}

	public function components() {
		$components = self::components_list();
		foreach ( $components as $component ) {
			self::wrap_component( $component );
		}
	}


	public function components_list() {
		return array(
				'home',
				'navigation',
				'add_user',
				'student_assignments',
				'student_quiz',
				'back',
				'courses',
				'course',
				'course_user',
				'certificate'
		);
	}

	public static function wrap_component( $component ) {
		if ( is_admin() ) {
			?>
			<script type="text/html" id="<?php echo esc_attr( "stm-lms-dashboard-{$component}" ); ?>">
				<?php STM_LMS_Templates::show_lms_template( "dashboard/components/{$component}" ); ?>
			</script>
			<?php
		}
	}
}
