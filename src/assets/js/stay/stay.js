(function() {

    //NOTE Carousel
    //  Slick Funtion on Landing Page


    (function() {
        /*-----------------------------------------------------------------------------
             Slick
        -----------------------------------------------------------------------------*/
        if('slick' in $()) { // Only run if slick is available
        var initSlick = function($target, props) {
            $target.slick({
                adaptiveHeight: true,
                autoplay: true,
                autoplaySpeed: 10000,
                dots: true,
                slide: props.slide,
                useCSS: true,
                useTransform: true,
                cssEase: 'cubic-bezier(0.19, 1, 0.22, 1)',
                speed: 600,
                arrows: false
            });

            $(window).scroll(function() {
                var whole_window_height = $(this).scrollTop() + $(this).height(),
                    carousel_holder_height = $('.carousel').offset().top + $('.carousel').outerHeight();

                if (whole_window_height > carousel_holder_height) {
                    $target.slick('slickPause');
                } else {
                    $target.slick('slickPlay');
                }
            });


            lightBoxPopUp();
        };

        $('.carousel').each(function() {
            
            initSlick($(this), {
                slide: '.carousel_item'
            });
        });
    }


        /*-----------------------------------------------------------------------------
            Slick  Lightbox
       -----------------------------------------------------------------------------*/
       function lightBoxPopUp() {
           //slick light box
           //http://mreq.github.io/slick-lightbox/demo/
           //https://github.com/mreq/slick-lightbox
           $('.carousel_hdr').slickLightbox({
               background: 'rgba(0, 0, 0, 0.9)',
               src: 'data-src',
               itemSelector: '.carousel_item .book-room-img-holder',
               closeOnBackdropClick: false,
               slick:  {
                   dots: true,
                   arrows: false
               }
           });



           $('.carousel_hdr').slickLightbox().on({
               'show.slickLightbox': function(){
                   $('body').addClass('noscroll');
               },
               'hide.slickLightbox': function(){
                   $('body').removeClass('noscroll');
               }
           });
       }


       $('.js-lightboxPopup').on('click', function(){
           $('.room-book-wrapper .carousel_item').find('.book-room-img-holder').click();
       });

    })();




    //NOTE Datepicker
    var $dateStart = $('[data-toggle="datepicker-start"]');
    var $dateEnd = $('[data-toggle="datepicker-end"]');

    $('[data-toggle="datepicker-start"]').datepicker(
    {   // option
        autoclose: 'true',
        format: "D, dd/mm/yyyy",
        startDate: 'today',
        orientation: "bottom auto",
        todayHighlight: 'true'

    }).on('changeDate',function(){
        var date = $dateStart.datepicker('getDate');
        date.setDate(date.getDate() + 1);
        $dateEnd.datepicker('setDate', date);

        $dateEnd[0].focus();
    });

    $('[data-toggle="datepicker-end"]').datepicker(
    {   // option
        autoclose: 'true',
        format: "D, dd/mm/yyyy",
        startDate: 'tomorrow',
        orientation: "bottom auto",
        endDate:0
    }).on('changeDate', function(){
        var dateS = $dateStart.datepicker('getDate');
        var dateE = $dateEnd.datepicker('getDate');
        if (dateE <= dateS){

        }
    });

    $dateStart.change('input', function(){
        calcDate();
    });
    $dateEnd.change('input', function(){
        calcDate();
    });

    function calcDate(){
        var oneDay = 24*60*60*1000;
        var enterStart = $dateStart.val().split(/[,\/]/g); // output Mon, 20/10/2017
        var convertStart = new Date(enterStart[3],enterStart[2],enterStart[1]); //Output 2017/10/20
        var enterEnd = $dateEnd.val().split(/[,\/]/g);
        var convertEnd = new Date(enterEnd[3],enterEnd[2],enterEnd[1]);
        var miliStart = convertStart.getTime();
        var miliEnd = convertEnd.getTime();
        var days = Math.round(Math.abs((miliStart-miliEnd)/(oneDay)));
        if (miliStart > miliEnd){
            days = 0;
        }
        if(isNaN(days)){
            return 0;
        }
        if(days >= 2){
            $('#value').text(days + ' nights');
        }else{
            $('#value').text(days + ' night')
        }
    }

    var $startTrigger = $('i.icon-calendar');

    $startTrigger.on('click', function(){
        var $dateInput = $(this).closest('.form-date').find('input');
        $dateInput.focus();
    });


    //NOTE Clicker
    var $buttonPlus = $('.btn-plus');
    var $buttonMinus = $('.btn-minus');
    var limit = $('#guest_input').data('limit');

    $buttonPlus.on('click',function(){
        var $qty = $(this).closest('.form-number-holder').find('.incr-form');
        var $currentVal = parseInt($qty.val());

        if(!isNaN($currentVal)){
            if($qty.hasClass('guest-input')){
                if($currentVal < limit){
                    $qty.val($currentVal + 1);
                }
                if($currentVal > limit){
                    $qty.val(0)
                }
            }
        }
    });

    $buttonMinus.on('click', function(){
        var $qty = $(this).closest('.form-number-holder').find('.incr-form');
        var $currentVal = parseInt($qty.val());
        if(!isNaN($currentVal) && $currentVal > 0){
            $qty.val($currentVal -1);
        }
    });


})();
