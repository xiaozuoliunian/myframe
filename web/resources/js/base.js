//config
window.config={
    version:top.version,
    cssBasePath:$ctx+'/resources/css/',
    jsBasePath:$ctx+'/resources/js/',
    pluginBasePath:$ctx+'/resources/plugins/'
};


//plugin
config.plugins={
	// bootstrap table filter-control
	filtercontrol: 'bootstrap-table/bootstrap-table-filter-control.js',
	filtercontrolCss: 'bootstrap-table/bootstrap-table-filter-control.css',
    poshytip:'PoshyTip/jquery.poshytip.js',
    poshytipCss:'PoshyTip/tip-yellowsimple/tip-yellowsimple.css',
    gojs:'gojs/go_1.5.12.js',
    //表格编辑
    tabEditable:'bootstrap-table/bootstrap-table-editable.js',
    editable:'bootstrap-table/bootstrap-editable.js',
    //ztree插件
    ztree:'ztree/jquery.ztree.core.min.js',
    ztreeCheck:'ztree/jquery.ztree.excheck.js',
    ztreeExe:'ztree/jquery.ztree.exedit.min.js',
    contextJs:'context/context.js',
    tabdrop:'bootstrap-tabdrop/bootstrap-tabdrop.js',
    echarts3:'echarts/echarts.js',
    echarts362:'echarts/echarts3.js',
    //文件上传下载组件
    plupload:'plupload/plupload.full.min.js',
    /*翻页*/
    paging:'twbsPagination/jquery.twbsPagination.js',
    jqueryUi:'jquery-ui/jquery-ui.min.js',
    //富文本
    summernote:'summernote/summernote.min.js',
    summernoteCn:'summernote/summernote-zh-CN.js',
    summernoteCss:'summernote/summernote.css',
    //三级联动
    citylink:'cityplugin/citySet.js',
    cityjson:'cityplugin/cityJson.js',
    //左右轮播切换
    slick:'slick/slick.js',
    //日历插件
    zabutoCalendar:'ZabutoCalendar/zabuto_calendar.js',
    zabutoCalendarCss:'ZabutoCalendar/zabuto_calendar.css'
};

//extend
window.extending=function(the,obj){
    for(var n in obj){
        the[n]=obj[n];
    }
};

