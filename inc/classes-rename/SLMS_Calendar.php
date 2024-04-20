<?php

class SLMS_Calendar {

    public $user_courses = [];

    public function __construct()
    {
        add_action('init', function (){
            $user_id = get_current_user_id();
            $this->user_courses = stm_lms_get_user_courses( $user_id );
        });

        add_filter( 'stm_lms_menu_items', array($this, 'user_menu_items'), 15 );
        add_filter( 'stm_lms_custom_routes_config', array($this, 'page_routes'), 15 );
        add_action( 'wp_enqueue_scripts', array($this, 'enqueue_script_styles'), 15 );

        add_filter('stm_wpcfto_fields', array($this, 'metabox_fields'), 15);
        add_filter('masterstudy_lms_course_custom_fields', array($this, 'custom_fields'), 15);
        add_filter('masterstudy_lms_quiz_custom_fields', array($this, 'custom_fields'), 15);
    }

    public function enqueue_script_styles(){
        $lms_template_current = get_query_var( 'lms_template' );
        if($lms_template_current == 'stm-lms-user-calendar') {
            wp_enqueue_style( 'slms-full-calendar', SLMS_URL . 'assets/css/full-calendar.css', array( 'stm_theme_styles' ), SLMS_VERSION, 'all' );
            wp_enqueue_script( 'slms-full-calendar', SLMS_URL . 'assets/js/full-calendar.min.js', array( 'jquery' ), SLMS_VERSION, true );
            wp_enqueue_script( 'slms-calendar-init', SLMS_URL . 'assets/js/calendar-init.js', array( 'jquery' ), SLMS_VERSION, true );
            wp_localize_script('slms-calendar-init', 'slms_calendar', $this->calendar_data());
        }
    }

    public function user_menu_items($menus){

        $menus[] = array(
            'order'        => 110,
            'id'           => 'calendar',
            'slug'         => 'calendar',
            'lms_template' => 'stm-lms-user-calendar',
            'menu_title'   => esc_html__( 'Calendar', 'slms' ),
            'menu_icon'    => 'fa-book',
            'menu_url'     => self::calendar_url(),
            'menu_place'   => 'learning',
        );

        return $menus;
    }

    public function page_routes($page_routes){
        $page_routes['user_url']['sub_pages']['calendar'] = array(
            'template'  => 'stm-lms-user-calendar',
            'protected' => true,
            'url'       => 'calendar',
        );

        return $page_routes;
    }

    public static function calendar_url() {
        return STM_LMS_User::login_page_url() . 'calendar';
    }

    public function metabox_fields($fields): array
    {
        $custom_fields = [
            'event_date' => array(
                'type'  => 'text',
                'label' => __( 'Date (for Calendar)', 'slms' ),
                'description' => __( 'Format as YYYY-MM-DD', 'slms' ),
            ),
        ];

        $fields['stm_courses_settings']['section_date'] = array(
            'name' => __('Date', 'slms'),
            'label' => __('Date', 'slms'),
            'fields' => $custom_fields
        );

        $quiz_settings = $fields['stm_quiz_settings']['section_quiz_settings']['fields'];
        $fields['stm_quiz_settings']['section_quiz_settings']['fields'] = array_merge($quiz_settings, $custom_fields);

        $assigment_settings = $fields['assignment_settings']['tab_1']['fields'];
        $fields['assignment_settings']['tab_1']['fields'] = array_merge($assigment_settings, $custom_fields);

        return $fields;
    }

    public static function custom_fields($fields){
        $custom_fields = [
            array(
                'type' => 'text',
                'name' => 'event_date',
                'label' => __('Date (for Calendar)', 'slms'),
                'custom_html' => '<small style="margin-top:0;">'.__( 'Format as YYYY-MM-DD', 'slms' ).'</small>',
            ),
        ];

        return array_merge( $fields, $custom_fields );
    }

    public function get_courses(){
        $courses = [];

        if(count($this->user_courses)) {
            foreach ( $this->user_courses as $course_user ) {
                $course_id = intval($course_user['course_id']);
                if (get_post_type($course_id) != 'stm-courses') {
                    continue;
                }
                if ( ! get_post_status( $course_id ) ) {
                    continue;
                }

                $event_date_meta = get_post_meta($course_id,'event_date', true);
                if(empty($event_date_meta) || !strtotime($event_date_meta)) {
                    continue;
                }

                $courses[] = $course_user;
            }
        }

        return $courses;
    }

    public function get_course_materials($course_id){
        $materials = [];
        $date_format = get_option('date_format');
        $curriculum   = ( new \MasterStudy\Lms\Repositories\CurriculumRepository() )->get_curriculum( $course_id, true );
        if ( ! empty( $curriculum ) ) {
            foreach ( $curriculum as $section ) {
                if ( empty( $section['materials'] ) ) {
                    continue;
                }
                foreach ( $section['materials'] as $index => $material ) {
                    $post_id = intval($material['post_id']);

                    $event_date_meta = get_post_meta($post_id,'event_date', true);
                    if(empty($event_date_meta) || !strtotime($event_date_meta)) {
                        continue;
                    }
                    $event_date = strtotime($event_date_meta);

                    if ( 'stm-quizzes' === $material['post_type'] ) {
                        $materials[] = [
                            'id' => $post_id,
                            'title' => get_the_title($post_id),
                            'date' => date_i18n($date_format, $event_date)
                        ];
                    }
                    if ( 'stm-assignments' === $material['post_type'] ) {
                        $materials[] = [
                            'id' => $post_id,
                            'title' => get_the_title($post_id),
                            'date' => date_i18n($date_format, $event_date)
                        ];
                    }
                }
            }
        }
        return $materials;
    }

    public function get_courses_events() {
        $events = [];

        if(count($this->get_courses())) {
            foreach ( $this->get_courses() as $course_user ) {
                $course_id = intval($course_user['course_id']);
                $progress = intval($course_user['progress_percent']);
                $event_date_meta = get_post_meta($course_id,'event_date', true);
                $event_date = strtotime($event_date_meta);

                $duration    = get_post_meta( $course_id, 'duration_info', true );
                $lectures    = STM_LMS_Course::curriculum_info( $course_id );

                $materials = $this->get_course_materials($course_id);

                $events[] = [
                    'id' => $course_id,
                    'title' => __('Course','slms').': '.get_the_title($course_id),
                    'start' => date('Y-m-d', $event_date),
                    'type' => 'stm-courses',
                    'extendedProps' => [
                        'title' => get_the_title($course_id),
                        'url' => get_the_permalink($course_id),
                        'duration' => $duration,
                        'lectures' => $lectures['lessons'].' '.__('Lectures', 'slms'),
                        'progress' => $progress,
                        'progress_label' => '% '.__('Complete', 'slms'),
                        'materials' => $materials
                    ]
                ];
            }
        }

        return $events;
    }

//    public function get_quizes_events(){
//        $events = [];
//
//        $courses = $this->get_courses();
//        if(count($courses)) {
//            foreach ($courses as $item) {
//                $course_id = $item['id'];
//                $event_date_meta = get_post_meta($course_id,'event_date', true);
//                $event_date = strtotime($event_date_meta);
//            }
//        }
//
//        return $events;
//    }

    public function calendar_data(){

        return [
            'events' => $this->get_courses_events()
        ];

//        $courses = $this->get_courses_events();
//        $quizzes = $this->get_quizes_events();
//
//        return [
//            'events' => array_merge($courses, $quizzes)
//        ];

    }

}

new SLMS_Calendar();