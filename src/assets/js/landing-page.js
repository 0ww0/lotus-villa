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
                autoplaySpeed: 7000,
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
        };

        $('.carousel').each(function() {
            //Only 1 slick is available disable slick
            if($(this).find('.carousel_item').length < 2) {
                return;
            }


            initSlick($(this), {
                slide: '.carousel_item'
            });
        });
    }


    // Calculate tripadvisor height

})();
