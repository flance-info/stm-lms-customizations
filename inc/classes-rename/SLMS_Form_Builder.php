<?php

class SLMS_Form_Builder
{
    public static function init(){
        add_action( 'admin_enqueue_scripts', array( self::class, 'admin_menu_scripts' ) );
        add_filter('stm_lms_form_builder_available_fields', array(self::class, 'available_fields'));

        add_action('admin_init', function (){
            remove_all_actions( 'show_user_profile' );
            remove_all_actions( 'edit_user_profile' );

            add_action( 'show_user_profile', array( self::class, 'display_fields_in_profile' ), 25 );
            add_action( 'edit_user_profile', array( self::class, 'display_fields_in_profile' ), 25 );
        });

    }

    public static function display_fields_in_profile( $user ) {
        slms_include_template('/form_builder/admin_profile_fields', ['user' => $user]);
    }

    public static function admin_menu_scripts(){
        wp_enqueue_script(
            "stm_lms_forms_date",
            SLMS_URL . "assets/js/form_builder/components/fields/date.js",
            array(),
            stm_lms_custom_styles_v()
        );
    }

    public static function available_fields($fields){
        $fields[]  = array(
            'type'       => 'date',
            'field_name' => esc_html__( 'Date', 'slms' ),
        );

        return $fields;
    }

    public static function get_form_builder_data(){
        return get_option( 'stm_lms_form_builder_forms', [] );
    }

    public static function get_form_builder_fields(){
        $builder_forms = self::get_form_builder_data();
        $fields = [];

        if(count($builder_forms)) {
            foreach ($builder_forms as $form) {
                if($form['slug'] == 'profile_form') {
                    $fields = $form['fields'];
                    break;
                }
            }
        }

        return $fields;
    }

    public static function get_form_builder_field_by_id($id = ''){

        $fields = self::get_form_builder_fields();
        $key = array_search($id, array_column($fields, 'id'));

        if($key === false || !isset($fields[$key])) return false;

        return $fields[$key];
    }

}


SLMS_Form_Builder::init();