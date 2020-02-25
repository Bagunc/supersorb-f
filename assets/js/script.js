const xlg__screen = 1200,
      lg__screen = 992,
      md__screen = 768,
      sm__screem = 576;

jQuery(function($) {
   
    $(document).ready(function() {
       
        $('#closeHeaderNav').click(toggle__header__menu);
        $('#headerNavbarContent').click(toggle__header__menu);
        $('#headerNavbarToggler').click(toggle__header__menu);
        $('#closeHeaderNav > .navbar-nav').click(stop__parent__e);
        
        
    });
    
    $('#headerNavbarContent').on('touchmove mousewheel', function(e) {
        
        if (is__screen(lg__screen))
            return;
        
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
    
});