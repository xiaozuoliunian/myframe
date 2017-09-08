/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "必填信息",
		remote: "请修正该信息",
		email: "请输入正确格式的电子邮件",
		url: "请输入合法的网址",
		date: "请输入合法的日期",
		dateISO: "请输入合法的日期 (ISO).",
		number: "请输入合法的数字",
		digits: "只能输入整数",
		creditcard: "请输入合法的信用卡号",
		equalTo: "请再次输入相同的值",
		accept: "请输入拥有合法后缀名的字符串",
		maxlength: $.validator.format("请输入一个长度最多是 {0} 的字符串"),
		minlength: $.validator.format("请输入一个长度最少是 {0} 的字符串"),
		equallength:$.validator.format("请输入一个长度等于 {0} 的字符串"),
		rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
		range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
		max: $.validator.format("请输入一个最大为 {0} 的值"),
		min: $.validator.format("请输入一个最小为 {0} 的值")
	});
	$.extend($.validator.defaults, {
		errorClass:"text-danger",
		errorElement: "em",
		highlight:function(e){
			$(e).closest(".form-group").addClass("has-error");
		},
		success:function(e){
			$(e).closest(".form-group").removeClass("has-error");
		}
	});
}(jQuery));

//特殊字符验证(注:此处的特殊字符定义可能并不是准确的)
jQuery.validator.addMethod("specialCharValidate", function(value, element) { 
	var pattern = new RegExp("[`~!@%#$^&*()=|{}':;'　\\[\\]<>/? \\.；：%……+￥（）【】‘”“'。？]"); 
	return this.optional(element)||!pattern.test(value) ; 
},  $.validator.format("请确认输入信息不能包含特殊字符"));

//字符最小长度验证（数据库使用的是UTF8字符集，每个中文占3个字节）
jQuery.validator.addMethod("stringMinLength", function(value, element, param) {
	var length = value.length;
	for ( var i = 0; i < value.length; i++) {
		if (value.charCodeAt(i) > 127) {
			length += 2;
		}
	}
	return this.optional(element) || (length >= param);
}, $.validator.format("长度不能小于{0}"));

// 字符最大长度验证（数据库使用的是UTF8字符集，每个中文占3个字节）
jQuery.validator.addMethod("stringMaxLength", function(value, element, param) {
	var length = value.length;
	for ( var i = 0; i < value.length; i++) {
		if (value.charCodeAt(i) > 127) {
			length += 2;
		}
	}
	return this.optional(element) || (length <= param);
}, $.validator.format("长度不能大于{0}"));

jQuery.validator.addMethod("ip", function(value, element) {
	return this.optional(element) || (/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.test(value) && (RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256));   
}, "请输入合法的IP地址");

jQuery.validator.addMethod("abc",function(value, element) {
	return this.optional(element) || /^[a-zA-Z0-9_]*$/.test(value);
},"请输入字母数字或下划线");

jQuery.validator.addMethod("abc_space",function(value, element) {
	return this.optional(element) || /^[A-Za-z0-9_\s]*$/.test(value);
},"请输入字母数字或下划线");
jQuery.validator.addMethod("abc_num",function(value, element) {
	return this.optional(element) || /^[A-Za-z0-9\s]*$/.test(value);
},"请输入字母或数字");
jQuery.validator.addMethod("abcnum",function(value, element) {
	return this.optional(element) || /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i.test(value);
},"请输入字母和数字");

jQuery.validator.addMethod("username",function(value, element) {
	return this.optional(element) || /^[a-zA-Z0-9][a-zA-Z0-9_]{2,19}$/.test(value);
},"3-20位字母或数字开头，允许字母数字下划线");

jQuery.validator.addMethod("noEqualTo",function(value, element, param) {
	return value != $(param).val();
},"请再次输入不同的值");

jQuery.validator.addMethod("gt",function(value, element, param) {
	return value > $(param).val();
},"请输入更大的值");

jQuery.validator.addMethod("lt",function(value, element, param) {
	return value < $(param).val();
},"请输入更小的值");

//真实姓名验证
jQuery.validator.addMethod("realName", function(value, element) {
    return this.optional(element) || /^[\u4e00-\u9fa5]{2,30}$/.test(value);
}, "姓名只能为2-30个汉字");

