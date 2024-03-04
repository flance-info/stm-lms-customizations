<?php

class SLMS_Courses_Visibility {

    public function __construct()
    {
        add_action( 'init', array($this, 'register_taxonomy'), 15 );

        add_action('pre_get_posts', array($this, 'filter_posts'), 15);
        add_filter('stm_lms_archive_filter_args', array($this, 'archive_filter_args'), 15);

        add_filter('wpcfto_options_page_setup', array($this, 'options_setup'), 15);
        add_filter('stm_wpcfto_fields', array($this, 'wpcfto_fields'), 20);
        add_filter('masterstudy_lms_course_custom_fields', array($this, 'cb_fields'), 20);

        add_action('save_post', array($this, 'save_post_action'), 15, 3);
        add_action( 'masterstudy_lms_custom_fields_updated', array($this, 'updated_custom_fields'), 15, 2 );

        add_action('template_redirect', array($this, 'restrict_access_redirect'));
    }

    public function register_taxonomy(){
        $list = $this->restrict_access_fields();
        if(count($list)) {
            foreach ($list as $item) {
                $args = [
                    'hierarchical'      => true,
                    'labels'            => array(
                        'name'              => $item['label'],
                        'singular_name'     => $item['label'],
                        'menu_name'         => $item['label'],
                    ),
                    'show_ui'           => false,
                    'show_admin_column' => true,
                    'query_var'         => true,
                    'rewrite'           => array( 'slug' => 'slms_'.$item['id'] ),
                ];
                register_taxonomy( 'slms_'.$item['id'], 'stm-courses', $args );
            }
        }
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
            $fields['stm_courses_settings']['section_restrict'] = array(
                'name' => __('Restrict Access', 'slms'),
                'label' => __('Restrict Access', 'slms'),
                'fields' => $custom_fields
            );
        }

        return $fields;
    }

    public function cb_fields($fields){

        if($list = $this->restrict_access_fields()) {
            $custom_fields = [];
            foreach ($list as $field_item) {
                $field_id = $field_item['id'];
                $options_default = [
                    [
                        'value' => '',
                        'label' => __('Choose', 'slms')
                    ]
                ];
                $options = $this->get_fb_select_options__style2($field_item['choices']);
                $custom_fields[] = array(
                    'type'  => 'select',
                    'name'  => 'restrict_access_'.$field_id,
                    'label' => __('Restrict Access by ', 'slms').$field_item['label'],
                    'options' => array_merge($options_default, $options),
                );
            }
            $fields = array_merge( $fields, $custom_fields );
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

    public function get_fb_select_options__style2($choices){
        $options = [];
        if(count($choices)) {
            foreach ($choices as $choice) {
                $options[] = array(
                    'value' => $choice,
                    'label' => $choice
                );
            }
        }
        return $options;
    }

    public function restrict_access_fields($only_id = false){

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

        return $fields;
    }


    public function filter_posts($query)
    {

        $is_admin = is_admin() ;
        if(isset($query->query_vars['post_type'])) {
            $is_post_type = $query->query_vars['post_type'] == 'stm-courses';
        } else {
            return;
        }

        if ( ! $is_admin && $is_post_type ) {

            if(is_user_logged_in()) {
                $tax_query = [];
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
                            $tax_query[] = array(
                                'relation' => 'OR',
                                array(
                                    'taxonomy' => 'slms_'.$field_id,
                                    'field' => 'slug',
                                    'terms' => $field_value,
                                ),
                                array(
                                    'taxonomy' => 'slms_'.$field_id,
                                    'operator' => 'NOT EXISTS',
                                )
                            );
                        }
                    }
                }

                if(count($tax_query) > 1) {
                    $tax_query = array_merge(['relation' => 'AND'], $tax_query);
                }

//                pre_die($tax_query);

                if ( !current_user_can('administrator') ) {
                    $query->set( 'tax_query', $tax_query );
                }
            }

        }
    }

    public function archive_filter_args($args)
    {
        if(is_user_logged_in()) {
            $tax_query = [];
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
                        $tax_query[] = array(
                            'relation' => 'OR',
                            array(
                                'taxonomy' => 'slms_'.$field_id,
                                'field' => 'slug',
                                'terms' => $field_value,
                            ),
                            array(
                                'taxonomy' => 'slms_'.$field_id,
                                'operator' => 'NOT EXISTS',
                            )
                        );
                    }
                }
            }

            if(count($tax_query) > 1) {
                $tax_query = array_merge(['relation' => 'AND'], $tax_query);
            }


            if ( !current_user_can('administrator') ) {
                $args['tax_query'] = $tax_query;
            }

        }


        return $args;
    }

    public function save_post_action($post_id, $post, $update){
        if(wp_is_post_revision( $post_id ) || get_post_type($post_id) !== 'stm-courses'){
            return;
        }
        $list = $this->restrict_access_fields();

        if(count($list)) {
            foreach ($list as $item) {
                $field_id = sanitize_text_field($item['id']);
                $meta = get_post_meta($post_id, 'restrict_access_'.$field_id, true);
                if(empty($meta)) {
                    delete_post_meta($post_id, 'restrict_access_'.$field_id);
                    wp_delete_object_term_relationships( $post_id, 'slms_'.$field_id );
                } else {
                    wp_delete_object_term_relationships( $post_id, 'slms_'.$field_id );
                    wp_add_object_terms( $post_id, $meta, 'slms_'.$field_id, true );
                }

            }
        }
    }

    public function updated_custom_fields($post_id, $data){
        if(count($data)) {
            foreach ($data as $name => $val) {
                wp_delete_object_term_relationships( $post_id, 'slms_'.$name );
                wp_add_object_terms( $post_id, $val, 'slms_'.$name, true );
            }

        }
    }

    public function restrict_access_redirect(){
        if ( current_user_can('administrator') ) {
            return;
        }

        if(is_singular('stm-courses') && is_user_logged_in()) {
            $post_id = get_the_ID();
            $user_id = get_current_user_id();
            $list = $this->restrict_access_fields();

            $author_id = get_post_field( 'post_author', $post_id );
            $co_instructor = get_post_meta( $post_id, 'co_instructor', true );
            $instructors_ids = (array)get_post_meta( $post_id, 'co_instructors', true );

            $instructors_ids = array_merge([$author_id,$co_instructor],$instructors_ids);
            $instructors_ids = (!empty($instructors_ids)) ? array_filter($instructors_ids) : [];
            $instructors_ids = (!empty($instructors_ids)) ? array_map('intval', $instructors_ids) : [];
            $instructors_ids = (!empty($instructors_ids)) ? array_unique($instructors_ids) : [];

            if(in_array($user_id, $instructors_ids)) {
                return;
            }

            if(count($list)) {
                foreach ($list as $item) {
                    $field_id = sanitize_text_field($item['id']);
                    $post_meta = get_post_meta($post_id, 'restrict_access_'.$field_id, true);
                    $user_meta = get_user_meta($user_id, $field_id, true);

                    if(!empty($post_meta) && !empty($user_meta)) {
                        if($post_meta != $user_meta) {
                            wp_redirect(home_url());
                        }
                    }
                }
            }
        }
    }

}

new SLMS_Courses_Visibility();
