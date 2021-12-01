(function($, window, document, undefined) {
    'use strict';

    $(function() {
        /*-----------------------------------------------------------------------------
             Global
        -----------------------------------------------------------------------------*/
        /*
         * All codes that are global are meant to be left in an open scope
         * so that the rest of the codes in this JS file can reuse these
         * variables and functions.
         */

        var $win = $(window);

        (function() {


            /*------------------------------
                 GA Event
            --------------------------------*/
            $('.ga_check').on('click', function () {
                currentTarget = $(this);
                _gaTrackingEvent = currentTarget.attr('data-gacheck');

                ga('send', 'event', 'User Action', 'Click button', _gaTrackingEvent);
            });
            /*add class "ga_check"    data-gacheck=""    */

        })();



        //Navigation Bar Mobile Trigger
        (function() {

            var $hamburgerTriger = $('.js-hamburger-menu'),
                $menuNav = $('.js-menu-navigation'),
                $body = $('body');

            $hamburgerTriger.each(function(){

                var $this = $(this);

                $this.on('click', function(e){


                    if($this.is('.mobile-nav')){
                        $this.toggleClass('open');
                        $menuNav.toggleClass('open');
                        $body.toggleClass('noscroll');

                    }
                    e.preventDefault();

                });

            });



        })();

        //Navbar

        (function() {
            var $trigger = $('.js-dropdown-trigger'),
                $dropMenu = $('.js-dropdown-menu');
                function hoverDesktop() {
            if ( $(window).width() <= 999) {


            } else {

                $trigger.hover(
                    function(){ $(this).addClass('open') },
                    function(){ $(this).removeClass('open') }
                );
            }

        }


        $(window).resize(hoverDesktop);
        hoverDesktop();


        })();


        //Smooth Scrooling

        (function() {

            var $backTop = $('.js-back-to-top'),
                scrollDuration = 700;

                $backTop.on('click', function(e){
                    e.preventDefault();
                    $('body, html').animate({
                        scrollTop: 0,
                    }, scrollDuration

                    );

                });

        })();


        // Calculate height for tripadvisor
        
        (function(){
            function parallax(){
                if($(window).width() <= 999){
                    var top_header = $('.img-bg-parallax');
                    top_header.css({'background-position':'center'});
                    $(window).scroll(function () {
                        return;
                    });
                }else{
                    var top_header = $('.img-bg-parallax');
                    top_header.css({'background-position':'50% 80px'});
                    $(window).scroll(function () {
                        var st = $(this).scrollTop();
                        top_header.css({'background-position':'50% calc(80px + '+(st*(-.4))+'px)'});

                    });
                }
            }
            $(window).resize(parallax);
            parallax();


        })();




        /*-----------------------------------------------------------------------------
            Tab
        -----------------------------------------------------------------------------*/
        (function() {
            'use strict';




            /*--------------------------------------------------------
                Responsive Tab
            ----------------------------------------------------------*/
            $(document).on('show.bs.tab', '.js-nav-tabs-responsive [data-toggle="tab"]', function(e) {
                var $target = $(e.target);
                var $tabs = $target.closest('.js-nav-tabs-responsive');
                var $current = $target.closest('li');
                var $next = $current.next();
                var $prev = $current.prev();

                $tabs.find('>li').removeClass('next prev');
                $prev.addClass('prev');
                $next.addClass('next');


            });





            /*--------------------------------------------------------
                OnClick problem load carousel -- target re-call
            ----------------------------------------------------------*/
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                $('.tabs-content-wrapper .carousel').slick('setPosition');
            })



        })();




    });
})(jQuery, this, this.document);