// 字符验证
jQuery.validator.addMethod("userName", function(value, element) {
    return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
}, "登录名只能包括中文字、英文字母、数字和下划线");

// 手机号码验证
jQuery.validator.addMethod("mobile", function(value, element) {
    var length = value.length;
    return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(170)|(15[0-9]{1}))+\d{8})$/.test(value));
}, "请正确填写您的手机号码");

// 电话号码验证
jQuery.validator.addMethod("simplePhone", function(value, element) {
    var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
    return this.optional(element) || (tel.test(value));
}, "请正确填写您的电话号码");

//// 电话号码验证     
//jQuery.validator.addMethod("phone", function(value, element) {     
//	var tel = /(^0[1-9]{1}\d{9,10}$)|(^1[3,5,7,8]\d{9}$)/g;     
//	return this.optional(element) || (tel.test(value));     
//}, "格式为:固话为区号(3-4位)号码(7-9位),共(11-12位),手机为:13,15,17,18号段");
// 电话号码验证（支持多个电话号码:以,，、/隔开）
jQuery.validator.addMethod("phone", function(value, element) {     
	var tel = /^(0[1-9]{1}\d{9,10}|1[3,5,7,8]\d{9})([,，、\/](0[1-9]{1}\d{9,10}|1[3,5,7,8]\d{9}))*$/g;
	return this.optional(element) || (tel.test(value));     
}, "格式为:固话为区号(3-4位)号码(7-9位),共(11-12位),手机为:13,15,17,18号段;多个时以逗号分割。");

// 邮政编码验证
jQuery.validator.addMethod("zipCode", function(value, element) {
    var tel = /^[0-9]{6}$/;
    return this.optional(element) || (tel.test(value));
}, "请正确填写您的邮政编码");

//QQ号码验证
jQuery.validator.addMethod("qq", function(value, element) {
    var tel = /^[1-9][0-9]{4,}$/;
    return this.optional(element) || (tel.test(value));
}, "请正确填写您的QQ号码");
 
//校验身份证号
jQuery.validator.addMethod("card",function(value, element) {
	return this.optional(element) || checkIdcard(value);
},"请输入正确的身份证号码(15-18位)");

//校验身份证号，控制id为param对象是否有效
jQuery.validator.addMethod("cardable",function(value, element ,param) {
	var idCardCheck = checkIdcard(value);
	var $ele = eval('$("#'+param+'")');
	if(!idCardCheck){
		$ele.prop("disabled",true);
	}else {
		$ele.prop("disabled",false);
	}
	return this.optional(element) || idCardCheck;
},"请输入正确的身份证号码(15-18位)");

//简要案情验证
jQuery.validator.addMethod("jyaqMinLength", function(value, element,param) {
	var length = value.length;
	return this.optional(element) || length >= param;
}, "简要案情不能少于{0}个字");

//经度验证
jQuery.validator.addMethod("jd",function(value, element) {
	return this.optional(element) || /^-?(?:(?:180(?:\.0{1,5})?)|(?:(?:(?:1[0-7]\d)|(?:[1-9]?\d))(?:\.\d{1,6})?))$/.test(value);
},"请填写正确的经度，经度范围:-180.000000~180.000000");

//经度验证
jQuery.validator.addMethod("wd",function(value, element) {
	return this.optional(element) || /^-?(?:90(?:\.0{1,5})?|(?:[1-8]?\d(?:\.\d{1,6})?))$/.test(value);
},"请填写正确的纬度，纬度范围:-90.000000~90.000000");

//勘验编号验证
jQuery.validator.addMethod("xkbh",function(value, element) {
    return this.optional(element) || /^K[A-Za-z0-9]{22}$/.test(value);
},"请填写正确的勘验编号,格式：K+22位数字或字母");

//检查是否重复
jQuery.validator.addMethod("repeatCheck",function(value, element) {
    if(this.optional(element)) {
        return;
    }
    var $ele = $(element);
    var checkUrl = $ele.attr("data-checkUrl");
    var oldVal = $ele.attr("data-oldValue");

	oldVal = oldVal && $.trim(oldVal);
	value = value && $.trim(value);

    if(oldVal && oldVal == value) {
        return true;
    }
    var success = false;
    $.ajax(checkUrl, {
        dataType: 'json',
        async: false,
        data: {
            value: value,
            oldValue: oldVal
        },
        success: function(data) {
            success = data;
        }
    });
	return success;
},"请输入不重复的值");


