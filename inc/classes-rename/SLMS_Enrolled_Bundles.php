<?php

class SLMS_Enrolled_Bundles {

    public function __construct()
    {
        add_filter( 'stm_lms_menu_items', array($this, 'user_menu_items'), 15 );
        add_filter( 'stm_lms_custom_routes_config', array($this, 'page_routes'), 15 );
        add_action( 'wp_enqueue_scripts', array($this, 'enqueue_script_styles'), 15 );
    }

    public function enqueue_script_styles(){
        $lms_template_current = get_query_var( 'lms_template' );
        if($lms_template_current == 'stm-lms-user-enrolled-bundles') {
        }
    }

    public function user_menu_items($menus){

        $menus[] = array(
            'order'        => 110,
            'id'           => 'enrolled_bundles',
            'slug'         => 'enrolled-bundles',
            'lms_template' => 'stm-lms-user-enrolled-bundles',
            'menu_title'   => esc_html__( 'Enrolled Bundles', 'slms' ),
            'menu_icon'    => 'fa-layer-group',
            'menu_url'     => self::calendar_url(),
            'menu_place'   => 'learning',
        );

        return $menus;
    }

    public function page_routes($page_routes){
        $page_routes['user_url']['sub_pages']['enrolled-bundles'] = array(
            'template'  => 'stm-lms-user-enrolled-bundles',
            'protected' => true,
            'url'       => 'enrolled-bundles',
        );

        return $page_routes;
    }

    public static function calendar_url() {
        return STM_LMS_User::login_page_url() . 'enrolled-bundles';
    }

    public static function get_ids(){
        $user_id = get_current_user_id();
        $user_courses = stm_lms_get_user_courses($user_id,'','',['user_id','course_id','bundle_id']);

        $bundles = [];
        if(count($user_courses)){
            foreach ($user_courses as $course) {
                if(!empty(intval($course['bundle_id']))) {
                    $bundles[] = intval($course['bundle_id']);
                }
            }
            $bundles = array_unique($bundles);
        }
        return $bundles;
    }

    public static function get_bundle_courses(){
        $user_id = get_current_user_id();
        $user_courses = stm_lms_get_user_courses($user_id,'','',['user_id','course_id','bundle_id']);

        $courses = [];
        if(count($user_courses)){
            foreach ($user_courses as $course) {
                if(!empty(intval($course['bundle_id']))) {
                    $courses[] = intval($course['course_id']);
                }
            }
            $courses = array_unique($courses);
        }
        return $courses;
    }

}

new SLMS_Enrolled_Bundles();