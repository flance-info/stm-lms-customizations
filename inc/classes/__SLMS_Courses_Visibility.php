<?php

class SLMS_Courses_Visibility {

    public function __construct()
    {
        add_action('pre_get_posts', array($this, 'filter_posts'));
//        add_filter('stm_lms_archive_filter_args', array($this, 'archive_filter_args'), 15);

        add_filter('wpcfto_options_page_setup', array($this, 'options_setup'), 15);
        add_filter('stm_wpcfto_fields', array($this, 'wpcfto_fields'), 20);
        add_filter('masterstudy_lms_course_custom_fields', array($this, 'cb_fields'), 20);

//        add_action('template_redirect', function (){
////            $course_availability = STM_LMS_Options::get_option('managing_availability_enabled', false);
//            $fields = SLMS_Form_Builder::get_form_builder_fields();
////            pre_var($course_availability);
//            pre_var($fields);
//        });
    }

    public function options_setup($setups){

        $fields = array(
            'managing_availability_enabled' => array(
                'type'  => 'checkbox',
                'label' => __('Enable', 'slms'),
            )
        );

        $form_builder_fields = SLMS_Form_Builder::get_form_builder_fields();
        if(count($form_builder_fields)) {
            foreach ($form_builder_fields as $k => $field_item) {
                $field_id = $field_item['id'];
//                if($field_item['type'] !== 'select') {
//                    continue;
//                }
                $fields[$field_id] = array(
                    'type'  => 'checkbox',
                    'label' => $field_item['label'],
                    'dependency'   => array(
                        'key'   => 'managing_availability_enabled',
                        'value' => 'not_empty',
                    ),
                );
                if($k == 0) {
                    $fields[$field_id]['group'] = 'started';
                }
                if(($k + 1) == (count($form_builder_fields))) {
                    $fields[$field_id]['group'] = 'ended';
                }
            }
        }

        $setups[0]['fields' ]['managing_course_availability'] = array(
            'name' => esc_html__('Managing Course Availability', 'slms'),
            'label' => esc_html__('Course availability by parameters', 'slms'),
            'fields' => $fields,
        );

        return $setups;
    }

    public function wpcfto_fields($fields){
        $custom_fields = [];

        $course_availability = STM_LMS_Options::get_option('managing_availability_enabled', false);

        if($course_availability) {
            $form_builder_fields = SLMS_Form_Builder::get_form_builder_fields();
            if(count($form_builder_fields)) {
                foreach ($form_builder_fields as $k => $field_item) {
                    $field_id = $field_item['id'];
                    if($field_item['type'] !== 'select') {
                        continue;
                    }
                    $options = [];
                    if(count($field_item['choices'])) {
                        foreach ($field_item['choices'] as $choice) {
                            $options[$choice] = $choice;
                        }
                    }
                    $field_enabled = STM_LMS_Options::get_option($field_id, false);
                    if($field_enabled) {
                        $custom_fields['restrict_access_'.$field_id] = array(
                            'type'  => 'select',
                            'label' => __('Restrict Access by ', 'slms').$field_item['label'],
                            'options' => $options,
                        );
                    }
                }
            }

            $fields['stm_courses_settings']['section_restrict'] = array(
                'name' => __('Restrict Access', 'slms'),
                'label' => __('Restrict Access', 'slms'),
                'fields' => $custom_fields
            );
        }

        return $fields;
    }

    public function cb_fields($fields){

        $custom_fields = [];

        $course_availability = STM_LMS_Options::get_option('managing_availability_enabled', false);

        if($course_availability) {
            $form_builder_fields = SLMS_Form_Builder::get_form_builder_fields();
            if(count($form_builder_fields)) {
                foreach ($form_builder_fields as $k => $field_item) {
                    $field_id = $field_item['id'];
                    if($field_item['type'] !== 'select') {
                        continue;
                    }
                    $options = [];
                    if(count($field_item['choices'])) {
                        foreach ($field_item['choices'] as $choice) {
                            $options[] = array(
                                'value' => $choice,
                                'label' => $choice
                            );
                        }
                    }
                    $field_enabled = STM_LMS_Options::get_option($field_id, false);
                    if($field_enabled) {
                        $custom_fields[] = array(
                            'type'  => 'select',
                            'name'  => 'restrict_access_'.$field_id,
                            'label' => __('Restrict Access by ', 'slms').$field_item['label'],
                            'options' => $options,
                        );
                    }
                }
            }

            $fields = array_merge( $fields, $custom_fields );
        }

        return $fields;
    }

