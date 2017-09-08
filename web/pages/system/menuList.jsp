<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../common/taglib.jsp"%>
<html>
<head>
    <%@ include file="../common/head.jsp" %>
</head>
<body class="iframe-body" id="iframeBody">
<section class="table-layout section-body" id="content">
    <div class="nano nano-light">
        <div class="nano-content">
            <div class="pageContent">
                <div  class="panel">
                    <div class="panel-heading lh35">
                        <span class="panel-title"><span class="fa fa-table"></span>菜单列表</span>
                        <div class="widget-menu pull-right mr10">
                            <div class="progress-bar-lg clearfix">
                                <button type="button" class="btn btn-xs btn-success" id="addMenu">
                                    <span class="fa fa-plus"></span> 新增
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive tab-content">
                            <table class="ellipsis-table" id="table"></table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>


</section>
<%@include file="../common/common.jsp"%>
<script type="text/javascript">
    $(function() {
        //初始化Table
        tableInit();
    });

    <!-- 表格实现主体 -->
    function tableInit () {
        $("#table").bootstrapTable('destroy').bootstrapTable({
            url: $ctx+"/getMenuJson",//数据源
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
                    width: 30,//宽度
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
                    field: "menuTitle",
                    align: "center",
                    width: "10%",
                    title: "菜单标题"
                },
                {
                    field: "menuUrl",
                    align: "center",
                    width: "15%",
                    title: "链接地址"
                },
                {
                    field: "menuIcon",
                    align: "center",
                    width: "25%",
                    title: "菜单图标"
                },
                {
                    field: "createDate",
                    align: "center",
                    width: "15%",
                    title: "创建时间"
                },
                {
                    title: "操作",
                    field: "operate",
                    align: "center",
                    width: "15%",
                    events: operateEvents,
                    formatter: function operateFormatter(value,row) {
                        return [
                            '<a class="edit p2" href="javascript:void(0)" title="编辑"><i class="fa fa-edit"></i></a>',
                            '<a class="delete p2" href="javascript:void(0)" title="删除"><i class="fa fa-trash-o"></i></a>'
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
                title: '修改菜单信息',
                maxmin: true,
                area: [600+'px',400+'px'],
                btn:['保存','关闭'],
                content: ['/toMenuGroupForm?id='+row.id,'no'],
                yes: function (index, layero) {
                    var iframeWin = window[layero.find('iframe')[0]['name']];
                    iframeWin.formSubmit();
                }
            });
        },
        'click .delete':function (evt, value, row) {
            layer.confirm("确定要删除该条记录吗？",{title: '删除菜单'},
                function (index) {
                    $.ajax({
                        url: '/deleteMenu',
                        type: 'post',
                        data: {id: row.id},
                        success: function (data) {
                            if (data == 1){
                                layer.msg('删除成功',{icon: 6});
                                $("#table").bootstrapTable('refresh',{
                                    url: '/getMenuJson'
                                });
                            }else{
                                layer.msg('删除失败',{icon: 5});
                            }
                        },
                        error: function () {
                            layer.msg('删除失败', {icon: 5});
                            layer.close(index);
                        }
                    });
                }
            );
        }
    }

    <!--新增用户-->
    $('#addMenu').on('click',function () {
        layer.open({
            type: 2,
            title: '新增菜单项',
            maxmin: true,
            area: [600+'px',400+'px'],
            btn: ['保存','取消'],
            content: ['/toMenuGroupForm','on'],
            yes: function (index, layero) {
                var iframeWindow = window[layero.find('iframe')[0]['name']];
                iframeWindow.formSubmit();
            }
        });
    });

</script>

</body>

</html>
