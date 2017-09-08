<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
	<%@ include file="../common/head.jsp"%>
	<title>excel导出</title>
</head>
<body id="iframeBody" class="iframe-body form-body">
<div class="nano nano-light">
	<div class="nano-content">
		<div id="pageContent">
			<!--导出-->
			<form name="exportForm" id="exportForm" method="post" action="">
				<input type="hidden" id="exportFilter" name="exportFilter">
				<input type="hidden" id="exportColumns" name="exportColumns">
				<input type="hidden" id="exportSelectedData" name="exportSelectedData">
				<input type="hidden" id="exportSelectedFlag" name="exportSelectedFlag" value="0">
			</form>

			<div id="exportExcel">
				<div class="col-md-12">
					<div class="mt10">
						<div class="col-md-6 col-sm-12" id="startDiv">
							<div class="row form-group">
								<label class="control-label lighter col-md-2 text-left ml10 mt5">开始条数</label>
								<div class="col-md-8">
									<input type="text" name="exportStartNum" id="exportStartNum" class="form-control gui-input" placeholder="请输入大于0的整数">
								</div>
							</div>
						</div>
						<div class="col-md-6 col-sm-12" id="endDiv">
							<div class="row form-group">
								<label class="control-label lighter col-md-2 text-left ml10 mt5">结束条数</label>
								<div class="col-md-8">
									<input type="text" name="exportEndNum" id="exportEndNum" class="form-control gui-input" placeholder="请输入不大于查询总条数的整数,最大可导出1000" >
								</div>
							</div>
						</div>

						<div id="available" class="choose-parameter col-md-6 col-sm-6 h-300">
							<p class="text-primary">选择表头:</p>
							<button class="btn bg-white remove-all mr10">>></button>
							<button class="btn bg-primary light remove-alone ph50">></button>
							<div class="scrollOuter table-bordered h-250 mt20">
								<div class="nano">
									<div class="nano-content">
										<ul tpsource="#choose-canshu" class="all-parameter pln common-parameter">
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div id="configured" class="choose-parameter col-md-6 col-sm-6 h-300">
							<p class="text-success">已选表头:</p>
							<button class="btn bg-success lighter remove-alone ph50 text-white"><</button>
							<button class="btn bg-white remove-all mr10"><<</button><div class="scrollOuter table-bordered h-250 mt20">
							<div class="nano">
								<div class="nano-content">
									<ul tpsource="#choose-canshu" class="choosed-parameter pln common-parameter">

									</ul>
								</div>
							</div>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
</body>
<%@ include file="../common/common.jsp"%>
<!--导出表头-->
<script type="text/template" id="choose-canshu" >
	<li class="fs12 p10 curpoin" title="{id}">{text}</li>