    public function restrict_access_fields(){
        $fields = [];

        $course_availability = STM_LMS_Options::get_option('managing_availability_enabled', false);

        if($course_availability) {
            $form_builder_fields = SLMS_Form_Builder::get_form_builder_fields();
            if(count($form_builder_fields)) {
                foreach ($form_builder_fields as $k => $field_item) {
                    $field_id = $field_item['id'];
                    $field_enabled = STM_LMS_Options::get_option($field_id, false);
                    if($field_enabled) {
                        $fields[] = $field_id;
                    }
                }
            }
        }

        return $fields;
    }


    public function filter_posts($query)
    {

        $is_admin = is_admin() ;
        $is_main_query = $query->is_main_query();
        $is_post_type = $query->get('post_type') == 'stm-courses';
        $is_archive = is_post_type_archive( 'stm-courses' );
        $is_tax = is_tax('stm_lms_course_taxonomy');

        if ( ! $is_admin && $is_post_type ) {

            if(!is_user_logged_in()) {
//                $query->set( 'post_status', 'private' );
            } else {
                $meta_query = array();

                $user = wp_get_current_user();

//                $course_availability = STM_LMS_Options::get_option('managing_availability_enabled', false);

//                if($course_availability) {
//                    $form_builder_fields = SLMS_Form_Builder::get_form_builder_fields();

//                    if(count($form_builder_fields)) {
//                        foreach ($form_builder_fields as $k => $field_item) {
//                            $field_id = $field_item['id'];
//                            $meta_query[] = array(
//                                'relation' => 'OR',
//                                array(
//                                    'key' => 'restrict_access_'.$field_id,
//                                    'value' => 'on',
//                                    'compare' => '!='
//                                ),
//                                array(
//                                    'key' => 'restrict_access_'.$field_id,
//                                    'compare' => 'NOT EXISTS',
//                                )
//                            );
//                        }
//                    }
//                }

                if(count($meta_query) > 1) {
                    $meta_query = array_merge(['relation' => 'OR'], $meta_query);
                }

                if ( !current_user_can('administrator') ) {
                    $query->set( 'meta_query', $meta_query );
                }

            }

        }
    }

    public function archive_filter_args($args)
    {
        if(!is_user_logged_in()) {
//            $args['post_status'] = 'private';
        } else {
            $meta_query = (isset($args['meta_query'])) ? $args['meta_query'] : array();

            $user = wp_get_current_user();

//            if ( user_can( $user, $this->capability_technical ) ) {
//                $meta_query[] = array(
//                    'key' => 'job_type_technical',
//                    'value' => 'on',
//                );
//            }
//            if ( user_can( $user, $this->capability_csr ) ) {
//                $meta_query[] = array(
//                    'key' => 'job_type_csr',
//                    'value' => 'on',
//                );
//            }
//            if ( user_can( $user, $this->capability_doctor ) ) {
//                $meta_query[] = array(
//                    'key' => 'job_type_doctor',
//                    'value' => 'on',
//                );
//            }

            if(count($meta_query) > 1) {
                $meta_query = array_merge(['relation' => 'OR'], $meta_query);
            }
//
//            if ( !user_can( $user, $this->capability_technical ) &&
//                !user_can( $user, $this->capability_csr ) &&
//                !user_can( $user, $this->capability_doctor )) {
//                $meta_query[] = array(
//                    'key' => '_hidden',
//                    'value' => '!=',
//                );
//            }

            if ( !current_user_can('administrator') ) {
                $args['meta_query'] = $meta_query;
            }

        }

        return $args;
    }

}

new SLMS_Courses_Visibility();