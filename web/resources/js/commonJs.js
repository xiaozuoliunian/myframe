$(function () {
    $(".radio-custom").click(function () {
        $(this).siblings().removeClass("radio-primary");
        $(this).addClass("radio-primary");
    })
    $(".checkbox-default").change(function () {
        if($(this).hasClass("checkbox-primary")){
            $(this).removeClass("checkbox-primary");
        }else{
            $(this).addClass("checkbox-primary");
        }
    })
    
    // excel导出
    $('#exportBtnComm').on('click', function() {
        if ($('#totalCount').val() == 0) {
            layer.alert('没有可导出的数据');
            return;
        }
        layer.open({
            type: 2,
            title:"导出excel",
            area:[$(window).width()*0.75+'px',$(window).height()*0.75+'px'],//弹窗宽高
            btn: ['确定', '取消'],
            content: [$ctx+'/common/document/toExportExcel'],
            yes: function(index,layero){
                var iframeWin = window[layero.find('iframe')[0]['name']];
                iframeWin.formSubmit();
            }
        });
    });
})