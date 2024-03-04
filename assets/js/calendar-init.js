var slmsCalendar = null;
(function ($){

    let calendarEl = document.getElementById('slms-calendar');
    if(calendarEl) {
        slmsCalendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            // initialView: 'timeGridWeek',
            themeSystem: 'bootstrap',
            nowIndicator: true,
            firstDay: 1,
            headerToolbar: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            // headerToolbar: {
            //     left: 'prev,next',
            //     center: 'title',
            //     right: 'today,timeGridWeek,dayGridMonth'
            // },
            navLinks: false, // can click day/week names to navigate views
            editable: false,
            selectable: true,
            dayMaxEvents: false, // allow "more" link when too many events
            displayEventEnd: true,
            eventTimeFormat: {
                hour: '2-digit',
                minute: '2-digit',
            },
            longPressDelay: 1,
            height: "auto",
            // eventClick: function(info) {
            // },
            eventMouseEnter: function (info){
                let props = info.event.extendedProps;
                let html = '<div class="slms-calendar-popup">';
                    html += '<div class="stm_lms_courses__single--info">';

                        html += '<div class="stm_lms_courses__single--info_title">';
                            html += '<a href="'+ props.url +'" target="_blank"><h4>' + props.title + '</h4></a>';
                        html += '</div>';

                        if(typeof props.excerpt !== 'undefined') {
                            html += '<div class="stm_lms_courses__single--info_excerpt">';
                            html += props.excerpt;
                            html += '</div>';
                        }

                        if(typeof props.materials !== 'undefined') {
                            html += '<div class="stm_lms_courses__single--info_excerpt">';
                            for (let i in props.materials) {
                                let title = props.materials[i].title;
                                let date = props.materials[i].date;
                                html += '<div class="slms-material-item"><small>'+title+'</small> <small class="slms-material-date">'+date+'</small></div>';
                            }
                            html += '</div>';
                        }

                        html += '<div class="stm_lms_courses__single--info_meta">';
                            if(typeof props.duration !== 'undefined' && props.duration !== '') {
                                html += '<div class="stm_lms_course__meta">';
                                html += '<i class="far fa-clock"></i>' + props.duration;
                                html += '</div>';
                            }
                            if(typeof props.lectures !== 'undefined' && props.lectures !== '') {
                                html += '<div class="stm_lms_course__meta">';
                                html += '<i class="stmlms-cats"></i>' + props.lectures;
                                html += '</div>';
                            }
                            html += '<div class="stm_lms_course__meta">';
                                html += props.progress + props.progress_label;
                            html += '</div>';
                        html += '</div>';

                        if(typeof props.progress !== 'undefined') {
                            html += '<div class="stm_lms_courses__single--progress_bar">';
                                html += '<div class="stm_lms_courses__single--progress_filled" style="width: ' + props.progress + '%;">';
                                html += '</div>';
                            html += '</div>';
                        }

                    html += '</div>';
                html += '</div>';

                $(info.el).find('.slms-calendar-popup').remove();
                $(info.el).append(html);
            },
            eventMouseLeave: function (info){
                $(info.el).find('.slms-calendar-popup').remove();
            },
            events: slms_calendar.events
        });

        slmsCalendar.render();
    }

})(jQuery);