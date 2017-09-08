<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../common/taglib.jsp"%>
<head>
    <%@ include file="../common/head.jsp" %>
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
                                    <span class="fa fa-asterisk text-danger mr5"></span>dict_key
                                </label>
                                <div class="col-xs-8">
                                    <input class="form-control" id="dictkey" name="dictKey" StringMaxLength="50" required>
                                </div>
                            </div>
                        </div>
                        <div class="row col-xs-11">
                            <div class="form-group">
                                <label class="col-xs-3 control-label text-right pt5">
                                    <span class="fa fa-asterisk text-danger mr5"></span>parent_key
                                </label>
                                <div class="col-xs-8">
                                    <input class="form-control" id="parentkey" name="parentKey" StringMaxLength="50" required>
                                </div>
                            </div>
                        </div>
                        <div class="row col-xs-11">
                            <div class="form-group">
                                <label class="col-xs-3 control-label text-right pt5">
                                    <span class="fa fa-asterisk text-danger mr5"></span>root_key
                                </label>
                                <div class="col-xs-8">
                                    <input class="form-control" id="rootkey" name="rootKey" StringMaxLength="50" required>
                                </div>
                            </div>
                        </div>
                        <div class="row col-xs-11">
                            <div class="form-group">
                                <label class="col-xs-3 control-label text-right pt5">
                                    <span class="fa fa-asterisk text-danger mr5"></span>dict_value
                                </label>
                                <div class="col-xs-8">
                                    <input class="form-control" id="dictvalue" name="dictValue" StringMaxLength="50" required>
                                </div>
                            </div>
                        </div>
                        <div class="row col-xs-11">
                        <div class="form-group">
                            <label class="col-xs-3 control-label text-right pt5">
                                <span class="fa fa-asterisk text-danger mr5"></span>dict_sort
                            </label>
                            <div class="col-xs-8">
                                <input class="form-control" id="dictsort" name="dictSort" StringMaxLength="18" required>
                            </div>
                        </div>
                       </div>
                        <div class="row col-xs-11">
                            <div class="form-group">
                                <label class="col-xs-3 control-label text-right pt5">
                                    <span class="fa fa-asterisk text-danger mr5"></span>dict_level
                                </label>
                                <div class="col-xs-8">
                                    <input class="form-control" id="dictlevel" name="dictLevel" StringMaxLength="18" required>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</body>
<%@include file="../common/common.jsp"%>
<script type="text/javascript">
    importing(function () {
        //得到当前iframe层的索引
        var _index = parent.layer.getFrameIndex(window.name),
            _isView = $.getUrlParam('isView') || '',
            _id = $.getUrlParam('id') || '';
        //初始化数据
        function initData() {
            //查看首先屏蔽所有输入框页面操作
            if(_isView){
                $(':input','#inputForm').prop('disabled',true);
            }
            //如果有数据
            if(_id){
                //启动加载层
                var loadinglayer = parent.layer.load(3);
                $.ajax({
                    type: 'post',
                    url: $ctx+'/getDictById',
                    data: {id: _id},
                    success: function(data){
                        parent.layer.close(loadinglayer);
                        if(data){
                            $("#inputForm").setTagsValue(data.dictInfo);
                        }else{
                            parent.layer.msg('数据加载失败！', {icon: 5, time: 1000});
                        }
                    },
                    error: function (exception) {
                        parent.layer.msg('数据加载失败！', {icon: 5, time: 1000});
                        parent.layer.close(loadinglayer);
                    }
                });
            }
            /** form 提交表单 */
            $("#inputForm").validate({
                submitHandler : function () {
                    var loadinglayer = parent.layer.load(3);
                    $.ajax({
                        url: $ctx+'/editDict',
                        type: 'post',
                        data: $('#inputForm').serialize(),
                        success: function (data) {
                            parent.layer.close(loadinglayer);
                            if(data > 0){
                                parent.layer.msg($('#id').val() ? '更新成功！': '保存成功！',{icon : 6, time: 1000});
                                parent.$('#table').bootstrapTable('refresh');
                                parent.layer.close(_index);
                            }else{
                                parent.layer.msg($('#id').val() ? '更新失败！': '保存失败！',{icon : 5, time: 1000});
                            }
                        },
                        error: function () {
                            parent.layer.msg('操作失败！',{icon: 5, time: 1000});
                            parent.layer.close(loadinglayer);
                        }
                    });
                }
            });
        }

        //初始化数据
        initData();
        //初始化页面高度
        $(".nano").nanoScroller();
        //监听页面高度
        $("#pageContent").resize(function () {
            $('.nano').nanoScroller();
        });
    });

   /**
    *form 表单提交
    */
   function formSubmit() {
       $("#inputForm").submit();
   }
</script>
</html>