window.extending(window,{
        //json与string互转
        obj2str:function(obj){return typeof obj=='object'?JSON.stringify(obj):obj;},
        str2obj:function(str){return typeof str=='string'?JSON.parse(str):str;},
        dash2camel:function(str){
            var arr=str.split('-');
            for(var i= 1;i<arr.length;i++){
                if(arr[i]){
                    arr[0]=arr[0]+arr[i][0].toUpperCase()+arr[i].slice(1);
                }
            }
            return arr[0];
        },
        camel2dash:function(str){
            for(var i=1;i<str.length;i++){
                if(str[i].match(/[A-Z]/)){
                    str=str.slice(0,i)+'-'+str[i].toLowerCase()+str.slice(i+1);
                }
            }
            return str;
        },
        //简写原生选择器，支持传入第二参数iframe的document
        byid:function(id,doc){return (doc||document).getElementById(id);},
        bytag:function(tag,doc){return (doc||document).getElementsByTagName(tag);},
        //获取位置
        getRect:function(ele){return ele.getBoundingClientRect();},
        //调试
        log:function (param){typeof console!='undefined' && console.log(param);},
        info:function(param){typeof console!='undefined' && console.info(param);},
        warn:function(param){typeof console!='undefined' && console.warn(param);},
        error:function(param){typeof console!='undefined' && console.error(param);},
        logex:function(msg,cssTxt){
                //默认fontsize 18px写前面，后写的可覆盖
                cssTxt= cssTxt ? 'font-size:18px;'+cssTxt : 'font-size:18px;color:red;';
                console.log('%c'+msg,cssTxt);
            },
        //类型判断
        typeOf:(function(){
                var dic={'[object Object]':'object','[object RegExp]':'regexp','[object Date]':'date','[object Array]':'array','[object String]':'string','[object Number]':'number','[object Boolean]':'boolean','[object Error]':'error','[object Window]':'window'};
                var stringify=Object.prototype.toString;
                return function(obj,plus){
                    if(typeof obj !='object')
                        return typeof obj;
                    else if(obj===null)
                        return 'null';
                    else if(plus)
                        return dic[stringify.apply(obj)] || stringify.call(obj).slice(8,-1).toLowerCase()|| 'object';
                    else
                        return dic[stringify.apply(obj)] || 'object';
                };
                })(),
        //防止百分号标签空白输出在页面上
        getJspData:function(data){
                return data||null;
            },
        replaceDDD:function(value){return value.replace(/\<ddd\>/gmi,"'");},
        //原生弹窗的封装
        open2:function(){
                var features='';
                var config={status:0,width:top.getWidth()-40,height:top.getHeight()-70,top:20,left:20,scrollbars:1,resizable:1,fullscreen:0,channelmode:0,directories:1,help:0,menubar:0,toolbar:0,location:0};
                var obj=typeof arguments[0]=='object' ? arguments[0]:{url:arguments[0],name:arguments[1],width:arguments[2],height:arguments[3],left:arguments[4],top:arguments[5]} ;
                for (var n in obj){
                    typeof obj[n]!='undefined' && (config[n]=obj[n]);
                }
                for (var m in config){
                    if(m!='url' || m!='name')
                    features += ','+ m + '=' +config[m];
                }
                //log(url +'\n'+ name +'\n'+ features.slice(1))
                var win=window.open(config.url,config.name||'_blank',features.slice(1));
                return win;
            },
        $style:function(src,cb,removeExist){
                //src.match(/^http|^\.|^\//)!=null || (src=top.path+'/style/'+src);
                src.match(/\.css$/i)!=null || (src+='.css');
                //src+='?version='+Date.format('YYYYMMDD').slice(0,-1);
                removeExist && window.removeTag(src,'link');
                var link=document.createElement('link');
                link.rel='stylesheet';
                link.type='text/css';
                link.media='screen';
                link.href=src+(window.config.version?'?version='+window.config.version:'');
                document.head.appendChild(link);
                cb && cb.call(link);
                return link;
            },
        $script:function (src,cb,removeExist){
            removeScript(src);
            var bol = false;
            var tag=document.createElement('script');
            removeExist && window.removeTag(src);

            tag.type='text/javascript';
            tag.language='javascript';
            //tag.setAttribute('async','async');
            //tag.setAttribute('defer','defer');
            src.match(/\.js$/i)!=null || (src+='.js');
            tag.src=src+(window.config.version?'?version='+window.config.version:'');
            tag.onload=tag.onreadystatechange=function(){
                if(!bol&&(!tag.readyState||tag.readyState=='loaded'||tag.readyState=='complete')){
                    bol=true;
                    tag.onload=tag.onreadystatechange=null;
                    if(cb){
                        cb.call(tag);
                    }
                }
            };
            document.body.appendChild(tag);
            return tag;
        },
        removeScript:function(src){
            var tags=document.getElementsByTagName('script');
            for(var i=0;i<tags.length;i++){
                if(tags[i].src.split('').reverse().join('').indexOf(src.split('').reverse().join(''))==0){
                    document.body.removeChild(tags[i]);
                }
            }
        },
        importing:function(){
            var ags=arguments;
            var ag=ags[0];
            if(typeof ag!='string'){
                typeof ag=='function' && ag();
                return false;
            }
            //识别插件
            var plugins=window.config.plugins;
            if(plugins[ag]){
                ag=window.config.pluginBasePath+plugins[ag];
            }else{
                if(ag.match(/.*.css$/i)){
                    ag=window.config.cssBasePath+ag;
                }
                if(ag.match(/.*.js$/i)){
                    ag=window.config.jsBasePath+ag;
                }
            }
            //识别加载方式
            window[ag.match(/.*\/css\/.+|.css$/i)?'$style':'$script'](ag,function(){
                window.importing.apply(this,[].slice.call(ags,1));
            },ags[ags.length-1]===true);
        },
        importingJs: function () {
            var ags = arguments;
            var ag = ags[0];
            if (typeof ag != 'string') {
                typeof ag == 'function' && ag();
                return false;
            }
            //加载外部的js
            if (ag.match(/.*.js$/i)) {
                ag = ag;
            }
            //识别加载方式
            window[ag.match(/.*\/css\/.+|.css$/i) ? '$style' : '$script'](ag, function () {
                window.importingJs.apply(this, [].slice.call(ags, 1));
            });
        },
        removeTag:function(src,tagName){
            var tags=document.head.getElementsByTagName(tagName||'script');
            src=src.replace('./','').replace('../','').replace('.\\','').replace('..\\','');
            for(var i=0;i<tags.length;i++){
                if((tagName=='link'?tags[i].href:tags[i].src).split('').reverse().join('').indexOf(src.split('').reverse().join(''))==0){
                    document.head.removeChild(tags[i]);
                }
            }
        }

    });

