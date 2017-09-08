<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../common/taglib.jsp"%>
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    <title>Bootstrap Table</title>
    <meta name="keywords" content="">
    <meta name="description" content="">

    <!-- 基本样式文件 -->
    <link rel="stylesheet" type="text/css" href="${ctx}/resources/css/theme/default/theme.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/resources/plugins/ace/assets/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/resources/css/theme/default/themes-override.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/resources/plugins/admin-forms/css/admin-forms.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/resources/plugins/bootstrap-table/bootstrap-table.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/resources/plugins/layer/skin/default/layer.css">

</head>
<body class="iframe-body" id="iframeBody">
<section class="table-layout section-body" id="content">
    <div class="nano nano-light">
        <div class="nano-content">
            <div class="pageContent">
                <div class="panel panel-primary panel-border top">
                    <div class="panel-body">
                        <form class="form form-horizontal" role="form" id="queryForm" name="queryForm">
                            <div class="form-body">
                                <div class="row col-md-11">
                                    <div class="row">
                                        <div class="col-md-6 col-sm-12">
                                            <div class="row form-group">
                                                <label  class="col-md-4 control-label">用户名</label>
                                                <div class="col-md-8">
                                                    <input class="form-control" type="text" id="inputUserName" name="inputUserName"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6 col-sm-12">
                                            <div class="row form-group">
                                                <label  class="col-md-4 control-label">真实姓名</label>
                                                <div class="col-md-8">
                                                    <input class="form-control" type="text" id="inputTrueName" name="inputTrueName"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row col-md-11">
                                    <div class="row">
                                        <div class="col-md-6 col-sm-12">
                                            <div class="row form-group">
                                                <label  class="col-md-4 control-label">身份证号</label>
                                                <div class="col-md-8">
                                                    <input class="form-control" type="text" id="inputCardId" name="inputCardId"/>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="row col-md-11">
                                    <div class="col-md-12 col-sm-12">
                                        <div class="row form-group">
                                            <div class="col-md-2 col-md-offset-10">
                                                <div class="pull-right">
                                                    <button class="btn btn-info" type="button" id="queryUser">查询</button>
                                                    <button class="btn btn-default" type="reset" id="resetForm">重置</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div  class="panel">
                    <div class="panel-heading">
                        <span class="panel-title"><span class="fa fa-table"></span>查询结果</span>
                        <div class="widget-menu pull-right mr10">
                            <div class="progress-bar-lg clearfix">
                                <button type="button" class="btn btn-xs btn-success" id="addUser">
                                    <span class="fa fa-plus"></span> 新增
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body pn">
                        <div class="table-responsive tab-content">
                            <table class="ellipsis-table" id="table"></table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>


</section>
<script src="${ctx}/resources/plugins/jquery/jquery-2.2.4.min.js"></script>
<script src="${ctx}/resources/plugins/bootstrap/js/bootstrap.min.js"></script>
<script src="${ctx}/resources/plugins/bootstrap-table/bootstrap-table.js"></script>
<script src="${ctx}/resources/plugins/bootstrap-table/extensions/mobile/bootstrap-table-mobile.min.js"></script>
<script src="${ctx}/resources/plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js"></script>
<script src="${ctx}/resources/plugins/layer/layer.js"></script>

