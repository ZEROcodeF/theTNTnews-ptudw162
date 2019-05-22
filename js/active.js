(function ($) {
    'use strict';

    var browserWindow = $(window);

    // :: 1.0 Preloader Active Code
    browserWindow.on('load', function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
        $(".searchbar").hide();
        initSlider();
        initTopCategorySlider();
    });
    
    browserWindow.on('resize',function(){
        initSlider();
    });

    $('html').click(function(){
        $(".searchbar").fadeOut(300);
        $(this).find("i").removeClass('fa-close');
    })

    // :: 2.0 Newsticker Active Code
    $.simpleTicker($("#breakingNewsTicker"), {
        speed: 1000,
        delay: 3000,
        easing: 'swing',
        effectType: 'roll'
    });
    $.simpleTicker($("#internationalTicker"), {
        speed: 1000,
        delay: 4000,
        easing: 'swing',
        effectType: 'roll'
    });

    // :: 3.0 Nav Active Code
    if ($.fn.classyNav) {
        $('#newspaperNav').classyNav();
    }

    // :: 4.0 Gallery Active Code
    if ($.fn.magnificPopup) {
        $('.videoPlayer').magnificPopup({
            type: 'iframe'
        });
    }

    // :: 5.0 ScrollUp Active Code
    if ($.fn.scrollUp) {
        browserWindow.scrollUp({
            scrollSpeed: 1500,
            scrollText: '<i class="fa fa-angle-up"></i>'
        });
    }

    // :: 7.0 Sticky Active Code
    if ($.fn.sticky) {
        $("#stickyMenu").sticky({
            topSpacing: 0
        });
    }

    // :: 8.0 wow Active Code
    if (browserWindow.width() > 767) {
        new WOW().init();
    }

    // :: 9.0 prevent default a click
    $('a[href="#"]').click(function ($) {
        $.preventDefault()
    });

    // :: 10.0 Toggle new search bar
    $("#toggle-search-bar").click(function(event) {
        $(".searchbar").fadeToggle(300);
        $(".searchbar").find("input[type='text']").focus();
        $(this).find("i").toggleClass('fa-close');
        event.stopPropagation();
      });
    $(".searchbar").click(function(event){
        event.stopPropagation();
    })

    // :: 11.0 Slider of Featured Posts
    var initSlider = function(){
        $('.single-slider-post img').css("width",$('.container').width());
        $('#featured-post-slider').owlCarousel({
            center: true,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 750,
            autoplayHoverPause: true,
            loop:true,
            margin:5,
            items: 1,
            autoWidth: true,
            dots: true,
            responsive:{
                0:{
                    dots: false,
                },
                768:{
                    dots: true,
                }
            }
        });
    }

    var initTopCategorySlider = function(){
        $('#top-category-posts-slider').owlCarousel({
            loop:true,
            margin:0,
            center: true,
            dots: false,
            responsive:{
                0:{
                    items:1
                },
                530:{
                    items: 2
                },
                996: {
                    items: 3
                },
                1200:{
                    items:4
                }
            }
        });
    }

    var owl2 = $('#top-category-posts-slider');
    $('#top-cat-slider-button-prev').click(function(){
        owl2.trigger('prev.owl.carousel');
    });

    $('#top-cat-slider-button-next').click(function(){
        owl2.trigger('next.owl.carousel');
    });

})(jQuery);