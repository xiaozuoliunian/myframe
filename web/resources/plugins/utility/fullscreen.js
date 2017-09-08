'use strict';
/**
 * Created by Wang on 2016/6/18.
 */
/*全屏*/
var MainWindowFullscreen = function() {

    var runFullscreen = function() {

        // If browser is IE we need to pass the fullsreen plugin the 'html' selector
        // rather than the 'body' selector. Fixes a fullscreen overflow bug
        var selector = $('html');

        var ua = window.navigator.userAgent;
        var old_ie = ua.indexOf('MSIE ');
        var new_ie = ua.indexOf('Trident/');
        if ((old_ie > -1) || (new_ie > -1)) { selector = $('body'); }

        // Fullscreen Functionality
        var screenCheck = $.fullscreen.isNativelySupported();

        // Attach handler to navbar fullscreen button
        $('.request-fullscreen').on('click', function() {

            // Check for fullscreen browser support
            if (screenCheck) {
                if ($.fullscreen.isFullScreen()) {
                    $.fullscreen.exit();
                }
                else {
                    selector.fullscreen({
                        overflow: 'auto'
                    });
                }
            } else {
                alert('您的浏览器不支持全屏模式，您可以使用Chrome浏览器。')
            }
        });

    }

    return {
        init: function() {

            runFullscreen();
        }
    }
}();