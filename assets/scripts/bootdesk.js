jQuery(function() {
    let windowWidth = jQuery(window).width();
    // Load top menu
    jQuery('#top_menu').load('./templates/top_menu.html', function() {
        // Fetch BootDesk config
        jQuery.getJSON('./configs/bootdesk.json', function(BD) {
            jQuery('title').text(BD.app.brand_name +' v'+ BD.app.brand_version);
            jQuery('#app_icon').attr('href', BD.app.brand_icon_path);
            
            var topMenuIcon = jQuery('#top_menu').find('.navbar-brand img');
            jQuery(topMenuIcon).attr('src', BD.app.brand_icon_path);
            var topMenuWindowTitle = jQuery('#top_menu').find('.windowTitle info');
            var topMenuBrand = jQuery('#top_menu').find('.windowTitle span');
            var winBrandDiv = ( jQuery(topMenuWindowTitle).text() !== '' ) ? ' | ' : '';
            jQuery(topMenuBrand).html(winBrandDiv + BD.app.brand_name +' v'+ BD.app.brand_version);
        });
        
        // Realign top menu right dropdown
        var topMenuRightItems = jQuery('#top_menu').find('.navbar-nav.dropstart.ms-auto > li');
        jQuery.each(topMenuRightItems, function(key, val) {
            var menuName = jQuery(val).find('a.nav-link').html();
            var menuTitle = jQuery(val).find('a.nav-link').attr('title');
            var menuWidth = jQuery(val).find('a.nav-link').outerWidth();
            jQuery(val).find('.dropdown-menu').css('margin-right', menuWidth * -1);

            // Add menu title for mobile version if it's only use icon
            if (windowWidth < 768 && jQuery(menuName +":contains('class')") && menuTitle !== '' ) {
                jQuery(val).find('a.nav-link').append(' '+ menuTitle);
            }
        });
    });
});