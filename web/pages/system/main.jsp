<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../common/taglib.jsp"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="zh">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>后台管理系统</title>

		<meta name="description" content="overview &amp; stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

		<!-- bootstrap & fontawesome & ace styles-->
		<link rel="stylesheet" href="${ctx }/resources/plugins/ace/assets/css/bootstrap.css" />
		<link rel="stylesheet" href="${ctx }/resources/plugins/ace/assets/font-awesome/css/font-awesome.css" />
		<link rel="stylesheet" href="${ctx }/resources/plugins/ace/assets/css/ace.css"  />
		<link rel="stylesheet" href="${ctx }/resources/plugins/ace/assets/css/ace-fonts.css" />
		<link rel="stylesheet" href="${ctx }/resources/plugins/contabs/contabs.css" />
	</head>

	<body class="no-skin">
		
		<!-- 首页头部开始 -->
		<div id="navbar" class="navbar navbar-default ace-save-state">
			<div class="navbar-container ace-save-state" id="navbar-container">
				<!-- #section:basics/sidebar.mobile.toggle -->
				<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler" data-target="#sidebar">
					<span class="sr-only">Toggle sidebar</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<div class="navbar-header pull-left">
					<!-- #section:basics/navbar.layout.brand -->
					<a href="#" class="navbar-brand">
						<small>
							<i class="fa fa-leaf"></i>
							信息应用管理系统
						</small>
					</a>	
				</div>
				
				<!-- <div class="navbar-buttons navbar-header pull-center" role="navigation">
					<ul class="nav-contabs ace-nav-contabs">
						<li>
							<div class="navbar-btn-contabs btn-group ">
								<a href="#" class="btn btn-sm">
									<span class="fa fa-users"></span>
									用户管理
								</a>
							</div>
						</li>
						<li>
							<div class="navbar-btn-contabs btn-group ">
								<a href="#" class="btn btn-sm">
									<span class="fa fa-gears"></span>
									系统管理
								</a>
							</div>
						</li>
						<li>
							<div class="navbar-btn-contabs btn-group ">
								<a href="#" class="btn btn-sm" onclick="javascript:switchModule('sjjk');">
									<span class="fa fa-database"></span>
									数据监控
								</a>
							</div>
						</li>
					</ul>
				</div> -->
				
				<!-- 头部功能菜单开始 -->
				<div class="navbar-buttons navbar-header pull-right" role="navigation">
					<ul class="nav ace-nav">
						<li class="purple dropdown-modal">
							<a data-toggle="dropdown" class="dropdown-toggle" href="#">
								<i class="ace-icon fa fa-bell icon-animated-bell"></i>
								<span class="badge badge-important">8</span>
							</a>
							<ul class="dropdown-menu-right dropdown-navbar navbar-pink dropdown-menu dropdown-caret dropdown-close">
								<li class="dropdown-header">
									<i class="ace-icon fa fa-exclamation-triangle"></i>
									8 Notifications
								</li>

								<li class="dropdown-content">
									<ul class="dropdown-menu dropdown-navbar navbar-pink">
										<li>
											<a href="#">
												<div class="clearfix">
													<span class="pull-left">
														<i class="btn btn-xs no-hover btn-pink fa fa-comment"></i>
														New Comments
													</span>
													<span class="pull-right badge badge-info">+12</span>
												</div>
											</a>
										</li>

										<li>
											<a href="#">
												<i class="btn btn-xs btn-primary fa fa-user"></i>
												Bob just signed up as an editor ...
											</a>
										</li>

										<li>
											<a href="#">
												<div class="clearfix">
													<span class="pull-left">
														<i class="btn btn-xs no-hover btn-success fa fa-shopping-cart"></i>
														New Orders
													</span>
													<span class="pull-right badge badge-success">+8</span>
												</div>
											</a>
										</li>

										<li>
											<a href="#">
												<div class="clearfix">
													<span class="pull-left">
														<i class="btn btn-xs no-hover btn-info fa fa-twitter"></i>
														Followers
													</span>
													<span class="pull-right badge badge-info">+11</span>
												</div>
											</a>
										</li>
									</ul>
								</li>

								<li class="dropdown-footer">
									<a href="#">
										See all notifications
										<i class="ace-icon fa fa-arrow-right"></i>
									</a>
								</li>
							</ul>
						</li>
						<li class="green dropdown-modal">
							<a data-toggle="dropdown" class="dropdown-toggle" href="#">
								<i class="ace-icon fa fa-envelope icon-animated-vertical"></i>
								<span class="badge badge-success">5</span>
							</a>

							<ul class="dropdown-menu-right dropdown-navbar dropdown-menu dropdown-caret dropdown-close">
								<li class="dropdown-header">
									<i class="ace-icon fa fa-envelope-o"></i>
									5 Messages
								</li>

								<li class="dropdown-content">
									<ul class="dropdown-menu dropdown-navbar">
										<li>
											<a href="#" class="clearfix">
												<img src="../assets/avatars/avatar.png" class="msg-photo" alt="Alex's Avatar" />
												<span class="msg-body">
													<span class="msg-title">
														<span class="blue">Alex:</span>
														Ciao sociis natoque penatibus et auctor ...
													</span>

													<span class="msg-time">
														<i class="ace-icon fa fa-clock-o"></i>
														<span>a moment ago</span>
													</span>
												</span>
											</a>
										</li>

										<li>
											<a href="#" class="clearfix">
												<img src="../assets/avatars/avatar3.png" class="msg-photo" alt="Susan's Avatar" />
												<span class="msg-body">
													<span class="msg-title">
														<span class="blue">Susan:</span>
														Vestibulum id ligula porta felis euismod ...
													</span>

													<span class="msg-time">
														<i class="ace-icon fa fa-clock-o"></i>
														<span>20 minutes ago</span>
													</span>
												</span>
											</a>
										</li>

										<li>
											<a href="#" class="clearfix">
												<img src="../assets/avatars/avatar4.png" class="msg-photo" alt="Bob's Avatar" />
												<span class="msg-body">
													<span class="msg-title">
														<span class="blue">Bob:</span>
														Nullam quis risus eget urna mollis ornare ...
													</span>

													<span class="msg-time">
														<i class="ace-icon fa fa-clock-o"></i>
														<span>3:15 pm</span>
													</span>
												</span>
											</a>
										</li>

										<li>
											<a href="#" class="clearfix">
												<img src="../assets/avatars/avatar2.png" class="msg-photo" alt="Kate's Avatar" />
												<span class="msg-body">
													<span class="msg-title">
														<span class="blue">Kate:</span>
														Ciao sociis natoque eget urna mollis ornare ...
													</span>

													<span class="msg-time">
														<i class="ace-icon fa fa-clock-o"></i>
														<span>1:33 pm</span>
													</span>
												</span>
											</a>
										</li>

										<li>
											<a href="#" class="clearfix">
												<img src="../assets/avatars/avatar5.png" class="msg-photo" alt="Fred's Avatar" />
												<span class="msg-body">
													<span class="msg-title">
														<span class="blue">Fred:</span>
														Vestibulum id penatibus et auctor  ...
													</span>

													<span class="msg-time">
														<i class="ace-icon fa fa-clock-o"></i>
														<span>10:09 am</span>
													</span>
												</span>
											</a>
										</li>
									</ul>
								</li>

							
							</ul>
						</li>
						<li class="light-blue dropdown-modal">
							<a data-toggle="dropdown" href="#" class="dropdown-toggle">
								<img class="nav-user-photo" src="${ctx}/resources/plugins/ace/assets/avatars/user.jpg">
								<span class="user-info">
									<small>欢迎您，管理员</small>
								</span>
								<i class="ace-icon fa fa-caret-down"></i>
							</a>
							<ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
								<li>
									<a href="#">
										<i class="ace-icon fa fa-cog"></i>
										设置
									</a>
								</li>
								<li>
									<a href="profile.html">
										<i class="ace-icon fa fa-user"></i>
										个人中心
									</a>
								</li>
								<li class="divider"></li>

								<li>
									<a href="#">
										<i class="ace-icon fa fa-power-off"></i>
										退出
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<!-- 头部功能菜单结束-->
			</div>
		</div>
		<!-- 首页头部结束 -->
		
		<!-- 首页下半部分开始 -->
		<div class="main-container ace-save-state" id="main-container">

			<div id="sidebar" class="sidebar responsive ace-save-state">

				<!-- 菜单导航栏工具栏开始 -->
				<div class="sidebar-shortcuts" id="sidebar-shortcuts">
					<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
						<button class="btn btn-success">
							<i class="ace-icon fa fa-signal"></i>
						</button>

						<button class="btn btn-info">
							<i class="ace-icon fa fa-pencil"></i>
						</button>

						<!-- #section:basics/sidebar.layout.shortcuts -->
						<button class="btn btn-warning">
							<i class="ace-icon fa fa-users"></i>
						</button>

						<button class="btn btn-danger">
							<i class="ace-icon fa fa-cogs"></i>
						</button>
					</div>
				</div>
				<!-- 菜单导航栏工具栏结束 -->
				<!-- 菜单导航栏开始 -->
				<ul class="nav nav-list" id="menuItem">
					<li class="active">
						<a data-url="page/index" class="J_menuItem" href="#">
							<i class="menu-icon fa fa-home"></i>
							<span class="menu-text">首页</span>
						</a>
						<b class="arrow"></b>
					</li>
					<c:forEach items="${menuList}" var="menu">
					<li class="">
						<a class="J_menuItem" href="${menu.menuUrl}">
							<i class="${menu.menuIcon}"></i>
							<span class="menu-text">${menu.menuTitle}</span>
						</a>
						<b class="arrow"></b>
					</li>
					</c:forEach>
				</ul>
				<!-- 菜单导航栏结束 -->
				
				<!-- 菜单工具开始 -->
				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
					<i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>
				<!-- 菜单工具结束 -->
			</div>
			

			<!-- 主要内容显示区开始 -->
			<div class="main-content">
				<div class="main-content-inner" id="main-content-inner">
					<!-- 标签页开始 -->
					<div class="breadcrumbs ace-save-state" id="breadcrumbs">
						<!-- <ul class="breadcrumb">
							<li>
								<i class="ace-icon fa fa-home home-icon"></i>
								<a href="#">首页</a>
							</li>
							<li class="active">用户管理</li>
						</ul> -->
						<div class="contabs content-tabs">
                			<button class="roll-nav roll-left J_tabLeft"><i class="fa fa-backward"></i></button>
                			<nav class="page-tabs J_menuTabs">
                    			<div class="page-tabs-content">
                        			<a href="javascript:;" class="active J_menuTab" data-id="index_v1.html">首页</a>
                    			</div>
                			</nav>
               				<button class="roll-nav roll-right J_tabRight"><i class="fa fa-forward"></i></button>
                			<div class="btn-group roll-nav roll-right">
                    			<button class="dropdown J_tabClose" data-toggle="dropdown">关闭操作<span class="caret"></span></button>
                    				<ul role="menu" class="dropdown-menu dropdown-menu-right">
                       					<li class="J_tabShowActive"><a>定位当前选项卡</a></li>
                        				<li class="divider"></li>
                        				<li class="J_tabCloseAll"><a>关闭全部选项卡</a></li>
                        				<li class="J_tabCloseOther"><a>关闭其他选项卡</a></li>
                    				</ul>
               				</div>
            			</div>
					</div>
					<!-- 标签页结束 -->
					
					<!-- 网站内容主要显示区开始 -->
					<div class="J_mainContent">
                		<iframe class="J_iframe" id="J_iframe" scrolling="no" name="iframe0" frameborder="0" seamless></iframe>
					</div>
					<!-- 网站内容主要显示区结束 -->
				</div>
			</div>				
			<!-- 主要内容显示区结束 -->		
										
			<!-- 首页底部开始 -->
			<div class="footer">
				<div class="footer-inner">
					<div class="footer-content">
						<span class="bigger-60">
							版权所有  违者必究 &copy; 2013-2017
						</span>
					</div>
				</div>
			</div>

			<a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
				<i class="ace-icon fa fa-angle-double-up icon-only bigger-110"></i>
			</a>
			<!-- 首页底部结束 -->
			
		</div>
		<!-- 首页下半部分结束 -->

		<!-- basic scripts -->
		<script src="${ctx }/resources/plugins/jquery/jquery-2.2.4.min.js"></script>
		<script src="${ctx }/resources/plugins/bootstrap/js/bootstrap.min.js"></script>
		<script src="${ctx }/resources/plugins/contabs/contabs.min.js"></script>
		<!-- ace scripts -->
		<script src="${ctx }/resources/plugins/ace/assets/js/src/ace.js"></script>
		<script src="${ctx }/resources/plugins/ace/assets/js/src/ace.sidebar.js"></script>
		<script src="${ctx }/resources/plugins/ace/assets/js/ace-extra.js"></script>


		<script type="text/javascript">
		//调整页面高度
		/*$(function() {
            init();

            $.ajax({
                type: 'GET',
                url: '/getMenuList',
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        var _menu = '';
                        $.each(data, function (commentIndex, comment) {
                            _menu += '<li class=""><a class="J_menuItem" href="' + comment['menuUrl']
                                + '"><i class="menu-icon ' + comment['menuIcon']
                                + '"></i><span class="menu-text">' + comment['menuTitle']
                                + '</span></a><b class="arrow"></b>';
                        });
                        $('#menuItem').html(_menu);
                    }
                }
            });

        });*/

		function init(){
			var _height_container=$("body").height() - 100;
			var _height_content=$("body").height() - 235;
			$('#main-container').css('height',_height_container+'px');
			$('#J_iframe').css('height',_height_content+'px');
		}


		</script>

	</body>
</html>
