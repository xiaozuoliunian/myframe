'use strict';
/*! page_height.js - v0.1

/* 计算子页面的容器高度 */
var PageHeight = function() {
    var debug = false;

    var runPageHeight = function() {
        // Variables
        var Window = $(window);
        var Body = $('body');
        var Header = $('#header');
        var Tabs = $("#tabsContent");

        var windowH = Window.height();
        var bodyH = Body.height();
        var headerH = Header.height();
        var tabsH =  Tabs.height();

        var contentHeight = windowH - headerH - tabsH;
        if ($('#content').length) {
            $("#content").css("height",contentHeight);
            $(".embed-responsive").css("height",contentHeight);
        }
       /* if (debug) {
            $("#logStr").text('iframe height: '+ $('#embediFrame').outerHeight() + 'px; window height: ' + $(window).height() );
        }*/

    }
    return {
        init: function() {

            runPageHeight();

        }
    }
}();