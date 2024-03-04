<?php

class SLMS_Course_Bundles {

    public function __construct(){
        add_action( 'admin_menu', array($this, 'add_submenu_page'), 1001 );
        add_filter( 'stm_wpcfto_boxes', array($this, 'wpcfto_boxes'), 15 );
        add_filter( 'stm_wpcfto_fields', array($this, 'wpcfto_fields'), 15 );

        // add_action('pre_get_posts', array($this, 'filter_posts'), 15);
        add_action('save_post', array($this, 'save_post_action'), 15, 3);
    }

    public function add_submenu_page(){
        add_submenu_page(
            'stm-lms-settings',
            __( 'Course Bundles', 'slms' ),
            __( 'Course Bundles', 'slms' ),
            'manage_options',
            'edit.php?post_type=stm-course-bundles'
        );
    }

    public function wpcfto_boxes( $boxes ){
        $data_boxes = array(
            'stm_course_bundles_settings'    => array(
                'post_type' => array( 'stm-course-bundles' ),
                'label'     => esc_html__( 'Course Bundles Settings', 'slms' ),
            ),
        );

        return array_merge( $data_boxes, $boxes );
    }

    public function wpcfto_fields($fields){
        if($list = $this->restrict_access_fields()) {
            $custom_fields = [];
            foreach ($list as $field_item) {
                $field_id = $field_item['id'];
                $options_default = [
                    '' => __('Choose', 'slms')
                ];
                $options = $this->get_fb_select_options__style1($field_item['choices']);
                $custom_fields['restrict_access_'.$field_id] = array(
                    'type'  => 'select',
                    'label' => __('Restrict Access by ', 'slms').$field_item['label'],
                    'options' => array_merge($options_default, $options),
                );
            }
            $fields['stm_course_bundles_settings']['section_restrict'] = array(
                'name' => __('Restrict Access', 'slms'),
                'label' => __('Restrict Access', 'slms'),
                'fields' => $custom_fields
            );
        }

        return $fields;
    }

    public function restrict_access_fields($only_id = false){

        $fields = ($only_id) ? get_transient( 'restrict_access_fields_ids' ) : get_transient( 'restrict_access_fields' );

        if ( false === $fields ) {
            $fields = [];
            $course_availability = STM_LMS_Options::get_option('managing_availability_enabled', false);

            if($course_availability) {
                $form_builder_fields = SLMS_Form_Builder::get_form_builder_fields();
                if(count($form_builder_fields)) {
                    foreach ($form_builder_fields as $k => $field_item) {
                        $field_id = $field_item['id'];
                        $field_enabled = STM_LMS_Options::get_option($field_id, false);
                        if($field_enabled) {
                            if($only_id) {
                                $fields[] = $field_id;
                            } else {
                                $fields[] = $field_item;
                            }
                        }
                    }
                }
            }
            if($only_id) {
                set_transient( 'restrict_access_fields_ids', $fields, 60 * MINUTE_IN_SECONDS );
            } else {
                set_transient( 'restrict_access_fields', $fields, 60 * MINUTE_IN_SECONDS );
            }
        }

        return $fields;
    }

    public function get_fb_select_options__style1($choices){
        $options = [];
        if(count($choices)) {
            foreach ($choices as $choice) {
                $options[$choice] = $choice;
            }
        }
        return $options;
    }

    public function filter_posts($query){
        $is_admin = is_admin() ;
        $is_post_type = $query->get('post_type') == 'stm-course-bundles';

        if ( ! $is_admin && $is_post_type ) {

            if(!is_user_logged_in()) {
            } else {
                $meta_query = array();

                $user = wp_get_current_user();
                $user_meta = [];

                $list = $this->restrict_access_fields(true);

                if(count($list)) {
                    foreach ($list as $field_id) {
                        $meta = get_user_meta($user->ID, $field_id, true);
                        if(!empty($meta)) {
                            $user_meta[$field_id] = $meta;
                        }
                    }
                    if(count($user_meta)) {
                        foreach ($user_meta as $field_id => $field_value) {
                            $meta_query[] = array(
                                'relation' => 'OR',
                                array(
                                    'key' => 'restrict_access_'.$field_id,
                                    'value' => $field_value,
                                    'compare' => '='
                                ),
//                                array(
//                                    'key' => 'restrict_access_'.$field_id,
//                                    'value' => '',
//                                    'compare' => '='
//                                ),
                                array(
                                    'key' => 'restrict_access_'.$field_id,
                                    'compare' => 'NOT EXISTS',
                                )
                            );
                        }
                    }
                }

                if(count($meta_query) > 1) {
                    $meta_query = array_merge(['relation' => 'AND'], $meta_query);
                }

                if ( !current_user_can('administrator') ) {
                    $query->set( 'meta_query', $meta_query );
                }

            }

        }
    }

    public function save_post_action($post_id, $post, $update){
        if(wp_is_post_revision( $post_id ) || get_post_type($post_id) !== 'stm-course-bundles'){
            return;
        }
        $list = $this->restrict_access_fields(true);

        if(count($list)) {
            foreach ($list as $field_id) {
                $meta = get_post_meta($post_id, 'restrict_access_'.$field_id, true);
                if(empty($meta)) {
                    delete_post_meta($post_id, 'restrict_access_'.$field_id);
                }
            }
        }
    }

}

new SLMS_Course_Bundles();
