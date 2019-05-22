(function ($) {
    'use strict';

    var browserWindow = $(window);
    browserWindow.on('load', function () {
        initSlider();
        initTopCategorySlider();
    });
    
    browserWindow.on('resize',function(){
        initSlider();
    });

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