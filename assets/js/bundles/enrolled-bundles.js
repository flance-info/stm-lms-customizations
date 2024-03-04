"use strict";

(function ($) {

    $(document).ready(function () {
        var enrolled_bundles = new Vue({
            el: '#enrolled-bundles',
            data: function data() {
                return {
                    vue_loaded: true,
                    loading: false,
                    courses: [],
                    offset: 0,
                    total: false,
                    sort: 'date_low',
                    filter: {}
                };
            },
            mounted: function mounted() {
                this.getCourses();
                this.sortToggle();
            },
            methods: {
                getCourses: function getCourses() {
                    console.log(this.sort);
                    var vm = this;
                    var url = stm_lms_ajaxurl + '?action=stm_lms_get_user_courses&offset=' + vm.offset + '&nonce=' + stm_lms_nonces['stm_lms_get_user_courses'];
                    url += "&sort=".concat(vm.sort);

                    let filter = vm.filter;
                    if(filter) {
                        for (let i in vm.filter) {
                            let item = vm.filter[i];
                            url += "&filter[" + i +"]=".concat(item);
                        }
                    }
                    vm.loading = true;
                    this.$http.get(url).then(function (response) {
                        if (response.body['posts']) {
                            response.body['posts'].forEach(function (course) {
                                vm.courses.push(course);
                            });
                        }
                        vm.total = response.body['total'];
                        vm.loading = false;
                        vm.offset++;
                        Vue.nextTick(function () {
                            stmLmsStartTimers();
                        });
                    });
                },
                sortToggle: function sortToggle() {
                    var _this = this;
                    Vue.nextTick().then(function () {
                        var $ = jQuery;
                        $('.stm_lms_user_info_top__sort select').on('change', function () {
                            _this.$set(_this, 'courses', []);
                            _this.$set(_this, 'offset', 0);
                            _this.$set(_this, 'sort', $(this).val());
                            _this.getCourses();
                        });
                    });
                },
                filterRequest: function filterRequest(params) {
                    var _this = this;
                    _this.filter = params;
                    _this.offset = 0;
                    _this.courses = [];
                    _this.getCourses();
                }
            }
        });

        $('.slms_bundles_filter').on('change', 'select', function (){
            let params = {};
            $('.slms_bundles_filter select').each(function (){
                let val = $(this).val();
                let name = $(this).attr('name');
                if(val.length) {
                    params[name] = val;
                }
            });

            enrolled_bundles.filterRequest(params);
        });

    });

})(jQuery);