//prototype
window.extending(JSON,{
    equal:function(obj,obj2){return obj===obj2 || ( typeof obj==typeof obj2  && JSON.stringify(obj)===JSON.stringify(obj2) );}
});

//时间扩展
window.extending(Date.prototype,{
    getDayAs:function(symbol){
        if(symbol=='星期'){
            return Date.weeks[this.getDay()];
        }else if(symbol=='周'){
            return Date.weeks2[this.getDay()];
        }else{
            return this.getDay();
        }
    },
    addMonth:function(i){
        var m=this.getMonth();
        var y=this.getFullYear();
        if(i>0){
            (i>11) && (y+=Math.floor(i/12));
        }else{
            (i<-11)&& (y+=Math.ceil(i/12));
        }
        m+=i%12;
        this.setMonth(m);
        this.setFullYear(y);
        return this;
    },
    format:function (fmt) {
        var o = {
            'M+': this.getMonth() + 1, //月份
            'D+': this.getDate(), //日
            'h+': this.getHours(), //小时
            'm+': this.getMinutes(), //分
            's+': this.getSeconds(), //秒
            'Q+': Math.floor((this.getMonth() + 3) / 3), //季度
            'S': this.getMilliseconds() //毫秒
        };
        fmt=fmt||'YYYY-MM-DD hh:mm:ss';
        for(var n in {8:8,10:10})
            if(fmt.slice(0,+n).toUpperCase().replace(/\-|\.|\s|\//g,'')=='YYYYMMDD'){
                fmt=fmt.slice(0,+n).toUpperCase()+fmt.slice(+n);
            }
        if (/(Y+)/.test(fmt)){
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o)
            if (new RegExp('(' + k + ')').test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(("" + o[k]).length)));
            }
        return fmt;
    }
});

window.extending(Date,{
    format:function(fmt){return new Date().format(fmt);},
    getDayAs:function(symbol){return new Date().getDayAs(symbol);},
    weeks:['星期天','星期一','星期二','星期三','星期四','星期五','星期六'],
    weeks2:['周日', '周一', '周二', '周三', '周四', '周五', '周六']
});
// Date.weeks[new Date().getDay()]