<script type="text/javascript">
    $(function() {
        //根据窗口调整表格高度
        $(window).resize(function () {
            $("#table").bootstrapTable('resetView', {
                height: tableHeight()
            })
        });
        //初始化Table
        tableInit();
    });

    <!-- 表格实现主体 -->
    function tableInit () {
        $("#table").bootstrapTable('destroy').bootstrapTable({
            url: "/getUserJson",//数据源
            method: "post",//请求方式
            height: tableHeight(),//高度调整
            dataType: "json", //数据格式
            striped: true, //是否显示行间隔色
            pagination: true,//是否分页
            sidePagination: "server",//服务端分页
            pagNumber: 1,//初始化加载默认第一页
            pageSize: 10,//单页记录数
            pageList: [10, 20, 0, 50],//分页步进值
            queryParams : _queryParams,  //请求服务器数据时的参数
            columns: [
                {
                    title: "全选",
                    field: "select",
                    checkbox: true,
                    width: 20,//宽度
                    align: "center",//水平
                    valign: "middle"//垂直
                },
                {
                    title: "ID",//标题
                    field: "id",//键名
                    visible: false
                },
                {
                    title: "序号",
                    align: "center",
                    width: "10%",
                    class: "ellipsis-element",
                    formatter: function (value,row,index) {
                        var pageNo = $("#table").bootstrapTable('getOptions').pageNumber,
                            pageSize = $("#table").bootstrapTable('getOptions').pageSize;
                        return (pageNo - 1) * pageSize + index + 1;
                    }
                },
                {
                    field: "userName",
                    align: "center",
                    width: "10%",
                    title: "用户名"
                },
                {
                    field: "trueName",
                    align: "center",
                    width: "10%",
                    title: "真实姓名"
                },
                {
                    field: "cardId",
                    align: "center",
                    width: "25%",
                    title: "身份证号码"
                },
                {
                    field: "createDate",
                    align: "center",
                    width: "25%",
                    title: "创建时间"
                },
                {
                    title: "操作",
                    field: "operate",
                    align: "center",
                    width: "20%",
                    events: operateEvents,
                    formatter: function operateFormatter(value,row) {
                        return [
                            '<a class="edit p2" href="javascript:void(0)" title="编辑"><i class="fa fa-edit"></i></a>',
                            '<a class="delete p2" href="javascript:void(0)" title="删除"><i class="fa fa-remove"></i></a>'
                        ].join('');
                    }
                }
            ],
            onClickRow: function(row, $element) {
                //$element是当前tr的jquery对象
                $element.css("background-color", "#FFEFD5");
            },//单击row事件
            locale: "zh-CN"//中文支持
        });
    }

    /*
     * 查询条件
     */
    function _queryParams(params) {
        params.order = 'create_date.desc';
        params.username = $("#inputUserName").val();
        params.trueName = $("#inputTrueName").val();
        params.cardId = $("#inputCardId").val();
        return params;
    }

    /**
     * table高度设置
     */
    function tableHeight() {
        return $(window).height() - 80;
    }

    /**
     *  查询按钮监听事件
     */
    $("#queryUser").on('click',function(){
        tableInit();
    });

    /**
     * 表格操作工具栏监听事件
     */
    var operateEvents = {
        'click .edit':function (evt, value, row) {
            layer.open({
                type: 2,
                title: '修改用户信息',
                maxmin: true,
                area: [600+'px',400+'px'],
                btn:['保存','关闭'],
                content: ['/toUserGroupForm?id='+row.id,'no'],
                yes: function (index, layero) {
                    var iframeWin = window[layero.find('iframe')[0]['name']];
                    iframeWin.formSubmit();
                }
            });
        },
        'click .delete':function (evt, value, row) {
            layer.confirm("确定要删除该条记录吗？",{title: '删除该人员'},
                function (index) {
                    $.ajax({
                        url: '/delete',
                        type: 'post',
                        data: {id: row.id},
                        success: function (data) {
                            if (data == 1){
                                layer.msg('删除成功',{icon: 6});
                                $("#table").bootstrapTable('refresh',{
                                    url: '/getUserJson'
                                });
                            }else{
                                layer.msg('删除失败',{icon: 5});
                            }
                        },
                        error: function (jqXHR,exception) {
                            layer.msg('删除失败', {icon: 5});
                            layer.close(index);
                        }
                    });
                }
            );
        }
    }

    <!--新增用户-->
    $('#addUser').on('click',function () {
        layer.open({
            type: 2,
            title: '新增用户',
            maxmin: true,
            area: [600+'px',400+'px'],
            btn: ['保存','取消'],
            content: ['/toUserGroupForm','on'],
            yes: function (index, layero) {
                var iframeWin = window[layero.find('iframe')[0]['name']];
                iframeWin.formSubmit();
            }
        });
    });

</script>

</body>

</html>
