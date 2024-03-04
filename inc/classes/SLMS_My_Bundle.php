<?php

class SLMS_My_Bundle {

    public function __construct() {
        add_action( 'stm_lms_bundle_data_validated', array( $this, 'save_bundle_data' ) );
    }

    public function save_bundle_data($data){
        $point_price = (isset($_POST['point_price'])) ? intval($_POST['point_price']) : 0;
        update_post_meta( $data['id'], 'bundle_point_price', $point_price );
    }

}
new SLMS_My_Bundle();