//String扩展
window.extending(String.prototype,{
    isEmpty:function(){return this.replace(/\s+/gm,'').length===0;},
    format:function(){
        var vname='\\{i\\}';
        var str=this;
        var agmt;
        for(var i=arguments.length-1;i>-1;i--){
            agmt=vname.replace('i',i);
            str=str.replace(RegExp(agmt,'g'),arguments[i]);
        }
        return str;
    },
    inside:function(strs){
        var the=this.valueOf();
        if(typeof strs=='string'){
            return strs.indexOf(the)>-1;
        }else{                                                                               //字符串存在于数组某项? 不接受大小写,要忽略大小写请自己将双方toUpperCase()
            for(var i=strs.length-1;i>-1;i--){
                if( the===strs[i].valueOf() )
                    return i+1;	//返回第几项. 不从0开始,避免识别为false, 注意是最后一次出现的位置+1
            }
        }
        return false;
    },
    like:function(key){
        var bs=key.indexOf('%')==0;
        var be=key.lastIndexOf('%')==key.length-1;
        if(bs&&be){
            return this.indexOf(key.slice(1,-1))!=-1;
        }else if(bs){
            var d = this.length-key.length+1;
            return this.lastIndexOf(key.slice(1))==d && d>0;
        }else if(be){
            return this.indexOf(key.slice(0,-1))==0;
        }else {
            return String(this)===String(key);
        }
    },
    endsWith:function(str){
        return this.slice(-str.length) == str;
    }
});
window.extending(Number.prototype,{
    prev:function(){return this-1;},
    next:function(){return this+1;}
});

//jQuery全局方法扩展，调用方式为：$.方法名(参数？)。
window.$.extend({
    //获取Url中的参数,返回Url参数中指定的name参数值，不送参数返回所有的Url参数
    getUrlParam : function(name){
        var result = location.search.match(new RegExp('[\?\&][^\?\&]+=[^\?\&]*','g'));
        if(result==null){
            return false
        };
        var j=result.length,obj={},arr=[];
        for(var i=0;i<j;i++){
            arr=result[i].slice(1).split('=');
            if(name && arr[0] == name){
                return arr[1];
            }
            obj[arr[0]]=arr[1];
        }
        return name ? obj[name]||'' : obj;
    },

    /**
     * 模拟form打开新页面通过post方式传参数
     * @param url 包含参数名，例如http://ip:port/xzxt-theme-web/da/ryda/toRyDaDetail?zjhm=
     * @param param 参数值 可以是字符串或者jsonObject对象
     */
    openNewWindow : function (url, param) {
        if(!url) {
            return;
        }
        // 当外部url 或者param为空并且url不包含参数 直接通过window.open打开
        if( url.indexOf("http") === 0 || (!param && !(url.indexOf("?") > 0))) {
            window.open(url);
            return;
        }

        // 判断页面中是否存在hiddenOpenForm 存在则删除，防止由于点击次数增加产生大量的form
        var hiddenForm = document.getElementById("hiddenOpenForm");
        if(hiddenForm) {
            hiddenForm.remove();
        }
        // 创建form
        var form = document.createElement('form');
        form.id = 'hiddenOpenForm';
        form.action = url.split("?")[0];
        form.target = '_blank';
        form.method = 'post';
        form.style.display = 'none';
        // param为字符串或者空时
        if(!param || typeof param === 'string'){
            var result = url.match(new RegExp('[\?\&][^\?\&]+=[^\?\&]*','g'));
            var length = result.length,arr = [];
            for (var i = 0;i < length;i++) {
                arr = result[i].slice(1).split('=');
                if(!arr[0]) {
                    continue;
                }
                var opt = document.createElement('input');
                // 当参数值存在时，既=号后面有值
                if(arr[1]) {
                    opt.name = arr[0];
                    opt.value = arr[1];
                } else {
                    opt.name = arr[0];
                    opt.value = param;
                }
                form.appendChild(opt);
            }
            document.body.appendChild(form);
            form.submit();
            return;
        }
        //如果param是object，则以param里参数为主
        if(typeof param === 'object') {
            $.each(param, function (key,val) {
                var opt = document.createElement('input');
                opt.name = key;
                opt.value = val;
                form.appendChild(opt);
            });
            document.body.appendChild(form);
            form.submit();
        }
    },

    //将下划线命名转换为驼峰命名
    convertUnderline : function(str){
        str = str.toLowerCase().replace(/\_(\w)/g, function(x){return x.slice(1).toUpperCase();});
        return str;
    },

    //清除linkbutton点击后的虚线
    noOutline : function(selector){
        $(selector||'a').on('focus',function(){this.blur();});
    }
});

