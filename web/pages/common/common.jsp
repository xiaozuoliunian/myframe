<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>

<script type="text/javascript">
    /** 初始化访问contextPath*/
    var $ctx = window.path = "${ctx}";
</script>

<!-- jQuery、Bootstrap、jQuery UI -->
<script type="text/javascript" src="${ctx}/resources/plugins/jquery/jquery-2.2.4.min.js"></script>
<script type="text/javascript" src="${ctx}/resources/plugins/bootstrap/js/bootstrap.min.js"></script>
<!--浏览器全屏适配JS引用-->
<script type="text/javascript" src="${ctx}/resources/plugins/fullscreen/jquery.fullscreen.js"></script>
<!--滚动条JS引用，用于子页面内容-->
<script type="text/javascript" src="${ctx}/resources/plugins/nanoscroller/jquery.nanoscroller.min.js"></script>
<!--主页面初始化JS-->
<script type="text/javascript" src="${ctx}/resources/plugins/utility/main_page.js"></script>
<!--在主页面初始化、改变窗口大小时，计算ifrmae的大小-->
<script type="text/javascript" src="${ctx}/resources/plugins/utility/page_height.js"></script>
<!--使主页面窗口全屏的代码-->
<script type="text/javascript" src="${ctx}/resources/plugins/utility/fullscreen.js"></script>
<!--检测子页面的内容改变-->
<script type="text/javascript" src="${ctx}/resources/plugins/resize/jquery.ba-resize.min.js"></script>

<script type="text/javascript" src="${ctx}/resources/plugins/utility/color_variables.js"></script>

<script type="text/javascript" src="${ctx}/resources/plugins/bootstrap-treeview/bootstrap-treeview.js"></script>
<script type="text/javascript" src="${ctx}/resources/plugins/bootstrap-table/bootstrap-table.js"></script>
<script type="text/javascript" src="${ctx}/resources/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.js"></script>
<script type="text/javascript" src="${ctx}/resources/plugins/select2/select2.min.js"></script>
<script type="text/javascript" src="${ctx}/resources/plugins/select2/select2-zh-CN.js"></script>
<script type="text/javascript" src="${ctx}/resources/plugins/ling/linq.js"></script>
<!-- 时间控件 -->
<script type="text/javascript" src="${ctx}/resources/plugins/My97DatePicker/WdatePicker.js"></script>
<%--PoshyTip--%>
<script type="text/javascript" src="${ctx}/resources/plugins/PoshyTip/jquery.poshytip.min.js"></script>
<!-- PNotify -->
<script type="text/javascript" src="${ctx}/resources/plugins/pnotify/pnotify.js"></script>
<!--如果想在主窗口内弹出窗口，必须要引用-->
<script type="text/javascript" src="${ctx}/resources/plugins/layer/layer.js"></script>
<script type="text/javascript" src="${ctx}/resources/plugins/admin-panels/adminpanels.js"></script>
<!-- 页面跳转控制文件 -->
<script type="text/javascript" src="${ctx}/resources/plugins/tabChange/tabChange.js"></script>
<%--表单验证--%>
<script type="text/javascript" src="${ctx}/resources/plugins/validate/jquery.validate.js"></script>
<script type="text/javascript" src="${ctx}/resources/plugins/validate/jquery.validate.method.js"></script>
<!-- 字典公共js -->
<script type="text/javascript" src= "${ctx}/resources/js/dictComm.js"></script>
<!-- 共用方法js -->
<script type="text/javascript" src="${ctx}/resources/js/base.js"></script>
<%--公用js样式--%>
<script type="text/javascript" src="${ctx}/resources/js/commonJs.js"></script>
<!-- END: PAGE SCRIPTS -->