$(function() {
	function f(l) {
		var k = 0;
		$(l).each(function() {
			k += $(this).outerWidth(true)
		});
		return k
	}
	function g(n) {
		var o = f($(n).prevAll()),
			q = f($(n).nextAll());
		var l = f($(".content-tabs").children().not(".J_menuTabs"));
		var k = $(".content-tabs").outerWidth(true) - l;
		var p = 0;
		if ($(".page-tabs-content").outerWidth() < k) {
			p = 0
		} else {
			if (q <= (k - $(n).outerWidth(true) - $(n).next().outerWidth(true))) {
				if ((k - $(n).next().outerWidth(true)) > q) {
					p = o;
					var m = n;
					while ((p - $(m).outerWidth()) > ($(".page-tabs-content").outerWidth() - k)) {
						p -= $(m).prev().outerWidth();
						m = $(m).prev()
					}
				}
			} else {
				if (o > (k - $(n).outerWidth(true) - $(n).prev().outerWidth(true))) {
					p = o - $(n).prev().outerWidth(true)
				}
			}
		}
		$(".page-tabs-content").animate({
			marginLeft: 0 - p + "px"
		}, "fast")
	}
	/*tab菜单左侧移动*/
	function leftmove() {
		var o = Math.abs(parseInt($(".page-tabs-content").css("margin-left")));
		var l = f($(".content-tabs").children().not(".J_menuTabs"));
		var k = $(".content-tabs").outerWidth(true) - l;
		var p = 0;
		if ($(".page-tabs-content").width() < k) {
			return false
		} else {
			var m = $(".J_menuTab:first");
			var n = 0;
			while ((n + $(m).outerWidth(true)) <= o) {
				n += $(m).outerWidth(true);
				m = $(m).next()
			}
			n = 0;
			if (f($(m).prevAll()) > k) {
				while ((n + $(m).outerWidth(true)) < (k) && m.length > 0) {
					n += $(m).outerWidth(true);
					m = $(m).prev()
				}
				p = f($(m).prevAll())
			}
		}
		$(".page-tabs-content").animate({
			marginLeft: 0 - p + "px"
		}, "fast")
	}
	/*tab菜单右侧移动*/
	function rightmove() {
		var o = Math.abs(parseInt($(".page-tabs-content").css("margin-left")));
		var l = f($(".content-tabs").children().not(".J_menuTabs"));
		var k = $(".content-tabs").outerWidth(true) - l;
		var p = 0;
		if ($(".page-tabs-content").width() < k) {
			return false
		} else {
			var m = $(".J_menuTab:first");
			var n = 0;
			while ((n + $(m).outerWidth(true)) <= o) {
				n += $(m).outerWidth(true);
				m = $(m).next()
			}
			n = 0;
			while ((n + $(m).outerWidth(true)) < (k) && m.length > 0) {
				n += $(m).outerWidth(true);
				m = $(m).next()
			}
			p = f($(m).prevAll());
			if (p > 0) {
				$(".page-tabs-content").animate({
					marginLeft: 0 - p + "px"
				}, "fast")
			}
		}
	}
	$(".J_menuItem").each(function(k) {
		if (!$(this).attr("data-index")) {
			$(this).attr("data-index", k)
		}
	});
/*单击tab添加iframe*/
	function addtab() {
		var o = $(this).attr("href"),
			m = $(this).data("index"),
			l = $.trim($(this).text()),
			k = true;
		if (o == undefined || $.trim(o).length == 0) {
			return false
		}
		$(".J_menuTab",window.parent.document).each(function() {
			if ($(this).data("id") == o) {
				if (!$(this).hasClass("active")) {
					$(this).addClass("active").siblings(".J_menuTab").removeClass("active");
					g(this);
					$(".J_mainContent .J_iframe",window.parent.document).each(function() {
						if ($(this).data("id") == o) {
							$(this).show().siblings(".J_iframe").hide();
							return false
						}
					})
				}
				k = false;
				return false
			}
		});
		if (k) {
			var p = '<a href="javascript:;" class="active J_menuTab" data-id="' + o + '">' + l + ' <i class="fa fa-times-circle"></i></a>';
			$(".J_menuTab",window.parent.document).removeClass("active");
			var height= ($(window).height() - $("#header").height() - $("#tabsContent").height())+'px';
			var n = '<iframe class="J_iframe embed-responsive" name="iframe' + m + '" width="100%" src="' + o + '" frameborder="0" scrolling="no" data-id="' + o + '" style="height:'+height+'"></iframe>';
			$(".J_mainContent",window.parent.document).find("iframe.J_iframe").hide().parents(".J_mainContent").append(n);
			$(".J_menuTabs .page-tabs-content",window.parent.document).append(p);
			g($(".J_menuTab.active"))
		}
		return false
	}
	//打开一个标签页,第一个参数是链接，第二个参数标题
	openTab = function(href,title){
		var o = href,
		m = $(this).data("index"),
		l = title,
		k = true;
	if (o == undefined || $.trim(o).length == 0) {
		return false
	}
	$(".J_menuTab",window.parent.document).each(function() {
		if ($(this).data("id") == o) {
			if (!$(this).hasClass("active")) {
				$(this).addClass("active").siblings(".J_menuTab").removeClass("active");
				g(this);
				$(".J_mainContent .J_iframe",window.parent.document).each(function() {
					if ($(this).data("id") == o) {
						$(this).show().siblings(".J_iframe").hide();
						return false
					}
				})
			}
			k = false;
			return false
		}
	});
	if (k) {
		var p = '<a href="javascript:;" class="active J_menuTab" data-id="' + o + '">' + l + ' <i class="fa fa-times-circle"></i></a>';
		$(".J_menuTab",window.parent.document).removeClass("active");
		var height= ($(window).height() - $("#header").height() - $("#tabsContent").height())+'px';
		var n = '<iframe class="J_iframe embed-responsive" name="iframe' + m + '" width="100%" src="' + o + '" frameborder="0" scrolling="no" data-id="' + o + '" style="height:'+height+'"></iframe>';
		$(".J_mainContent",window.parent.document).find("iframe.J_iframe").hide().parents(".J_mainContent").append(n);
		$(".J_menuTabs .page-tabs-content",window.parent.document).append(p);
		g($(".J_menuTab.active"))
	}
	return false
	}
	$("body").on("click",".J_menuItem", addtab);
	/*单击tab关闭*/
	function tabclick() {
		var m = $(this).parents(".J_menuTab").data("id");
		var l = $(this).parents(".J_menuTab").width();
		if ($(this).parents(".J_menuTab").hasClass("active")) {
			if ($(this).parents(".J_menuTab").next(".J_menuTab").size()) {
				var k = $(this).parents(".J_menuTab").next(".J_menuTab:eq(0)").data("id");
				$(this).parents(".J_menuTab").next(".J_menuTab:eq(0)").addClass("active");
				$(".J_mainContent .J_iframe").each(function() {
					if ($(this).data("id") == k) {
						$(this).show().siblings(".J_iframe").hide();
						return false
					}
				});
				var n = parseInt($(".page-tabs-content").css("margin-left"));
				if (n < 0) {
					$(".page-tabs-content").animate({
						marginLeft: (n + l) + "px"
					}, "fast")
				}
				$(this).parents(".J_menuTab").remove();
				$(".J_mainContent .J_iframe").each(function() {
					if ($(this).data("id") == m) {
						$(this).remove();
						return false
					}
				})
			}
			if ($(this).parents(".J_menuTab").prev(".J_menuTab").size()) {
				var k = $(this).parents(".J_menuTab").prev(".J_menuTab:last").data("id");
				$(this).parents(".J_menuTab").prev(".J_menuTab:last").addClass("active");
				$(".J_mainContent .J_iframe").each(function() {
					if ($(this).data("id") == k) {
						$(this).show().siblings(".J_iframe").hide();
						return false
					}
				});
				$(this).parents(".J_menuTab").remove();
				$(".J_mainContent .J_iframe").each(function() {
					if ($(this).data("id") == m) {
						$(this).remove();
						return false
					}
				})
			}
		} else {
			$(this).parents(".J_menuTab").remove();
			$(".J_mainContent .J_iframe").each(function() {
				if ($(this).data("id") == m) {
					$(this).remove();
					return false
				}
			});
			g($(".J_menuTab.active"))
		}
		return false
	}
	/*单击tab关闭*/
	$(".J_menuTabs").on("click", ".J_menuTab i", tabclick);
	/*关闭其他选项*/
	function closeother() {
		$(".page-tabs-content").children("[data-id]").not(":first").not(".active").each(function() {
			$('.J_iframe[data-id="' + $(this).data("id") + '"]').remove();
			$(this).remove()
		});
		$(".page-tabs-content").css("margin-left", "0")
	}
	$(".J_tabCloseOther").on("click", closeother);

	/*function ji() {
		g($(".J_menuTab.active"))
	}*/
	/*定位当前选项卡*/
	/*$(".J_tabShowActive").on("click", ji);*/
	/*头部打开的tab切换*/
	function tabchange() {
		if (!$(this).hasClass("active")) {
			var k = $(this).data("id");
			$(".J_mainContent .J_iframe",window.parent.document).each(function() {
				if ($(this).data("id") == k) {
					$(this).show().siblings(".J_iframe").hide();
					return false
				}
			});
			$(this).addClass("active").siblings(".J_menuTab").removeClass("active");
			g(this)
		}
	}
	$(".J_menuTabs",window.parent.document).on("click", ".J_menuTab", tabchange);

	function di() {
		var l = $('.J_iframe[data-id="' + $(this).data("id") + '"]');
		var k = l.attr("src")
	}
	$(".J_menuTabs").on("dblclick", ".J_menuTab", di);
	$(".J_tabLeft").on("click", leftmove);
	$(".J_tabRight").on("click", rightmove);
	/*关闭所有选项卡*/
	$(".J_tabCloseAll").on("click", function() {
		$(".page-tabs-content").children("[data-id]").not(":first").each(function() {
			$('.J_iframe[data-id="' + $(this).data("id") + '"]').remove();
			$(this).remove()
		});
		$(".page-tabs-content").children("[data-id]:first").each(function() {
			$('.J_iframe[data-id="' + $(this).data("id") + '"]').show();
			$(this).addClass("active")
		});
		$(".page-tabs-content").css("margin-left", "0")
	})
});