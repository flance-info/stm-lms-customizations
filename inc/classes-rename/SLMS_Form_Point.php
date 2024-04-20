<?php

class SLMS_Form_Point
{

    public function __construct()
    {
        add_filter('stm_wpcfto_fields', array($this, 'metabox_fields'));
        add_filter('masterstudy_lms_course_custom_fields', array($this, 'custom_fields'), 15);
        add_action('stm_lms_progress_updated', array($this, 'my_progress_updated_handler'), 10, 3);
        add_action('save_post', array($this, 'set_default_course_duration'), 10, 1);
    }

    public function metabox_fields($fields): array
    {

        $fields['stm_courses_settings']['section_accessibility']['fields']['stm_point'] = array(
            'type' => 'text',
            'label' => __('Number of Credits','slms')
        );

        $fields['stm_courses_settings']['section_settings']['fields']['duration_info']['value'] = '15 minutes';

        return $fields;
    }


    public function set_default_course_duration($post_id)
    {
        // Проверяем, что это пост типа "курс" и не является автосохранением
        if (get_post_type($post_id) === 'stm-courses' && !wp_is_post_autosave($post_id)) {
            // Обновляем мета-поле "duration_info"
            if (empty(get_post_meta($post_id, 'duration_info'))) {
                update_post_meta($post_id, 'duration_info', '15 minutes');
            }
        }
    }

    public static function custom_fields($fields)
    {
        $custom_fields = array(
            array(
                'type' => 'text',
                'name' => 'stm_point',
                'label' => __('Number of Credits','slms')
            )
        );

        return array_merge($fields, $custom_fields);
    }


    public function my_progress_updated_handler($course_id, $user_id, $progress)
    {

        $threshold = STM_LMS_Options::get_option('certificate_threshold', 70);
        $added = stm_lms_check_point_added($user_id, $course_id, 'course_completed');

        if ($progress >= $threshold) {
            if (!$added) {
                $this->stm_lms_add_user_points($user_id, $course_id);
            }
        }

    }


    public function stm_lms_add_user_points($user_id, $id)
    {
        global $wpdb;
        $table_name = stm_lms_point_system_name($wpdb);
        $score = get_post_meta($id, 'stm_point', true);

        $user_points = array(
            'user_id' => $user_id,
            'id' => $id,
            'action_id' => 'course_completed',
            'score' => $score,
            'timestamp' => time(),
            'completed' => true,
        );

        $wpdb->insert(
            $table_name,
            $user_points
        );
    }

}

new SLMS_Form_Point();