</script>
<script type="text/javascript">
    //导出excel  start
    $(document).ready(function() {
        var exportSelectedData;
        if (typeof window.parent.getSelectedData == 'function') {
            exportSelectedData = window.parent.getSelectedData();
            var len = exportSelectedData.length;
            if(len > 0){
                $('#exportSelectedFlag').val('1');
                $('#exportSelectedData').val(JSON.stringify(exportSelectedData));
                $('#startDiv').addClass('hide');
                $('#endDiv').addClass('hide');
            }
        } else {
            $('#startDiv').removeClass('hide');
            $('#endDiv').removeClass('hide');
        }

        var exportColumn = window.parent.getExportColumn();
        var allColumn=[];
        var selectedColumn=[];
        if(exportColumn.length>0){
            for(var i=0;i<exportColumn.length;i++){
                if(exportColumn[i].id == ""){
                    continue;
                }else{
                    if(exportColumn[i].text!="" && selectedColumn.length<=8){ // 默认选中8个字段
                        selectedColumn.push(exportColumn[i]);
                    }else{
                        allColumn.push(exportColumn[i]);
                    }
                }
            }
        }
        $('.all-parameter').template(allColumn);
        $('.choosed-parameter').template(selectedColumn);

		/*服务代码 选择参数*/
        $('.all-parameter').on('click','li',function(e){
            e.preventDefault();
            if($(this).hasClass('bg-primary')){
                $(this).removeClass('bg-primary text-white selected');
            }else{
                $(this).addClass('bg-primary text-white selected');
            }
        });

		/*服务代码 已选参数*/
        $('.choosed-parameter').on('click','li',function(e){
            e.preventDefault();
            if($(this).hasClass('bg-success')){
                $(this).removeClass('bg-success text-white selected');
            }else{
                $(this).addClass('bg-success text-white selected');
            }
        });

		/*单多个选择参数已选参数移动*/
        function choosePara(curr){
            var choosePa = $(curr).siblings(".scrollOuter").find(".common-parameter").children("li.selected");
            if(choosePa.length){
                choosePa.each(function(){
                    var chostml = $(this).html(),
                        chostitle = $(this).attr("title");
                    $li = $('<li class="fs12 p10 curpoi" title="'+chostitle+'">'+chostml+'</li>');
                    $(this).parents(".choose-parameter").siblings(".choose-parameter").find(".common-parameter").append($li);
                    $(this).parents(".choose-parameter").siblings(".choose-parameter").find(".nano").nanoScroller().nanoScroller({ scrollTo: $li });
                    $(this).remove();
                })
            }else{
                layer.msg('请至少选择一条数据', {icon: 5});
            }
        }

		/*选择参数已选参数全部移动*/
        function chooseAll(curr){
            $(curr).siblings(".scrollOuter").find(".common-parameter").children("li").each(function(){
                var chostml = $(this).html(),
                    chostitle = $(this).attr("title");
                $li = $('<li class="fs12 p10 curpoi" title="'+chostitle+'">'+chostml+'</li>');
                $(this).parents(".choose-parameter").siblings(".choose-parameter").find(".common-parameter").append($li);
                $(this).parents(".choose-parameter").siblings(".choose-parameter").find(".nano").nanoScroller().nanoScroller({ scrollTo: $li });
                $(this).remove();
            })
        }

        // 移动选中
        $(".remove-alone").click(function(e){
            e.preventDefault();
            choosePara(this);
        });

        // 移动全部
        $(".remove-all").click(function(e){
            e.preventDefault();
            chooseAll(this);
        });

        //三角箭头的移动
        var $triangle = $('.triangle-arrow');
        $('.alert-info').on('click',function(){
            $triangle.removeClass('top80 top180 top280 hide').addClass('top20');
        });
        $('.alert-warning').on('click',function(){
            $triangle.removeClass('top20 top180 top280 hide').addClass('top80');
        });
        $('.alert-success').on('click',function(){
            $triangle.removeClass('top20 top80 top280 hide').addClass('top180');
        });
        $('.alert-danger').on('click',function(){
            $triangle.removeClass('top20 top80 top180 hide').addClass('top280');
        });
    });

    // 表单提交
    function formSubmit(){
        if($('#exportSelectedFlag').val() == '0'){ // 选中数据的导出不需要导出条数,不需要查询条件
            var exportStartNum=$("#exportStartNum").val();
            if(!(/(^[1-9]\d*$)/.test(exportStartNum))){
                layer.alert('开始条数:请输入大于0的整数!');
                return;
            }
            var exportEndNum=$("#exportEndNum").val();
            if(!(/(^[1-9]\d*$)/.test(exportEndNum))){
                layer.alert('结束条数:请输入大于0的整数!');
                return;
            }
            if(parseInt(exportStartNum)>parseInt(exportEndNum)){
                layer.alert('起始条数不能大于结束条数!');
                return;
            }
            if(parseInt(exportEndNum)>parseInt(window.parent.$('#totalCount').val())){
                layer.alert('结束条数不能大于查询总条数!');
                return;
            }
            if(parseInt(exportEndNum)-parseInt(exportStartNum)>=1000){
                layer.alert('导出总数不能大于1000!');
                return;
            }
        }

        //构建导出字段为列表的展示字段
        var columnJson = {};
        $(".choosed-parameter").children("li").each(function(){
            var col = $(this).attr("title");
            columnJson[$(this).text()] = col;
        });
        if($.isEmptyObject(columnJson)){
            layer.alert('请选择表头!');
            return;
        }
        $('#exportColumns').val(JSON.stringify(columnJson));

        // 查询条件
        var formJson = window.parent.getExportFilter();
        formJson.limit = parseInt(exportEndNum) - parseInt(exportStartNum) + 1;
        formJson.offset = parseInt(exportStartNum) - 1;
        $('#exportFilter').val(JSON.stringify(formJson));

        $('#exportForm').attr('action',formJson.url);
        $('#exportForm').submit();
    }

    //导出excel  end
</script>
</html>