//jQuery对象方法扩展，调用方式为：$(选择器).方法名(参数？)。
window.$.fn.extend({
    //form序列化，自动将form表单封装成json对象
    serializeObject : function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value.trim() || '');
            } else {
                o[this.name] = this.value.trim() || '';
            }
        });
        return o;
    },

    //通过form中input、select、textarea的name属性选择，并赋值;data:赋值json数据
    setTagsValue : function(data){
        var tags = this.find(':input').not(':button,:submit,:reset,:image');
        $.each(tags,function(){
            if (data[this.name] || data[this.name]=='0' || data[this.name]== 0){
                if (this.type == 'checkbox'){
                    $(this).prop('checked',this.value == data[this.name]).trigger('change');
                } else  if(this.type == 'radio') {
                	if(this.value == data[this.name]){$(this).prop('checked',true).trigger('change');}
                } else {
                    $(this).val(data[this.name]).trigger('change');
                }
            }
        });
    },
    
    /*
     * 上下限比较
     * @param xxId 下限Id
     * @param sxId 上限Id
     * @param focusId 
     */
    sxxValueCompare : function(xxId, sxId, focusId){
    	var xxValue = parseFloat($('#'+xxId).val());
    	var sxValue = parseFloat($('#'+sxId).val());
    	if(xxValue != '' &&  sxValue != '' && xxValue > sxValue){
            layer.msg('下限不能大于上限！',function () {
                $('#'+focusId).focus();
            });
            return false;
        }
    },
    
    // 通过标签查询其下所有的div并设置div中的html值
    setDivHtml : function(data){
        var tags = this.find('div');
        $.each(tags,function(){
        	if(data){
	            if (data[this.id] || data[this.id]=='0' || data[this.id]== 0){
	                $(this).html(data[this.id]);
	                $(this).attr('title', data[this.id]);
	            } else if(this.id && !data[this.id]){
	            	$(this).html('');
	            }
        	} else {
				if(this.id){
	            	$(this).html('');
	            }
        	}
        });
        if(data && data.desc){
        	// 字典代码转换
            var descObj = data.desc;
            $.each(descObj, function(key, val) {
                $('#'+key).html(descObj[key]);
            });
        }
    }
});

//吐司消息
window.toast=function(str){
    var holding;
    var callback;
    var itv;
    var done;
    str=String(str);
    var bol= str.length>15;
    var len= bol ? str.length : 15;
    if(typeof arguments[1]=='number'){
        holding=arguments[1];
        typeof arguments[2]=='function' && (callback=arguments[2]);
    }else if(typeof arguments[1]=='function'){
        callback=arguments[1];
    }
    // 根据文字长度增加延时, 限制最高秒数
    holding= holding || 1600+(len-15)*30;
    var p=jQuery('<div><p>str</p></div>'.replace('str',str));
    var fadeOut=function(){
        if(!done){
            jQuery('.the-mask').remove();
            p.animate({'opacity':0},500,function(){callback && callback(p);p.remove();});
            done=true;
        }
    };
    jQuery('.toast').hide();
    /*jQuery('body').click(fadeOut);*/
    setTimeout(function(){jQuery('body').one('click',fadeOut);},200);
    // 预制样式
    return  p.addClass('toast').appendTo('body')
        //透明度 文字居中居左判断
        .css({'text-align':bol?'left':'center'})
        // 移入暂停
        .bind('mouseenter',function(){clearTimeout(itv);})
        .bind('mouseleave',function(){itv=setTimeout(fadeOut,200);})
        // 增加icon
        .extend({
            ok:function(){return p.addClass('ok');},
            err:function(){return p.addClass('err');}
        })
        // 显示
        .fadeIn(function(){
            itv=setTimeout(fadeOut,holding||900);
        });
};

