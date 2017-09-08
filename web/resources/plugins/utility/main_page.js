'use strict';

/*初始化主页面 */
var MainPage = function(options) {

    // Variables
    var Window = $(window);
    var Body = $('body');
    var Navbar = $('.navbar');
    var Topbar = $('#topbar');

    // Constant Heights
    var windowH = Window.height();
    var bodyH = Body.height();
    var navbarH = 0;
    var topbarH = 0;

    // Variable Heights
    if (Navbar.is(':visible')) { navbarH = Navbar.height(); }
    if (Topbar.is(':visible')) { topbarH = Topbar.height(); }

    // Calculate Height for inner content elements
    var contentHeight = windowH - (navbarH + topbarH);

    // SideMenu Functions
    var runSideMenu = function(options) {

        // If Nano scrollbar exist and element is fixed, init plugin
        if ($('.nano.affix').length) {
            $(".nano.affix").nanoScroller({
                preventPageScrolling: true
            });
        }

        // Sidebar state naming conventions:
        // "sb-l-o" - SideBar Left Open
        // "sb-l-c" - SideBar Left Closed
        // "sb-l-m" - SideBar Left Minified
        // Same naming convention applies to right sidebar

        // SideBar Left Toggle Function
        var sidebarLeftToggle = function() {

            // If sidebar is set to Horizontal we return
            if ($('body.sb-top').length) { return; }

            // We check to see if the the user has closed the entire
            // leftside menu. If true we reopen it, this will result
            // in the menu resetting itself back to a minified state.
            // A second click will fully expand the menu.
            if (Body.hasClass('sb-l-c') && options.collapse === "sb-l-m") {
                Body.removeClass('sb-l-c');
            }

            // Toggle sidebar state(open/close)
            Body.toggleClass(options.collapse).removeClass('sb-r-o').addClass('sb-r-c');
            triggerResize();
        };

        // SideBar Right Toggle Function
        var sidebarRightToggle = function() {

            // If sidebar is set to Horizontal we return
            if ($('body.sb-top').length) { return; }

            // toggle sidebar state(open/close)
            if (options.siblingRope === true && !Body.hasClass('mobile-view') && Body.hasClass('sb-r-o')) {
                Body.toggleClass('sb-r-o sb-r-c').toggleClass(options.collapse);
            }
            else {
                Body.toggleClass('sb-r-o sb-r-c').addClass(options.collapse);
            }
            triggerResize();
        };

        // SideBar Left Toggle Function
        var sidebarTopToggle = function() {

            // Toggle sidebar state(open/close)
            Body.toggleClass('sb-top-collapsed');

        };

        // Sidebar Left Collapse Entire Menu event
        $('.sidebar-toggle-mini').on('click', function(e) {
            e.preventDefault();

            // If sidebar is set to Horizontal we return
            if ($('body.sb-top').length) { return; }

            // Close Menu
            Body.addClass('sb-l-c');
            triggerResize();

            // After animation has occured we toggle the menu.
            // Upon the menu reopening the classes will be toggled
            // again, effectively restoring the menus state prior
            // to being hidden
            if (!Body.hasClass('mobile-view')) {
                setTimeout(function() {
                    Body.toggleClass('sb-l-m sb-l-o');
                }, 250);
            }
        });

        // Check window size on load
        // Adds or removes "mobile-view" class based on window size
        var sbOnLoadCheck = function() {

            // If sidebar menu is set to Horizontal we add
            // unique custom mobile css classes
            if ($('body.sb-top').length) {
                // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
                if ($(window).width() < 900) {
                    Body.addClass('sb-top-mobile').removeClass('sb-top-collapsed');
                }
                return;
            }

            // Check Body for classes indicating the state of Left and Right Sidebar.
            // If not found add default sidebar settings(sidebar left open, sidebar right closed).
            if (!$('body.sb-l-o').length && !$('body.sb-l-m').length && !$('body.sb-l-c').length) {
                $('body').addClass(options.sbl);
            }
            if (!$('body.sb-r-o').length && !$('body.sb-r-c').length) {
                $('body').addClass(options.sbr);
            }

            if (Body.hasClass('sb-l-m')) { Body.addClass('sb-l-disable-animation'); }
            else { Body.removeClass('sb-l-disable-animation'); }

            // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
            if ($(window).width() < 1080) {
                Body.removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c');
            }

            resizeBody();
        };


        // Check window size on resize
        // Adds or removes "mobile-view" class based on window size
        var sbOnResize = function() {

            // If sidebar menu is set to Horizontal mode we return
            // as the menu operates using pure CSS
            if ($('body.sb-top').length) {
                // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
                if ($(window).width() < 900 && !Body.hasClass('sb-top-mobile')) {
                    Body.addClass('sb-top-mobile');
                } else if ($(window).width() > 900) {
                    Body.removeClass('sb-top-mobile');
                }
                return;
            }

            // If window is < 1080px wide collapse both sidebars and add ".mobile-view" class
            if ($(window).width() < 1080 && !Body.hasClass('mobile-view')) {
                Body.removeClass('sb-r-o').addClass('mobile-view sb-l-m sb-r-c');
            } else if ($(window).width() > 1080) {
                Body.removeClass('mobile-view');
            } else {
                return;
            }

            resizeBody();
        };

        // Function to set the min-height of content
        // to that of the body height. Ensures trays
        // and content bgs span to the bottom of the page
        var resizeBody = function() {

            var sidebarH = $('#sidebar_left').outerHeight();
            var cHeight = (topbarH + sidebarH);//var cHeight = (topbarH + navbarH + sidebarH);

            Body.css('min-height', cHeight);
        };

        // Most CSS menu animations are set to 300ms. After this time
        // we trigger a single global window resize to help catch any 3rd
        // party plugins which need the event to resize their given elements
        var triggerResize = function() {
            setTimeout(function() {
                $(window).trigger('resize');

                if(Body.hasClass('sb-l-m')) {
                    Body.addClass('sb-l-disable-animation');
                }
                else {
                    Body.removeClass('sb-l-disable-animation');
                }
            }, 300)
        };

        // Functions Calls
        sbOnLoadCheck();
        $("#toggle_sidemenu_t").on('click', sidebarTopToggle);
        $("#toggle_sidemenu_l").on('click', sidebarLeftToggle);
        $("#toggle_sidemenu_r").on('click', sidebarRightToggle);

        // Attach debounced resize handler
        var rescale = function() {
            sbOnResize();
        }
       /* var lazyLayout = _.debounce(rescale, 300);*/
       /* $(window).resize(lazyLayout);*/

        //
        // 2. LEFT USER MENU TOGGLE
        //

        // Author Widget selector
        var authorWidget = $('#sidebar_left .author-widget');

        // Toggle open the user menu
        $('.sidebar-menu-toggle').on('click', function(e) {
            e.preventDefault();

            // Horizontal menu does not support sidebar widgets
            // so we return and prevent the menu from opening
            if ($('body.sb-top').length) { return; }

            // If an author widget is present we let
            // its sibling menu know it's open
            if (authorWidget.is(':visible')) { authorWidget.toggleClass('menu-widget-open'); }

            // Toggle Class to signal state change
            $('.menu-widget').toggleClass('menu-widget-open').slideToggle('fast');

        });

        // 3. LEFT MENU LINKS TOGGLE
        $('.sidebar-menu li a.accordion-toggle').on('click', function(e) {
            e.preventDefault();

            // If the clicked menu item is minified and is a submenu (has sub-nav parent) we do nothing
            if ($('body').hasClass('sb-l-m') && !$(this).parents('ul.sub-nav').length) { return; }

            // If the clicked menu item is a dropdown we open its menu
            if (!$(this).parents('ul.sub-nav').length) {

                // If sidebar menu is set to Horizontal mode we return
                // as the menu operates using pure CSS
                if ($(window).width() > 900) {
                    if ($('body.sb-top').length) { return; }
                }

                $('a.accordion-toggle.menu-open').next('ul').slideUp('fast', 'swing', function() {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
            }
            // If the clicked menu item is a dropdown inside of a dropdown (sublevel menu)
            // we only close menu items which are not a child of the uppermost top level menu
            else {
                var activeMenu = $(this).next('ul.sub-nav');
                var siblingMenu = $(this).parent().siblings('li').children('a.accordion-toggle.menu-open').next('ul.sub-nav')

                activeMenu.slideUp('fast', 'swing', function() {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
                siblingMenu.slideUp('fast', 'swing', function() {
                    $(this).attr('style', '').prev().removeClass('menu-open');
                });
            }

            // Now we expand targeted menu item, add the ".open-menu" class
            // and remove any left over inline jQuery animation styles
            if (!$(this).hasClass('menu-open')) {
                $(this).next('ul').slideToggle('fast', 'swing', function() {
                    $(this).attr('style', '').prev().toggleClass('menu-open');
                });
            }

        });
    }

    return {
        init: function(options) {

            // Set Default Options
            var defaults = {
                sbl: "sb-l-o", // sidebar left open onload
                sbr: "sb-r-c", // sidebar right closed onload
                sbState: "save", //Enable localstorage for sidebar states

                collapse: "sb-l-m", // sidebar left collapse style
                siblingRope: true
                // Setting this true will reopen the left sidebar
                // when the right sidebar is closed
            };

            // Extend Default Options.
            var options = $.extend({}, defaults, options);

            runSideMenu(options);

        }

    }
}();