//检查是否重复
jQuery.validator.addMethod("dictRepeatCheck",function(value, element) {
	if(this.optional(element)) {
		return;
	}
	var $ele = $(element);
	var checkUrl = $ele.attr("data-checkUrl");
	var oldType = $ele.attr("data-oldType");
	var $type = $($ele.attr("data-newType"));
	var newType = $type.val();
	var oldValue = $ele.attr("data-oldValue");
	var $value = $($ele.attr("data-newValue"));
	var newValue = $value.val();

	//trim()方法是原生的js方法,高级浏览器中已经默认支持 trim() ,但ie6、7、8都不支持这个新加的方法
	//使用jquery里面的全局函数$.trim()代替原生js方法trim()：
	oldType = oldType && $.trim(oldType);
	newType = newType && $.trim(newType);
	oldValue = oldValue && $.trim(oldValue);
	newValue = newValue && $.trim(newValue);

	var success = false;
	if(oldType == newType && oldValue == newValue) {
		success = true;
	} else {
		$.ajax(checkUrl, {
			dataType: 'json',
			async: false,
			data: {
				newType: newType,
				newValue: newValue
			},
			success: function (data) {
				success = data;
			}
		});
	}
	return success;
},"请输入不重复的值");

// 验证最大整数位数，最大小数位数
jQuery.validator.addMethod("number_ext", function(value, element, param){
	if (value) {
		// 验证参数格式是否合法
		var paramRex = /^\d+,\d+$/;
		var checkdResult = true;
		if (paramRex.test(param)) {
			// 验证整数，小数合适是否合法
			var decimalRex = /^\d+(\.\d+)?$/;
			if (decimalRex.test(value)) {
				var paramArray = param.split(",");
				if (value.indexOf(".") == -1) {
					if (value.length > parseInt(paramArray[0])) {
						checkdResult = false;
					}
				} else {
					var valueArray = value.split(".");
					if (valueArray[0].length > parseInt(paramArray[0]) || valueArray[1].length > parseInt(paramArray[1])) {
						checkdResult = false;
					}
				}
			} else {
				checkdResult = false;
			}
		}
	}
    return this.optional(element) || checkdResult;
}, function(param) {
	var paramArray = param.split(",");
	return "请输入最多" + paramArray[0] + "位整数，" + paramArray[1] + "位小数！"
});

//验证身份证函数
function checkIdcard(idcard){
	idcard = idcard.toString();
	//var Errors=new Array("验证通过!","身份证号码位数不对!","身份证号码出生日期超出范围或含有非法字符!","身份证号码校验错误!","身份证地区非法!");
	var Errors=new Array(true,false,false,false,false);
	var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
	var idcard,Y,JYM;
	var S,M;
	var idcard_array = new Array();
	idcard_array = idcard.split("");
	//地区检验
	if(area[parseInt(idcard.substr(0,2))]==null) return Errors[4];
	//身份号码位数及格式检验
	switch(idcard.length){
		case 15:
			if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
				ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
			} else {
				ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
			}
			if(ereg.test(idcard)) return Errors[0];
			else return Errors[2];
			break;
		case 18:
			//18 位身份号码检测
			//出生日期的合法性检查
			//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
			//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
			if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){
				ereg=/^[1-9][0-9]{5}(18|19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
			} else {
				ereg=/^[1-9][0-9]{5}(18|19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
			}
			if(ereg.test(idcard)) {//测试出生日期的合法性
				//计算校验位
				S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
					+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
					+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
					+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
					+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
					+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
					+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
					+ parseInt(idcard_array[7]) * 1
					+ parseInt(idcard_array[8]) * 6
					+ parseInt(idcard_array[9]) * 3 ;
				Y = S % 11;
				M = "F";
				JYM = "10X98765432";
				M = JYM.substr(Y,1);//判断校验位
				if(M == idcard_array[17]) return Errors[0]; //检测ID的校验位
				else return Errors[3];
			}
			else return Errors[2];
			break;
		default:
			return Errors[1];
			break;
	}
} 