//STP
(function($){
    //for null,undefined,number,xss and others
    function $encode(str,allowHTML){
        var dic={'<':'&lt;','>':'&gt;','"':'&quot',"'":'‘',':':'：','{':'&#123;','}':'&#125;'};//&#39; &apos;
        if(str==null || str=='null' || str=='NULL' || str===0 || str===false ){
            return '';
        }
        str =  allowHTML ? String(str).replace(/\<\/?script[^\>]*\>/gmi,function(s){return s.replace(/\<|\>/gm,function($){return dic[$]})})
            : String(str).replace(/\<|\>/gm,function($){return dic[$]});
        return $encode.tranSymbol ? str.replace(/\"\'\{\}\:/gm,function($){return dic[$];}):str;
    }
    //core
    window.$compile=function $compile(source,data,arg2,arg3) {
        var allowHTML;
        var helper;
        if(data==null || (typeof data.pop=='function' && data.length==0)){
            return '';
        }else if(typeof data=='object'){
            var kCount=0;
            for(var _n in data){
                _n!='_stp_helper_done_' && kCount++;
                if(kCount){break;}
            }
            if(!kCount){return ''};
        }
        data = typeof data.pop=='function' ? data : [data];
        if(typeof arg2=='boolean'){
            allowHTML=arg2;
        }else{
            typeof arg2=='function' && (helper=arg2);
            allowHTML=arg3;
        }
        var the=this;
        if(!source){
            throw new Error('source undefined! please checkout the template source,id or url!');
        }
        var format=function (obj,str){//,prefix) {
            var vuestr=function(key){
                var val=obj;
                var arr=key.split('.');
                for(var i=0;i<arr.length;i++){
                    if(i==0 && arr[i]=='this'){
                        val=the;
                        continue;
                    }
                    if(typeof val=='number' && arr[i]=='length'){
                        //val=val;
                    }else{
                        val=typeof val[arr[i]]=='function'? val[arr[i]]():val[arr[i]];
                    }
                    if((val==null||val=='null' || val=='NULL') && typeof arr[i+1]!='undefined'){
                        val='';
                    }
                }
                return $encode(val,allowHTML);
            };
            str=str.replace(/&amp;/g,'&').replace(/{{!?[A-z]+(\.?\w+)*\s?&{2}\s?#[\w\-]+}}|{{!?[A-z]+(\.?\w+)*\s?&{2}\s?[^#].+}}|{{[A-z]+(\.?\w+)*\s?:?\s?#[\w\-]+}}|{{\w*\s?:?\s?#[^#].+#}}/g,function(g){
                g=g.replace(/{{|}}/gm,'').replace(/^\s+|\s+$/gm,'');
                var d,t,e, j,_i,i=g.indexOf(':'),i2=g.indexOf('&&');
                if(i==-1 && i2==-1){
                    return $(g).html()||(typeof console=='object' && console.error('can`t find the inlaid template: '+id))||'';
                }else{
                    j=(g.indexOf(':')>0 && g.indexOf(':') < g.indexOf('#')) ? 1:2;
                    d= j==1 ? g.slice(0,i).trim():g.slice(0,i2).trim();
                    _i=j==1 ? i:i2;
                    if(g.lastIndexOf('#')==g.length-1){
                        t= g.slice(_i+j).trim().slice(1,-1);
                        //t=g.slice(i+2,-1);
                    }else{
                        t=$(g.slice(_i+j).trim()).html();
                    }
                    if(j===1){
                        return vuestr(d)?$compile.apply(this,[t,obj[d],function(item){
                            ('super' in item)  && (console.info(item) || console.warn("don't use keyword 'super' as key"));
                            item.super=obj;
                            return true;
                        },allowHTML]):'';
                    }else if(d.indexOf('!')==0){
                        return vuestr(d.slice(1))?'':$compile.apply(this,[t,obj,null,allowHTML]);
                    }else{
                        return vuestr(d)?$compile.apply(this,[t,obj,null,allowHTML]):'';
                    }
                }
            });
            str=str.replace(/{[A-z]+(\.?\w+)*}/gm,function(key){
                key=key.slice(1,-1);
                return vuestr(key);
            });
            return str;
        }

        var i=0,j=data.length,sb=[];
        for(;i<j;i++){
            typeof helper=='function' && !data[i]._stp_helper_done_ && helper(data[i],i) && (data[i]._stp_helper_done_=true);
            sb.push(format(data[i],source).replace(/\{\$rownum\}/g,i+1).replace(/\{\$index\}/g,$encode(i)).replace(/\{\$nth2\}/g,i%2==1?'nth-even':'nth-odd'));
        }
        return sb.join('');
    }
    //seal4quick
    window.$template=(function($){
        var cache={};
        return function (container,data,arg2,arg3){
            var $container=$(container);
            var source=$container[0].getAttribute('tpsource')||(typeof container=='string'?container:'#'+$container[0].getAttribute('id'));
            if(cache[source]){
                return $container.html($compile.apply(this,[cache[source],data,arg2,arg3])).removeClass('stp-hide');
            }else if(source.indexOf('#')==0){
                cache[source]=$(source).eq(0).html();
                return $container.html($compile.apply(this,[cache[source],data,arg2,arg3])).removeClass('stp-hide');
            }else{
                $.get(source,function(res){
                    cache[source]=res;
                    $container.html($compile.apply(this,[res,data,arg2,arg3])).removeClass('stp-hide');
                });
                return $container;
            }
        }
    })(window.jQuery);

    window.$.fn.fixData=window.$.fn.thisData=function(data){
        return arguments.length==0?this.data('fix-data'):this.data('fix-data',data);
    };
    window.$.fn.template=function(data,arg2,arg3){
        return $template.apply(this.data('fix-data')||window,[this,data,arg2,arg3]);
    };
    $.fn.autoTemplate=function(rows,data,helper,allowHTML){
        if(!rows.length || !data.length){
            return false;
        }
        var thstr='<th class="stp-{0}-th-{1} {2}" sort-name={3}>{4}</th>';//'<th class="stp-{pid}-th-{key} {hide}" sort-name={sname}>{cname}</th>'
        var tdstr='<td class="stp-{0}-td-{1} {2}">{{3}}</td>';//'<td class="stp-{pid}-td-{key} {hide}">{{value}}</td>'
        if(typeof rows[0]=='string'){
            rows=rows.select('r=>{cname:r}');
        }
        var keys=Object.keys(data[0]);
        var len=keys.length;
        var thtp='<tr>';
        var tdtp='<tr>';
        for(var i=0;i<len;i++){
            thtp+=thstr.format(this[0].id||'',rows[i].ename||keys[i],rows[i].hide?'hideplus':'',rows[i].sname||'',rows[i].cname);//thstr.replace('{pid}',this[0].id||'').replace('{key}',keys[i]).replace('{cname}',rows[i].cname).replace('{sname}',rows[i].sname||'');
            tdtp+=tdstr.format(this[0].id||'',rows[i].ename||keys[i],rows[i].hide?'hideplus':'',rows[i].ename||keys[i]);//tdstr.replace('{pid}',this[0].id||'').replace('{key}',keys[i]).replace('{value}',keys[i]);
        }
        thtp+='</tr>';
        tdtp+='</tr>';
        if(this.find('tbody').length){
            this.find('thead').html(thtp);
            this.find('tbody').html($compile(tdtp,data,helper,allowHTML));
        }else{
            return this.html('<table><thead>{0}</thead><tbody>{1}</tbody></table>'.format(thtp,$compile(tdtp,data,helper,allowHTML)));
        }
    };
})(window.jQuery);

//根据Bootstrap行号删除指定行
(function($){
    var BootstrapTable = $.fn.bootstrapTable.Constructor;
    BootstrapTable.prototype.removeRow = function(rowNum) {
        var that = this;
        var len = that.options.data.length;
        if (isNaN(rowNum)) {
            return;
        }
        // 删除数据
        that.options.data.splice(rowNum, 1);
        if (len === this.options.data.length) {
            return;
        }
        this.initSearch();
        this.initPagination();
        this.initBody(true);
    };
    //将removeRow添加到bootstrapTable的方法库中
    $.fn.bootstrapTable.methods.push('removeRow');
})(jQuery);

//所有input输入框添加删除按钮
$("input[type='text']").each(function(){
    if($(this).parent().hasClass("input-group")){
        $(this).parent().find("span.inputdelte").remove();
        $(this).after('<span class="glyphicons glyphicons-remove_2 pos-a top10 text-muted inputdelte curpoin allhide" style="right: 45px;z-index:9;"></span>');
    }else {
        $(this).parent().find("span.inputdelte").remove();
        $(this).after('<span class="glyphicons glyphicons-remove_2 pos-a top10 text-muted inputdelte curpoin allhide" style="right:20px;z-index:9;"></span>');
    }
});
//日期输入框去掉关闭按钮
$(".glyphicons-calendar,.glyphicon-calendar").each(function(){
    var currparent = $(this).parent();
    currparent.siblings(".glyphicons-remove_2").remove();
});
$("input[type='text']").parent().mouseover (function () {
    if($(this).children("input[type='text']").val()!="" && !$(this).children("input[type='text']").attr("disabled") && !$(this).children("input[type='text']").attr("readonly")){
        $(this).find(".inputdelte").show();
    }
}).mouseout(function () {
    $(this).find(".inputdelte").hide();
});
$("input[type='text']").keyup(function () {
    if($(this).val()!=""){
        $(this).siblings(".inputdelte").show();
    }else{
        $(this).siblings(".inputdelte").hide();
    }
});
//input输入框删除按钮删除
$(".form-body").on("click","span.inputdelte",function(){
    if(!$(this).siblings("input[type='text']").attr("disabled") && !$(this).siblings("input[type='text']").attr("readonly")){
        $(this).prev().val("").trigger("change");
        $(this).prev().removeAttr("data-harea");
    }else{
//字典值
    }
});

$.ajaxSetup({
    contentType: "application/x-www-form-urlencoded;charset=utf-8",
    complete: function(XMLHttpRequest, status) {
        var sessionStatus = XMLHttpRequest.getResponseHeader("sessionStatus");
        if(sessionStatus == 'timeout') {
            window.location.replace($ctx + "/errors/errorAuth");
        }
    }
});
//增加日期后边按钮单击选择日期
$(".glyphicon-calendar,.glyphicons-calendar").on("click",function (e) {
    e.stopPropagation();
    $(this).parent().prev("input[type='text']").trigger('focus');
});
//对于有两个输入框的去掉关闭按钮
$(".input-group-addon").each(function(){
    var sibLenth = $(this).siblings("input[type='text']").length;
    if(sibLenth>=2){
        $(this).siblings("span.inputdelte").remove();
    }else{

    }
});
window.onscroll = function(){
    $(this).scrollLeft('0');
};
//单选框和复选框选中变成蓝色
$("head").append("<style>.checkbox-custom input[type=checkbox]:checked + label:after{background-color: #649ae1;color: #649ae1;}.checkbox-custom input[type=checkbox]:checked+label:before{border: 1px solid #649ae1;}</style>");
$("input[type='radio']").click(function(){
    $(this).parent().parent().find('.radio-primary').removeClass('radio-primary');
    $(this).parent().parent().find('.checkbox-primary').removeClass('checkbox-primary');
    if($(this).prop("checked","checked")){
        $("head").append("<style>.radio-custom input[type=radio]:checked + label:before{border-color: #4ea5e0;}.radio-custom input[type=radio]:checked + label:after{background-color: #649ae1;color: #649ae1;}</style>");
    }
});