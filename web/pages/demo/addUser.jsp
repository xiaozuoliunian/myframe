<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../common/taglib.jsp"%>
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    <title>Bootstrap Table</title>
    <meta name="keywords" content="">
    <meta name="description" content="">

    <!-- 基本样式文件 -->
    <link rel="stylesheet" type="text/css" href="/resources/css/theme/default/theme.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/fonts/icomoon/icomoon.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/theme/default/themes-override.css">
    <link rel="stylesheet" type="text/css" href="/resources/plugins/admin-forms/css/admin-forms.css">
    <link rel="stylesheet" type="text/css" href="/resources/plugins/bootstrap-table/bootstrap-table.css">
    <link rel="stylesheet" type="text/css" href="/resources/plugins/layer/skin/layer.css">


</head>
<body id="iframeBody" class="iframe-body">
    <div class="nano nano-light">
        <div class="nano-content">
            <div class="pageContent">
                <form class="form form-horizontal" role="form" id="inputForm" method="post">
                    <input id="id" name="id" type="hidden"/>
                    <div class="form-body">
                        <div class="row col-xs-11">
                            <div class="form-group">
                                <label class="col-xs-3 control-label text-right pt5">
                                    <span class="fs4 fa fa-asterisk text-danger mr5"></span>用户名
                                </label>
                                <div class="col-xs-8">
                                    <input class="form-control" id="username" name="userName" StringMaxLength="50" required>
                                </div>
                            </div>
                        </div>
                        <div class="row col-xs-11">
                            <div class="form-group">
                                <label class="col-xs-3 control-label text-right pt5">
                                    <span class="fs4 fa fa-asterisk text-danger mr5"></span>真实姓名
                                </label>
                                <div class="col-xs-8">
                                    <input class="form-control" id="truename" name="trueName" StringMaxLength="50" required>
                                </div>
                            </div>
                        </div>
                        <div class="row col-xs-11">
                            <div class="form-group">
                                <label class="col-xs-3 control-label text-right pt5">
                                    <span class="fs4 fa fa-asterisk text-danger mr5"></span>密码
                                </label>
                                <div class="col-xs-8">
                                    <input class="form-control" id="password" name="password" StringMaxLength="50" required>
                                </div>
                            </div>
                        </div>
                        <div class="row col-xs-11">
                            <div class="form-group">
                                <label class="col-xs-3 control-label text-right pt5">
                                    <span class="fs4 fa fa-asterisk text-danger mr5"></span>身份证号
                                </label>
                                <div class="col-xs-8">
                                    <input class="form-control" id="carid" name="cardId" StringMaxLength="18" required>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
<!-- jQuery、Bootstrap、jQuery UI -->
<script src="/resources/plugins/jquery/jquery-2.2.4.min.js"></script>
<script type="text/javascript" src="/resources/plugins/bootstrap/bootstrap.min.js"></script>
<!--浏览器全屏适配JS引用-->
<script type="text/javascript" src="/resources/plugins/fullscreen/jquery.fullscreen.js"></script>
<!--滚动条JS引用，用于子页面内容-->
<script type="text/javascript" src="/resources/plugins/nanoscroller/jquery.nanoscroller.min.js"></script>
<!--主页面初始化JS-->
<script type="text/javascript" src="/resources/js/utility/main_page.js"></script>
<!--在主页面初始化、改变窗口大小时，计算ifrmae的大小-->
<script type="text/javascript" src="/resources/js/utility/page_height.js"></script>
<!--使主页面窗口全屏的代码-->
<script type="text/javascript" src="/resources/js/utility/fullscreen.js"></script>
<!--检测子页面的内容改变-->
<script type="text/javascript" src="/resources/plugins/resize/jquery.ba-resize.min.js"></script>

<script type="text/javascript" src="/resources/js/utility/color_variables.js"></script>

<script type="text/javascript" src="/resources/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>
<script type="text/javascript" src="/resources/plugins/bootstrap-table/bootstrap-table.js"></script>
<script type="text/javascript" src="/resources/plugins/bootstrap-table/bootstrap-table-zh-CN.js"></script>
<script type="text/javascript" src="/resources/plugins/select2/select2.full.js"></script>
<script type="text/javascript" src="/resources/plugins/select2/select2-zh-CN.js"></script>
<script type="text/javascript" src="/resources/plugins/lingjs/linq.js"></script>
<!-- 时间控件 -->
<script type="text/javascript" src="/resources/plugins/My97DatePicker/WdatePicker.js"></script>
<%--PoshyTip--%>
<script type="text/javascript" src="/resources/plugins/PoshyTip/jquery.poshytip.min.js"></script>
<!-- PNotify -->
<script type="text/javascript" src="/resources/plugins/pnotify/pnotify.js"></script>
<!--如果想在主窗口内弹出窗口，必须要引用-->
<script type="text/javascript" src="/resources/plugins/layer/layer.js"></script>
<script type="text/javascript" src="/resources/plugins/admin-panels/adminpanels.js"></script>
<!-- 页面跳转控制文件 -->
<script type="text/javascript" src="/resources/plugins/tabChange/tabChange.js"></script>
<%--表单验证--%>
<script type="text/javascript" src="/resources/plugins/validate/jquery.validate.js"></script>
<script type="text/javascript" src="/resources/plugins/validate/jquery.validate.method.js"></script>
<!-- 字典公共js -->
<script type="text/javascript" src= "/resources/js/dict/dictComm.js"></script>
<!-- Storage本地存储js -->
<script type="text/javascript" src= "/resources/js/storageCache.js"></script>
<!-- 共用方法js -->
<script type="text/javascript" src="/resources/js/base.js"></script>
<%--公用js样式--%>
<script type="text/javascript" src="/resources/js/commonJs.js"></script>
<!-- END: PAGE SCRIPTS -->
<script type="text/javascript">

    var _index = parent.layer.getFrameIndex(window.name);
    var _id = $.getUrlParam('id')||'';

    $(function () {
       var loadinglayer = parent.layer.load(3);
       $.ajax({
           type: 'post',
           url: '/info',
           data: {id: _id},
           success: function(data){
               parent.layer.close(loadinglayer);
               if(data){
                   $("#inputForm").setTagsValue(data.userInfo);
               }else{
                   parent.layer.msg('数据加载失败！', {icon: 5});
               }
           },
           error: function (exception) {
               parent.layer.msg('数据加载失败！', {icon: 5});
               parent.layer.close(loadinglayer);
           }
       });
    });

   $("#inputForm").validate({
        submitHandler : function () {
            var loadinglayer = parent.layer.load(3);
            $.ajax({
                url: '/edit',
                type: 'post',
                data: $('#inputForm').serialize(),
                success: function (data) {
                    parent.layer.close(loadinglayer);
                    if(data > 0){
                        parent.layer.msg($('#id').val() ? '更新成功！': '保存成功！',{icon : 6});
                        parent.$('#table').bootstrapTable('refresh');
                        parent.layer.close(_index);
                    }else{
                        parent.layer.msg($('#id').val() ? '更新失败！': '保存失败！',{icon : 5});
                    }
                },
                error: function (jqHXR, exception) {
                    parent.layer.msg('操作失败！',{icon: 5});
                    parent.layer.close(loadinglayer);
                }
            });
        }
   });

   /**
    * 初始化页面高度
    */
   $(".nano").nanoScroller();

   /**
    * 监听页面高度改变
    */
   $("#pageContent").resize(function () {
       $('.nano').nanoScroller();
   });

   function formSubmit() {
       $("#inputForm").submit();
   }
</script>
</html>
