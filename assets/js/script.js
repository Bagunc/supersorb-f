'use strict';

let   xlg__screen = 1200,
      lg__screen = 992,
      md__screen = 768,
      sm__screem = 576;

jQuery(function($) {
   
    $(document).ready(function() {
       
        $('#closeHeaderNav').click(toggle__header__menu);
        $('#headerNavbarContent').click(toggle__header__menu);
        $('#headerNavbarToggler').click(toggle__header__menu);
        $('#closeHeaderNav > .navbar-nav').click(stop__parent__e);
        
        init__top__slider();
        init__screen__scroll__controls();
        init__reviews__slider();
        init__tutorial__sliders();
        init__youtube__players();
        init__counters();
        init__cart__items__choose();
        
    });
    
    $('#headerNavbarContent').on('touchmove mousewheel', function(e) {
        
        if (is__screen(lg__screen)) return;
        
        if ($(e.target).attr('id') === 'headerNavbarContent')
            prevent__default__e(e);
    });
        
   
    function close__header__menu(e) {
        prevent__default__e(e);
            
        $('#headerNavbarContent').removeClass('show');
    }
    
    function stop__parent__e(e) {
        e.stopPropagation();
    }

    function prevent__default__e(e) {
        e.preventDefault();
    }

    function is__screen(screen) {

        return jQuery(window).width() >= screen; 
    }
    
    function toggle__header__menu(e) {
        if (is__screen(lg__screen)) return;
        
        prevent__default__e(e);
        
        if ($('#headerNavbarContent').hasClass('show')) {
            $('#headerNavbarContent').removeClass('animate');
            setTimeout(function() {
                $('#headerNavbarContent').removeClass('show');
            }, 100)
        } else {
            $('#headerNavbarContent').addClass('show');
            setTimeout(function() {
                $('#headerNavbarContent').addClass('animate');
            }, 100)
        }
    }
    
    function init__top__slider() {
        
        if (!$('#top-slider').length) return;
        
        let config = {
            infinite: false,
            dots: true,
            dotsClass: 'slick__dots',
            prevArrow: '<a href="#" class="slick__arrow slick__arrow--prev"><svg><use xlink:href="#icon-prev"></use></svg></a>',
            nextArrow: '<a href="#" class="slick__arrow slick__arrow--next"><svg><use xlink:href="#icon-next"></use></svg></a>'
        };
        
        $('#top-slider').slick(config);
        
    }
    
    function init__screen__scroll__controls() {
        
        let sections = $('#main > section'),
            control = $('#screensControl'),
            current = 0;
        
        for (let i = 0; i < sections.length; i++) {
            
            let section = $(sections[i]);
            
            if ($(window).scrollTop() > section.offset().top)
                current = i;
            
            control.append('<a href="#"></a>');    
        }
        
        let hasScrollDost = $('#screensControl > a').length;
        
        if (hasScrollDost) {
            setTimeout(function() {
                let currentA =  $('#screensControl > a').get(current);
                if ($(currentA).length)
                    $(currentA).addClass('current');
            }, 100);
            
            $(window).scroll(function() {
                if (!is__screen(lg__screen)) return;
                
                let current = 0;
                for (let i = 0; i < sections.length; i++)
                    if ($(window).scrollTop() > $(sections[i]).offset().top)
                        current = i;
                
                $('#screensControl > a').removeClass('current');
                $($('#screensControl > a').get(current)).addClass('current');
            });
        }
        
        $('#screensControl > a').click(function(e) {
            prevent__default__e(e);

            let index = $(this).index(),
                section = $('#main > section').get(index),
                top = $(section).offset().top;

            $('html, body').animate({
                scrollTop: top + 1
            }, 500);

        });         
        
    }
    
    function init__reviews__slider() {
        
        if (!$('#reviewsSlider').length) return;
        
        let config = {
            infinite: false,
            dots: true,
            dotsClass: 'slick__dots',
            prevArrow: '<a href="#" class="slick__arrow slick__arrow--prev"><svg><use xlink:href="#icon-prev"></use></svg></a>',
            nextArrow: '<a href="#" class="slick__arrow slick__arrow--next"><svg><use xlink:href="#icon-next"></use></svg></a>'
        };
        
        if (is__screen(lg__screen) || !$('#reviewsSlider').hasClass('reviews__slider--unslick'))
            $('#reviewsSlider').slick(config);
        
        $(window).resize(function() {
            if ($('#reviewsSlider').hasClass('reviews__slider--unslick')) {
                if (is__screen(lg__screen))
                    $('#reviewsSlider').slick(config);
                else
                    $('#reviewsSlider').slick('unslick');
            }
        });
    }
    
    function init__tutorial__sliders() {
        
        $(".tutorial__slider").carousel().on("slide.bs.carousel", function (e) {
            var n = $(e.target).find(".carousel-item").length;
            var active = e.relatedTarget;
            
            if(active===undefined)
                active = $(e.target).find(".carousel-item.active");
            else
                active = $(e.relatedTarget);
            
            $(e.target).find(".carousel-item.next").removeClass("next");
            var next = $(e.target).find(".carousel-item").eq(active.index()-n+1);
            next.addClass("next");
            
            $(e.target).find(".carousel-item.prev").removeClass("prev");
            var prev = $(e.target).find(".carousel-item").eq(active.index()-1);
            prev.addClass("prev");
            
        }).trigger("slide.bs.carousel");
        
    }
    
    function init__youtube__players() {
        
        let players = $('.youtube__player[data-video]');
        
        $.each(players, function(index, player) {
            init__youtube__player($(player))
        });
        
    }
    
    function init__youtube__player(player) {

        if (!player.length) return;

        let id = unique__id('youtube'),
            videoId = player.data('video'),
            container = $('<div id="' + id + '"></div>'),
            play = $('<a href="#" class="play"><svg><use xlink:href="#icon-play"></use></svg></a>');
        
        player.append(container);
        player.append(play);
        
        $(play).click(function(e) {
            prevent__default__e(e);
            
            let youtube__player = new YT.Player(id, {
              videoId: videoId,
              playerVars: { 'autoplay': 1, 'controls': 0 },
              width: player.width(),
              height: player.height(),
              events: {
                onReady: function(event) {
                    event.target.setVolume(100);
                    event.target.playVideo();
                },
                onStateChange: function(event) {
                    console.log(youtube__player)
                    if ([YT.PlayerState.ENDED, YT.PlayerState.UNSTARTED].includes(event.data)) {
                        $(youtube__player.a).remove();
                        player.prepend(youtube__player.i);
                    }
                }
              }
            });
        });
        
    }
    
    function init__cart__items__choose() {
        $('.section--cart .product .col__size input').change(function() {
            
            let parent = $(this).parents('.row__size'),
                checked = $(this).prop('checked');
            
            let counter = {};
            if ($(parent).find('.counter > input').length)
                counter = $(parent).find('.counter > input')[0];
            
            $(parent)[checked ? 'addClass' : 'removeClass']('row--active');
            
            if ('setCounterValue' in counter)
                counter.setCounterValue(checked && !counter.getValue() ? 1 : 0);
        });
    }
    
    function counterFilter(value) {
        
        return value < 10 ? `0${value}` : value;
    }
    
    function counterUpdate(config) {
        
        if (!config) return;
        
        const { 
            node,
            price,
            value
        } = config;
        
        const parent = node.closest('.row');
        parent.classList[value > 0 ? 'add' : 'remove']('row--active');
        
        const checkbox = parent.querySelector('.checkbox--virtual [type="checkbox"]');
        checkbox.checked = value > 0;
        
        const priceNode = parent.querySelector('.col__price > span');
        priceNode.innerHTML = `${((value || 1) * price)} <span class="rouble">i</span>`;
    }
    
    function init__counters() {
        
        if (!window.InputCounter) return;
        
        let counters = document.querySelectorAll('.section--cart .product__counter');
        
        if (counters.length) {
           counters.forEach(function(counter) {
                let config = {};
                if (counter.dataset.config)
                    config = JSON.parse(counter.dataset.config);
                
                
                config.decrement = document.createElement('a');
                config.decrement.classList.add('btn', 'btn-dark', 'btn--decrement');
               
                config.increment = document.createElement('a');
                config.increment.classList.add('btn', 'btn-dark', 'btn--increment');
                
                config.onupdate = counterUpdate;
                config.filter = counterFilter;
                new InputCounter(counter, config);
            });
        }

    }
    
    function unique__id(key) {
        
        key = key ? key + '_' : '';
        
        return key + Math.random().toString(36).substr(2, 9);
    }
    
});