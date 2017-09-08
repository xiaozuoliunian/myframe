/**
 * 字典对象
 * @classname dictComm
 * @author liuhuan
 * @date 2016年7月15日 下午7:21:18
 * @update jinzan
 * @date 2016年8月24日 下午11:21:28
 */
(function ($) {
    'use strict';

    var _expandibleTree, _searchJsonArr,_searchTree;

    /**
     * options构造函数,取标签属性,返回json对象
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _optionsConstructor = function () {
        var obj = {};
        for (var key in HisignDict.DEFAULTS) {
            if (key === 'className' || key === 'value') {
                obj[key] = this[0][key] || '';
            } else {
                obj[key] = this.attr(key) || null;
            }
        }
        return obj;
    };

    /**
     * 初始化select选择框,并赋值
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _selectLoad = function (data) {
        data.selectJson.unshift({id: '', text: ''});
        var selectTag = $('#' + this.options.id);
        selectTag.select2({
            data: data.selectJson,
            tags: this.options.dictMultiple === 'true',
            language: 'zh-CN',//提示信息中文
            //minimumResultsForSearch: -1, //取消搜索功能
            maximumSelectionLength: this.options.dictMaxLength
        });
        //设置默认值
        if (this.options.value) {
            selectTag.select2({
                initSelection: function (element, callback) {
                    var valArr = this.options.value.split(",");
                    var optionsData = [];
                    for (var i = 0; i < valArr.length; i++) {
                        var text = selectTag.find("option[value='" + valArr[i] + "']").text();
                        optionsData.push({id: valArr[i], text: text});
                    }
                    callback(optionsData);
                }.bind(this)
            });
        }
    };

    /**
     * model弹层html构造函数
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _dictModelConstructor = function (data) {
        var html = [];
        html.push('<div class="modal iframe-body" data-backdrop="static" id="' +
            'modal' + this.options.showId + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
            '<div class="modal-dialog"><div class="modal-content ph25"><div class="modal-header br-n pt10 pn">' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">&times;' +
            '</button><h5 href="javascript:void(0)" class="text-primary mbn">请选择</h5></div>' +
            '<div class="modal-body pn"><div class="model-search pt10"><input type="input" class="form-control ser-iput fs12" placeholder="支持拼音首字母／代码／汉字搜索" id="' + 'sch' + this.options.showId + '"></div>');
        if (this.options.dictMultiple === 'true') {
            html.push('<div id="' + 'selsp' + this.options.showId + '" class="choosed hide" ><ul class="choosed-ul fs12 pn text-left mnw700"></ul></div>');
        }
        if (!this.options.parentName && (!this.options.inCommonUse || this.options.inCommonUse === 'true')) {
            var userDict = data.userDict;
            //常用项
            html.push(_useDict.call(this, userDict));
        } else {
            html.push('<div id="' + 'dit' + this.options.showId + '"></div>');
        }

        html.push('<div class="treeSearch clear-bh nano pt15 mh-300 fs14"><div class="row nano-content"><div class="col-md-12">' +
            '<div id="' + 'view' + this.options.showId + '"></div></div></div></div>' +
            '<div class="modal-footer br-t-n bg-white lighter ptn">' +
            '<button type="button" id="' + 'subtn' + this.options.showId + '" class="btn btn-primary ph20">确定</button>' +
            '<button type="button" class="btn btn-default ph20" data-dismiss="modal">关闭</button>' +
            '</div></div></div>');
        return html.join('');
    };


    //常用项
    var _useDict = function (userDict) {
        if (userDict) {
            var html = [];
            var jsonKeys = [], jsonValues = [];
            for (var key in userDict) {
                jsonKeys.push(key);
                jsonValues.push(userDict[key]);
            }
            if (jsonKeys.length > 0) {
                html.push('<div class="common-choose clear-bh" id="' + 'dit' + this.options.showId + '"><h6 class="fs10">常用项</h6><ul class="choosed-ul fs12 pn text-center mnw700">');
                var jsonKeysLen = 0;
                if (jsonKeys.length > 10) {
                    jsonKeysLen = 10;
                } else {
                    jsonKeysLen = jsonKeys.length;
                }
                for (var j = 0; j < jsonKeysLen; j++) {
                    var jsonValArr = jsonValues[j].split("_");
                    var jsonTag;
                    //处理描述
                    if(jsonValArr[1]){
                        jsonTag = jsonValArr[0] + '(' + jsonValArr[1]+ ')';
                    }else{
                        jsonTag = jsonValArr[0];
                    }
                    html.push('<li class="pull-left mb5 posr mr20 btn-info btn btn-alt item-active mn ph5 btn-gradient pv5" title="' + jsonTag + '" dictVal = "'+jsonValArr[0]+'" dictKey = "' + jsonKeys[j] + '">' +
                        '<span class="w100 text-ellipsis ph5 text-primary">' + jsonValArr[0] + '</span></li>');
                }
                html.push('</ul></div>');
            } else {
                html.push('<div class="common-choose clear-bh" id="' + 'dit' + this.options.showId + '"></div>');
            }
            return html.join('');
        } else {
            return '<div class="common-choose clear-bh" id="' + 'dit' + this.options.showId + '"></div>';
        }
    };

    /**
     * 字典树形 redis  key
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _getParamKey = function () {
        return this.options.dictName + ':' + this.options.dictName + ';' + (this.options.parentKey === '' ? null : this.options.parentKey) + ';' + (this.options.selectParent === '' ? null : this.options.selectParent) + (this.options.selectChildren === '' ? null : this.options.selectChildren) + (this.options.parentName === '' ? null : this.options.parentName) + (this.options.dictAbolish === '' ? null : this.options.dictAbolish) + (this.options.ifStatistic === '' ? null : this.options.ifStatistic) + (this.options.userLevel === '' ? null : this.options.userLevel);
    };

    /**
     * 清空联动字典
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _clearChildVal = function () {
        /*if (this.options.oldValue != $('#' + this.options.id).val()) {
            $('input[parentName="' + this.options.name + '"]').each(function () {
                var $this = $(this);
                var hiddenId = $this[0]['id'].replace('hidden', '');
                $this.val('');
                $('#' + hiddenId).val('');
            });
        }*/
    };

    /**
     * 点击常用字典方法
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _getDictVal = function (event) {
        var _options = event.data;
        var _this = this;
        var selectId = $('#selsp' + _options.showId);
        var optionsId = $('#' + _options.id);
        if (_options.oldValue != $(_this).parent().attr('dictKey')) {
            $('input[parentName="' + _options.name + '"]').each(function () {
                var $this = $(this);
                var hiddenId = $this[0]['id'].replace('hidden', '');
                $this.val('');
                $('#' + hiddenId).val('');
            });
        }

        if (_options.parentName) {
            $('input[name="' + _options.parentName + '"]').each(function () {
                /**--生成两个字典代码联动代码start--**/
                if (_options.showKey && _options.defaultKey && _options.parentName) {
                    var showKeyArr = _options.showKey.split(",");
                    var defaultKeyArr = _options.defaultKey.split(",");
                    if (defaultKeyArr != null) {
                        var showTemp = showKeyArr;
                        var deftTemp = defaultKeyArr;
                        //判断defaultKeyArr是否存在
                        for (var i = 0; i < deftTemp.length; i++) {
                            if ($(this).val() === deftTemp[i]) {
                                optionsId.attr('parentKey', showTemp[i]);
                                return false;
                            } else {
                                optionsId.attr('parentKey', '');
                            }
                        }
                    }
                } else {

                    if ($(this).val() === '') {
                        optionsId.attr('parentKey', '');
                        return false;
                    } else {
                        if ($(this).attr('dictName') != optionsId.attr('dictName')) {
                            var dictRelationId = $(this).attr('dictName');
                            dictRelationId += '-';
                            dictRelationId += optionsId.attr('dictName');
                            dictRelationId += '-' + $(this).val();
                            optionsId.attr('parentKey', dictRelationId);
                            optionsId.attr('dictRelationId', 'true');
                            return false;
                        } else {
                            optionsId.attr('parentKey', $(this).val());
                            optionsId.attr('dictRelationId', '');
                            return false;
                        }
                    }
                }
            });
        }

        if (_options.dictMultiple && _options.dictMultiple == 'true') {
            $('#subtn' + _options.showId).prop('disabled', false);
            if (_options.dictMaxLength && _options.dictMaxLength == '0') {
                if ($('#selsp' + _options.showId + ' ul li').size() == _options.dictMaxLength) {
                    _show_stack_custom(_options.dictMaxLength);
                    return;
                }
            }
            selectId.removeClass('hide');

            var spanNodeId =  parseInt(Math.random()*1000000000000);
            var nodeCode = $(_this).parent().attr('dictKey');
            var objSpanLi = {
                expandibleTree : _expandibleTree,
                selectSpan : '#selsp' + _options.showId,
                nodeCode : nodeCode
            };
            _expandibleTree.treeview('checkNode', [_findDisabledNodes(nodeCode, _expandibleTree)]);
            $('#' + spanNodeId).off('click.dictEvent').on('click.dictEvent', objSpanLi, _removeLi);
            //加入到redis缓存
            var redisNode = {
                code : nodeCode,
                text : $(_this).parent().attr('title'),
                options : _options
            };
            _insertDictRedis(redisNode);
        } else {
            optionsId.val($(_this).parent().attr('dictKey'));
            optionsId.attr('hidVal', $(_this).parent().attr('dictVal'));
            $('#' + _options.showId).val($(_this).parent().attr('dictVal')).trigger('change');
            //增加tips
            $('#' + _options.showId).attr('title',$(_this).parent().attr('dictVal'));
            //描述标识
            _descMark.call(this, $(_this).parent().attr('dictVal'), _options);
            //加入到redis缓存
            var redisNode = {
                code : $(_this).parent().attr('dictKey'),
                text:$(_this).parent().attr('title'),
                options : _options
            };
            _insertDictRedis(redisNode);
            //字典是否必填
            if(_options.dictRequired && _options.dictRequired == 'true'){
                _dictRequired.call(this,$(_this).parent().attr('dictKey'),_options);
            }else {
                $('#modal' + _options.showId).modal('hide');
            }
        }
    };

    /**
     * 保存方法
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _submit = function () {
        var idSelector = $('#' + this.options.id),
            showIdSelector = $('#' + this.options.showId),
            requiredCode;
        if (this.options.dictMultiple === 'true') {
            /**--拼接多选保存方法start--**/
            var temp = $('#selsp' + this.options.showId + ' ul li');
            if (temp.size() > 0) {
                var valueLi = '';
                var keyLi = '';
                temp.each(function () {
                    keyLi += $(this).attr('code') + ',';
                    valueLi += $(this).attr('title') + ',';
                });
                if (valueLi != '') {
                    valueLi = valueLi.substring(0, valueLi.length - 1);
                    keyLi = keyLi.substring(0, keyLi.length - 1);
                    idSelector.val(keyLi).attr('hidVal', valueLi);
                    showIdSelector.val(valueLi).trigger('change');
                    //增加tips
                    showIdSelector.attr('title',valueLi);
                    //字典必填赋值
                    requiredCode = keyLi;
                    //描述标识
                    _descMark.call(this,valueLi);
                }
            } else {
                idSelector.val('').attr('hidVal', '');
                showIdSelector.val('').trigger('change');
                //清除tips
                showIdSelector.removeAttr('title');
                //字典必填赋值
                requiredCode = null;
                //描述标识
                _descMark.call(this,null);
            }
        } else {
            //判断是否清空字典
            if (idSelector.attr('emptyVal') != null) {
                showIdSelector.val(showIdSelector.attr('hidVal')).trigger('change');
                //增加tips
                showIdSelector.attr('title',showIdSelector.attr('hidVal'));
                //字典必填赋值
                requiredCode = idSelector.val();
                //描述标识
                _descMark.call(this, showIdSelector.attr('hidVal'));
            } else {
                idSelector.attr('hidVal', '').val('');
                showIdSelector.attr('hidVal', '').val('').trigger('change');
                //清除tips
                showIdSelector.removeAttr('title');
                //字典必填赋值
                requiredCode = null;
                //描述标识
                _descMark.call(this, null);
            }
        }
        //字典选择必填
        if(this.options.dictRequired && this.options.dictRequired == 'true'){
            _dictRequired.call(this,requiredCode);
        }else{
            $('#modal' + this.options.showId).modal('hide');
        }
        //清空子节点值
        _clearChildVal.call(this);
        //隐藏提示项
        $('#skeyUp' + this.options.showId).hide();
    };

    /**
     * 字典单击事件
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _dictCommClick = function () {
        if (this.$el.attr('dictReadonly') == 'true') {
            return;
        }

        var showKeyArr, defaultKeyArr, jsonObjArr,
            linkage = false,
            idSelector = $('#' + this.options.id);

        this.options.oldValue = idSelector.val();

        //删除字典清空标识
        idSelector.removeAttr('emptyVal');

        if (this.options.showKey && this.options.defaultKey && this.options.parentName) {
            linkage = true;
            try {
                showKeyArr = this.options.showKey.split(',');
                defaultKeyArr = this.options.defaultKey.split(',');
            } catch (e) {
                console.warn(e);
            }
        }

        //是否弹出子级提示名称
        var parentNameRead = false;
        var parentNameVal = "";

        $('#sch' + this.options.showId).val('');

        var tags = this.options.dictMultiple === 'true';

        if (!this.options.parentName) {
            idSelector.attr('parentKey', this.options.parentKey);
        } else {
            $('input[name="' + this.options.parentName + '"]').each(function () {
                var $this = $(this);
                if (linkage) {
                    if (defaultKeyArr) {
                        //判断defaultKeyArr是否存在
                        for (var i = 0; i < defaultKeyArr.length; i++) {
                            if ($this.val() === defaultKeyArr[i]) {
                                idSelector.attr('parentKey', showKeyArr[i]);
                            } else {
                                idSelector.attr('parentKey', '');
                            }
                        }
                    }
                } else {
                    if ($this.val() === '') {
                        parentNameRead = true;
                        parentNameVal = $this.parent().prev().text();
                        idSelector.attr('parentKey', '');
                    } else {
                        if ($this.attr('dictName') != idSelector.attr('dictName')) {
                            var dictRelationId = $this.attr('dictName') + '-' + idSelector.attr('dictName') +
                                '-' + $this.val();
                            idSelector.attr('parentKey', dictRelationId).attr('dictRelationId', 'true');
                        } else {
                            idSelector.attr('parentKey', $this.val()).attr('dictRelationId', '');
                        }
                    }
                }
            });
        }

      /*  if (parentNameRead) {
            if (!parentNameVal) {
                parentNameVal = "父节点";
            }
            layer.msg('请先选择' + parentNameVal, {icon: 7});
            return;
        }*/

        var params = {
            rootKey: this.options.dictName,
            parentKey: idSelector.attr('parentkey'),
            paramKey: this.options.paramKey,
            paramKeySearch: this.options.paramKeySearch,
            selectParent: this.options.selectParent,
            selectChildren: this.options.selectChildren,
            dictRelationId: idSelector.attr('dictRelationId'),
            dictAbolish: this.options.dictAbolish,
            dictRole: this.options.dictRole,
            ifStatistic : this.options.ifStatistic,
            userLevel : this.options.userLevel
        };

        if (!this.options.parentName) {
            params.useFlag = '1';
        }
        //读取常用通用项
        $.ajax({
            url: $ctx + '/dict/dict/getUseDictRelation',
            type: 'post',
            data: JSON.stringify(params),
            contentType: 'application/json',
            success: function (data) {
                if (data && Object.keys(data).length > 0) {
                    if (!this.options.inCommonUse || this.options.inCommonUse === 'true') {
                        $('#dit' + this.options.showId).attr('id', 'ditHidden' + this.options.showId);
                        $('#ditHidden' + this.options.showId).after(_useDict.call(this, data));
                        $('#ditHidden' + this.options.showId).remove();
                        //重新绑定事件
                        $("#dit" + this.options.showId + " ul li span").off('click.dictEvent').on("click.dictEvent", this.options, _getDictVal);
                    }
                }
            }.bind(this)
        }).then(function () {
            $.ajax({
                url: $ctx + '/dict/dict/getSysDict',
                type: 'post',
                data: JSON.stringify(params),
                contentType: 'application/json',
                success: function (data) {
                    jsonObjArr = data;
                    _expandibleTree = $('#view' + this.options.showId).treeview({
                        data: data,
                        levels: 1,
                        showCheckbox: tags,
                        showTags: true,
                        showIcon: false,
                        selectedBackColor: '#fff',
                        onhoverColor: '#fff',
                        searchResultColor: '#4a89dc',
                        selectedColor: '#4a89dc',
                        onNodeChecked: _onNodeChecked.bind(this),
                        onNodeUnchecked: _onNodeUnchecked.bind(this),
                        onNodeSelected: _onNodeSelected.bind(this)
                       // onNodeUnselected: _onNodeUnselected.bind(this)
                    });
                    /**--选中默认选中项start--**/
                    if (this.options.dictMultiple === 'true') {
                        var mtpId = idSelector.val();
                        $('#selsp' + this.options.showId + ' ul li').remove();
                        if (mtpId != '') {
                            var mtpArr = mtpId.split(',');
                            for (var i = 0; i < mtpArr.length; i++) {
                                _expandibleTree.treeview('checkNode', [_findDisabledNodes(mtpArr[i], _expandibleTree)]);
                            }
                        }
                    }
                    /**--选中默认选中项end--**/
                    $('#sch' + this.options.showId).on('keyup', {
                        tags: tags,
                        jsonObjArr: jsonObjArr
                    }, _findExpandibleNodess.bind(this));

                    _customDblClickFun(this.options);

                    $('#modal' + this.options.showId).modal();
                }.bind(this)
            }).then(function () {
                $.ajax({
                    url: $ctx + '/dict/dict/getSearchSysDict',
                    type: 'post',
                    data: JSON.stringify(params),
                    dataType:'json',
                    contentType: 'application/json',
                    success: function (data) {
                        _searchJsonArr = data;
                    }.bind(this)
                });
            });
        }.bind(this));
    }
    
    //文本框搜索事件
    var _dictCommKeyUp = function (event) {

        if(event.keyCode != 38 && event.keyCode != 40 && event.keyCode != 13) {
           if (this.$el.val()) {
               var showKeyArr, defaultKeyArr, jsonObjArr,
                   linkage = false,
                   idSelector = $('#' + this.options.id);

               this.options.oldValue = idSelector.val();

               //删除字典清空标识
               idSelector.removeAttr('emptyVal');

               if (this.options.showKey && this.options.defaultKey && this.options.parentName) {
                   linkage = true;
                   try {
                       showKeyArr = this.options.showKey.split(',');
                       defaultKeyArr = this.options.defaultKey.split(',');
                   } catch (e) {
                       console.warn(e);
                   }
               }

               //是否弹出子级提示名称
               var parentNameRead = false;
               var parentNameVal = "";

               $('#sch' + this.options.showId).val('');


               if (!this.options.parentName) {
                   idSelector.attr('parentKey', this.options.parentKey);
               } else {
                   $('input[name="' + this.options.parentName + '"]').each(function () {
                       var $this = $(this);
                       if (linkage) {
                           if (defaultKeyArr) {
                               //判断defaultKeyArr是否存在
                               for (var i = 0; i < defaultKeyArr.length; i++) {
                                   if ($this.val() === defaultKeyArr[i]) {
                                       idSelector.attr('parentKey', showKeyArr[i]);
                                   } else {
                                       idSelector.attr('parentKey', '');
                                   }
                               }
                           }
                       } else {
                           if ($this.val() === '') {
                               parentNameRead = true;
                               parentNameVal = $this.parent().prev().text();
                               idSelector.attr('parentKey', '');
                           } else {
                               if ($this.attr('dictName') != idSelector.attr('dictName')) {
                                   var dictRelationId = $this.attr('dictName') + '-' + idSelector.attr('dictName') +
                                       '-' + $this.val();
                                   idSelector.attr('parentKey', dictRelationId).attr('dictRelationId', 'true');
                               } else {
                                   idSelector.attr('parentKey', $this.val()).attr('dictRelationId', '');
                               }
                           }
                       }
                   });
               }

              /* if (parentNameRead) {
                   if (!parentNameVal) {
                       parentNameVal = "父节点";
                   }
                   layer.msg('请先选择' + parentNameVal, {icon: 7});
                   this.$el.val("");
                   return;
               }*/

               var params = {
                   rootKey: this.options.dictName,
                   parentKey: idSelector.attr('parentkey'),
                   paramKey: this.options.paramKey,
                   paramKeySearch: this.options.paramKeySearch,
                   selectParent: this.options.selectParent,
                   selectChildren: this.options.selectChildren,
                   dictRelationId: idSelector.attr('dictRelationId'),
                   dictAbolish: this.options.dictAbolish,
                   dictKeyUp: "1",
                   dictKeyUpVal: this.$el.val(),
                   dictRole: this.options.dictRole,
                   ifStatistic : this.options.ifStatistic,
                   userLevel : this.options.userLevel
               };

               $.ajax({
                   url: $ctx + '/dict/dict/getSearchKeyUpSysDict',
                   type: 'post',
                   contentType: 'application/json;charse=UTF-8',
                   data: JSON.stringify(params),
                   dataType: 'json',
                   success: function (data) {
                       if (data && data.length > 0) {
                           var html = '<ul class="pln curdef mbn">';
                           for (var i = 0; i < data.length; i++) {
                               html += '<li class="pl10 ellipsis-element" code = ' + data[i].dictKey + '>' + data[i].dictValue1 + '</li>';
                           }
                           html += '</ul>';
                           $('#skeyUp' + this.options.showId).html(html);
                           // var twidth = this.$el.innerWidth();
                           $('#skeyUp' + this.options.showId).width(this.$el.innerWidth());
                           $('#skeyUp' + this.options.showId).show();
                           var curr = this;
                           $('#skeyUp' + this.options.showId + ' ul li').on("click", function () {
                               var idSelector = $('#' + curr.options.id);
                               var liThis = $(this);
                               idSelector.val(liThis.attr("code"));
                               idSelector.attr('hidVal', liThis.text());
                               $('#' + curr.options.showId).val(liThis.text()).trigger('change');
                               //增加tips
                               $('#' + curr.options.showId).attr('title', liThis.text());
                               //描述标识
                               _descMark.call(curr, liThis.text());
                               idSelector.attr('emptyVal', '1');
                               //字典是否必填
                               if (curr.options.dictRequired && curr.options.dictRequired == 'true') {
                                   _dictRequired.call(curr, liThis.attr("code"));
                               }
                               //清空子节点值
                               _clearChildVal.call(curr);
                               $('#skeyUp' + curr.options.showId).hide();
                               $('#skeyUp' + curr.options.showId + ' ul').remove();
                           });
                       } else {
                           //清空字典方法
                           //_clearHisignDict.call(this);
                           $('#skeyUp' + this.options.showId).hide();
                           $('#skeyUp' + this.options.showId + ' ul').remove();
                       }
                   }.bind(this)
               });
           } else {
               //清空字典方法
               _clearHisignDict.call(this);
               $('#skeyUp' + this.options.showId).hide();
               $('#skeyUp' + this.options.showId + ' ul').remove();
           }
       }
    };
    
    
    //上下回车选择
    var _dictCommKeyDown = function (event) {
        var upDownClickNum = $('#skeyUp' + this.options.showId + ' ul .searchBackgroud').length;
        if ($('#skeyUp' + this.options.showId).css("display") == "block") {
            //38:上  40:下
            if (event.keyCode == 38) {
                if (upDownClickNum < 1) {
                    $('#skeyUp' + this.options.showId + ' ul li:last').css({ "background": "#f0f0f0" }).addClass("searchBackgroud");
                } else {
                    $('#skeyUp' + this.options.showId + ' .searchBackgroud').removeClass("searchBackgroud").css({ "background": "" }).prev().addClass("searchBackgroud").css({ "background": "#f0f0f0" });
                }
                _stopDefault(event);
            } else if (event.keyCode == 40) {
                if (upDownClickNum < 1) {
                    $('#skeyUp' + this.options.showId + ' ul li:first').css({ "background": "#f0f0f0" }).addClass("searchBackgroud");
                } else {
                    $('#skeyUp' + this.options.showId + ' .searchBackgroud').removeClass("searchBackgroud").css({ "background": "" }).next().addClass("searchBackgroud").css({ "background": "#f0f0f0" });
                }
                _stopDefault(event);
            } else if (event.keyCode == 13) {
                //回车
                var skLi = $('#skeyUp' + this.options.showId + ' .searchBackgroud');
                if(skLi){
                    var idSelector = $('#' + this.options.id);
                    idSelector.val(skLi.attr("code"));
                    idSelector.attr('hidVal', skLi.text());
                    $('#' + this.options.showId).val(skLi.text()).trigger('change');
                    //增加tips
                    $('#' + this.options.showId).attr('title', skLi.text());
                    //描述标识
                    _descMark.call(this, skLi.text());
                    idSelector.attr('emptyVal', '1');
                    //字典是否必填
                    if (this.options.dictRequired && this.options.dictRequired == 'true') {
                        _dictRequired.call(this, skLi.attr("code"));
                    }
                    //清空子节点值
                    _clearChildVal.call(this);
                    $('#skeyUp' + this.options.showId).hide();
                }
            }
            upDownClickNum++;
        }
    };


    //阻止事件执行
    var _stopDefault = function (e) {
        //阻止默认浏览器动作(W3C)
        if (e && e.preventDefault) {
            //火狐的 事件是传进来的e
            e.preventDefault();
        }
        //IE中阻止函数器默认动作的方式
        else {
            //ie 用的是默认的event
            event.returnValue = false;
        }
    };

    //文本框获得焦点
    var _dictCommFocus = function () {
        $('.content-search-keyup').hide();
        $('.content-search-keyup ul').remove();
    };

    //文本框失去焦点事件
    var _dictCommBlur = function () {
        if(this.$el.val()){
            var dictThis = this;
            var flag = false;
            if( $('#skeyUp' + this.options.showId + ' ul li').size() > 0){
                $('#skeyUp' + this.options.showId + ' ul li').each(function () {
                    if($(this).text() == dictThis.$el.val()){
                        var idSelector = $('#' + dictThis.options.id);
                        // if (!this.options.dictMultiple || this.options.dictMultiple == 'false') {
                        idSelector.val($(this).attr("code"));
                        idSelector.attr('hidVal', $(this).text());
                        $('#' + dictThis.options.showId).val($(this).text()).trigger('change');
                        //增加tips
                        $('#' + dictThis.options.showId).attr('title',$(this).text());
                        //描述标识
                        _descMark.call(dictThis, $(this).text());
                        idSelector.attr('emptyVal', '1');
                        //字典是否必填
                        if(dictThis.options.dictRequired && dictThis.options.dictRequired == 'true'){
                            _dictRequired.call(dictThis,$(this).attr("code"));
                        }
                        // }
                        $('#skeyUp' + dictThis.options.showId).hide();
                        $('#skeyUp' + dictThis.options.showId + 'ul').remove();
                        //清空子节点值
                        _clearChildVal.call(dictThis);
                        flag = true;
                        return;
                    }
                });
                if(!flag){
                    //如果没有对应的字典，清空该字典
                    _clearHisignDict.call(dictThis);
                    //清空子节点值
                    _clearChildVal.call(dictThis);
                }
            }else{
               // var msgDict;
                $.ajax({
                    url: $ctx + "/dict/dict/findDictMatching",
                    type: "post",
                    data: {
                        "dictVal": this.$el.val(),
                        "rootKey":this.options.dictName
                    },
                    dataType: "json",
                    /*beforeSend: function () {
                        msgDict = layer.load(3);
                    },
                    complete: function () {
                        layer.close(msgDict);
                    },*/
                    success: function (data) {
                        if(data != 'success'){
                            _clearHisignDict.call(this);
                            //清空子节点值
                            _clearChildVal.call(this);
                        }
                    }.bind(this)
                })
            }
        }else{
            _clearHisignDict.call(this);
            //清空子节点值
            _clearChildVal.call(this);
        }

    };

    /**
     * 清空字典事件
     * @author liuhuan
     * @date 2016年8月26日 上午11:43:50
     */
    var _clearHisignDict = function () {
        if (this.$el.attr('dictReadonly') == 'true') {
            return;
        }
        $("#" + this.options.id).val("");
        $("#" + this.options.id).removeAttr("hidval");
        $("#" + this.options.showId).val("").trigger('change');
        //清空tips
        $("#" + this.options.showId).removeAttr("title");
        //清空标识
        _descMark.call(this, null);
        //清除子节点
        $('input[parentName="' + this.options.name + '"]').each(function () {
            /*var $this = $(this);
            var hiddenId = $this[0]['id'].replace('hidden', '');
            $this.val('');
            $('#' + hiddenId).val('').trigger('change');
            //清空tips
            $('#' + hiddenId).removeAttr("title");*/
        });
        //清空必填
        if(this.options.dictRequired && this.options.dictRequired == 'true'){
            _dictRequired.call(this,null);
        }
    };

    /**
     * 字典搜索方法
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _findDisabledNodes = function (nodeCode, checkableTree) {
        return checkableTree.treeview('searchCode', [nodeCode, {ignoreCase: false, exactMatch: false}]);
    };

    /**
     * 字典搜索方法
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _findExpandibleNodess = function (e) {
        var selectNode = $('#sch' + this.options.showId).val();
        var queryResult3;
        if (selectNode) {
            //只搜索前500条数据
            queryResult3 = Enumerable.From(_searchJsonArr).Where("str => str.text.indexOf('" + selectNode + "') !=-1 || " +
                "str.code.indexOf('" + selectNode + "') !=-1 || " +
                " str.py.toUpperCase().indexOf('" + selectNode + "') !=-1 || " +
                " str.py.toLowerCase().indexOf('" + selectNode + "') !=-1").Take(500).ToArray();
        } else {
            queryResult3 = e.data.jsonObjArr;
        }
         _searchTree = $('#view' + this.options.showId).treeview({
            data: queryResult3,
            levels: 1,
            showCheckbox: e.data.tags,
            showIcon: false,
            showTags: true,
            resultShow:true,
            resultCount:100,
            selectedBackColor: '#fff',
            onhoverColor: '#fff',
            searchResultColor: '#4a89dc',
            selectedColor: '#4a89dc',
            onNodeChecked: _onNodeChecked.bind(this),
            onNodeUnchecked: _onNodeUnchecked.bind(this),
            onNodeSelected: _onNodeSelected.bind(this)
           // onNodeUnselected: _onNodeUnselected.bind(this)
        });

        _customDblClickFun(this.options);

        if (this.options.dictMultiple === 'true') {
            var temp = $('#selsp' + this.options.showId + ' ul li');
            if (temp.size() > 0) {
                temp.each(function () {
                    _searchTree.treeview('checkNode', [_findDisabledNodes($(this).attr("code"), _searchTree)]);
                });
            }
        }
    };

    /**
     * onNodeChecked事件
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _onNodeChecked = function (event, node) {
        if (this.options.selectParent == 'true' && this.options.selectChildren == 'true') {
            _onNodeCheckedRepeat.call(this, node);
        }
        if (this.options.selectParent == 'true') {
            if (node.ifChild == '0') {
                _onNodeCheckedRepeat.call(this, node);
            }
        } else if (this.options.selectChildren == 'true') {
            if (node.ifChild != '0') {
                _onNodeCheckedRepeat.call(this, node);
            }
        } else {
            _onNodeCheckedRepeat.call(this, node);
        }
    };

    // onNodeChecked复用方法
    var _onNodeCheckedRepeat = function (node) {
        if (this.options.dictMaxLength && this.options.dictMaxLength != '0') {
            if ($('#selsp' + this.options.showId + ' ul li').size() == this.options.dictMaxLength) {
                _show_stack_custom(this.options.dictMaxLength);
                _expandibleTree.treeview('uncheckNode', [_findDisabledNodes(node.code, _expandibleTree)]);
                return;
            }
        }

        var flag = false;
        $('#selsp' + this.options.showId + ' ul li').each(function () {
            if($(this).attr("code") == node.code){
                flag = true;
                return;
            }
        });
        if(!flag){
            $('#subtn' + this.options.showId).prop('disabled', false);
            $('#selsp' + this.options.showId).removeClass('hide');
            var nodeId = this.options.showId + node.nodeId;
            var html = '<li class="choosed-li pull-left mb5 posr p5 btn-danger mr20 pl5 pr10" code=' + node.code + ' title= ' + _splitDictVal(node.text) + '><span class="w100 text-ellipsis pl5 pr10">' + _splitDictVal(node.text) + '</span><i id="' + nodeId + '" class="close-choosed posb glyphicons glyphicons-remove_2"></i></li>';
            $('#selsp' + this.options.showId + ' ul').append(html);
            var objSpanLi = {
                expandibleTree : _expandibleTree,
                selectSpan : 'selsp' + this.options.showId,
                //nodeId : node.nodeId
                nodeCode:node.code
            };
            $('#' + nodeId).off('click.dictEvent').on('click.dictEvent', objSpanLi, _removeLi);
        }
    };


    //将常用的添加到缓存中
    var _insertDictRedis = function (node) {
        var idSelector = $("#" + node.options.id);
        var nodeTextArr = node.text.split('(');
        if(nodeTextArr[1]){
            node.tag = nodeTextArr[1].split(')')[0];
            node.text = nodeTextArr[0];
        }
        $.ajax({
            url: $ctx + '/dict/dict/insertDictRedis',
            type: 'post',
            data: {
                "options": JSON.stringify(node.options),
                "parentKey": idSelector.attr('parentkey'),
                "dictRelationId": idSelector.attr('dictRelationId'),
                "dictKey": node.code,
                "dictValue": node.text,
                "tag": node.tag
            }
        });
    };


    /**
     * onNodeUnchecked事件
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _onNodeUnchecked = function (event, node) {
        if (this.options.selectParent == 'true' && this.options.selectChildren == 'true') {
            _onNodeUncheckedRepeat.call(this, node);
        }
        if (this.options.selectParent == 'true') {
            if (node.ifChild == '0') {
                _onNodeUncheckedRepeat.call(this, node);
            }
        } else if (this.options.selectChildren == 'true') {
            if (node.ifChild != '0') {
                _onNodeUncheckedRepeat.call(this, node);
            }
        } else {
            _onNodeUncheckedRepeat.call(this, node);
        }
    };

    // onNodeUnchecked复用方法
    var _onNodeUncheckedRepeat = function (node) {
        /**--删除li选中项 start--**/
        $('#subtn' + this.options.showId).prop('disabled', false);
        var temp = $('#selsp' + this.options.showId + ' ul li');
        temp.each(function () {
            var $this = $(this);
            if ($this.attr('title') === _splitDictVal(node.text)) {
                $this.remove();
            }
        });
        if (temp.size() === 0) {
            $('#selsp' + this.options.showId).addClass('hide');
        }
        /**--删除li选中项 end--**/
    };

    /**
     * onNodeSelected事件
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _onNodeSelected = function (event, node) {
        if (this.options.selectParent == 'true' && this.options.selectChildren == 'true') {
            _onNodeSelectedRepeat.call(this, node);

        } else if (this.options.selectParent == 'true') {
            if (node.ifChild == '0') {
                _onNodeSelectedRepeat.call(this, node);
            }
        } else if (this.options.selectChildren == 'true') {
            if (node.ifChild != '0') {
                _onNodeSelectedRepeat.call(this, node);
            }
        } else {
            _onNodeSelectedRepeat.call(this, node);
        }
    };

    //_onNodeSelected复用方法
    var _onNodeSelectedRepeat = function (node) {
        var idSelector = $('#' + this.options.id);
        $('#subtn' + this.options.showId).prop('disabled', false);
        if (!this.options.dictMultiple || this.options.dictMultiple == 'false') {
            $('#' + this.options.showId).attr('hidVal', _splitDictVal(node.text));
            idSelector.val(node.code);
            idSelector.attr('hidVal', _splitDictVal(node.text));
            //是否清空标识
            idSelector.attr('emptyVal', '1');
        }
        /**--多选是否启用--**/
        if (this.options.dictMultiple === 'true') {
            _expandibleTree.treeview('checkNode', [_findDisabledNodes(node.code, _expandibleTree)]);
        }
        //将常用的添加到缓存中
        var redisNode = {
            code : node.code,
            text : _splitDictVal(node.text),
            tag : node.tags[0],
            options : this.options
        };
        _insertDictRedis(redisNode);
    };


    /**
     * onNodeUnselected事件
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
     /* var _onNodeUnselected = function (event, node) {
        if (this.options.selectParent == 'true' && this.options.selectChildren == 'true') {
            _onNodeUnselectedRepeat.call(this, node);
        }
        if (this.options.selectParent == 'true') {
            if (node.ifChild == '0') {
                _onNodeUnselectedRepeat.call(this, node);
            }
        } else if (this.options.selectChildren == 'true') {
            if (node.ifChild != '0') {
                _onNodeUnselectedRepeat.call(this, node);
            }
        } else {
            _onNodeUnselectedRepeat.call(this, node);
        }
    };*/

    //_onNodeUnselected复用方法
    var _onNodeUnselectedRepeat = function (node,options) {
        var idSelector = $('#' + options.id);
        if (!options.dictMultiple || options.dictMultiple == 'false') {
            idSelector.val(node.code);
            idSelector.attr('hidVal', _splitDictVal(node.text));
            $('#' + options.showId).val(_splitDictVal(node.text)).trigger('change');
            //增加tips
            $('#' + options.showId).attr('title',_splitDictVal(node.text));
            //描述标识
            _descMark(_splitDictVal(node.text),options);
            idSelector.attr('emptyVal', '1');
            //字典是否必填
            if(options.dictRequired && options.dictRequired == 'true'){
                _dictRequired(node.code,options);
            }else {
                $('#skeyUp' + options.showId).hide();
                $('#modal' + options.showId).modal('hide');
            }
            /**--是否启用多选end--**/
        }
        //清空子节点值
       // _clearChildVal.call(this);

    };

    /**
     * 多选删除标签项方法
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _removeLi = function (event) {
        var expandibleTree = event.data.expandibleTree;
        var selectSpan = event.data.selectSpan;
        var nodeId = event.data.nodeId;
        $(this).parent().remove();
        if (nodeId != null) {
            expandibleTree.treeview('uncheckNode', [nodeId, {silent: true}]);
        } else {
            var nodeCode = event.data.nodeCode;
            expandibleTree.treeview('uncheckNode', [_findDisabledNodes(nodeCode, expandibleTree)]);
            if(_searchTree){
                _searchTree.treeview('uncheckNode', [_findDisabledNodes(nodeCode, _searchTree)]);
            }
        }
        if ($('#' + selectSpan + ' ul li').size() === 0) {
            $('#' + selectSpan).addClass('hide');
        }
    };

    //描述标识
    var _descMark = function (text, options) {
        var _options;
        if (!this || !this.options) {
            _options = options;
        } else {
            _options = this.options;
        }
        if (_options.descMark) {
            if (text && ((text.substring(0, 2) === "其他" || text.indexOf(",其他") != -1) || (text.substring(0, 2) === "其它" || text.indexOf(",其它") != -1))) {
                $("#" + _options.descMark).prop("required", true);
                var lableText = $("#" + _options.descMark).parent().prev().text();
                if (lableText) {
                    $("#" + _options.descMark).parent().prev().html('<span class="fs4 fa fa-asterisk text-danger mr5"></span>' + lableText);
                }
            } else {
                $("#" + _options.descMark).prop("required", false);
                $("#" + _options.descMark).parent().prev().children("span").remove();
            }
        }
    };


    //最后一次触发节点Id
    var lastSelectedNodeId = null;
    //最后一次触发时间
    var lastSelectTime = null;

    /**
     * 选中节点事件
     * @author liuhuan
     * @date 2017年6月6日 下午7:52:50
     */
    var _clickNode = function (event, data,options) {
        if ( (lastSelectedNodeId || lastSelectedNodeId == 0) && lastSelectTime) {
            var time = new Date().getTime();
            var t = time - lastSelectTime;
            //如果选中和失去选中两次间隔小于300毫秒就调用业务方法
            if (lastSelectedNodeId == data.nodeId && t < 300) {
                _customBusiness(data,options);
            }
        }
        lastSelectedNodeId = data.nodeId;
        lastSelectTime = new Date().getTime();
    };

    /**
     * 自定义双击事件
     * @author liuhuan
     * @date 2017年6月6日 下午7:52:50
     */
    var _customDblClickFun = function (options) {
        //节点选中时触发
        _expandibleTree.on('nodeSelected', function(event, data) {
            _clickNode(event, data,options);
        });
        //节点取消选中时触发
        _expandibleTree.on('nodeUnselected', function(event, data) {
            _clickNode(event, data,options);
        });
    };


    /**
     * 自定义业务方法
     * @author liuhuan
     * @date 2017年6月6日 下午7:52:50
     */
    var _customBusiness = function (data,options) {
        if (options.selectParent == 'true' && options.selectChildren == 'true') {
            _onNodeUnselectedRepeat(data, options);
        }
        if (options.selectParent == 'true') {
            if (data.ifChild == '0') {
                _onNodeUnselectedRepeat(data,options);
            }
        } else if (options.selectChildren == 'true') {
            if (data.ifChild != '0') {
                _onNodeUnselectedRepeat(data,options);
            }
        } else {
            _onNodeUnselectedRepeat(data,options);
        }

    };


    var _dictRequired =function (code,options) {
        var _options;
        if (!this || !this.options) {
            _options = options;
        } else {
            _options = this.options;
        }
        //首先清空字典联动必填项
        $('*').each(function () {
            if($(this).attr('initRequired') && $(this).attr('initRequired') == _options.showId){
                $(this).removeAttr('initRequired');
                $(this).prop('required',false);
                var dictName;
                if($(this).attr("dictInit")){
                    var thisName = $(this).attr("name");
                    dictName = thisName.substring(0,thisName.length - 6);
                }else{
                    dictName = $(this).attr("name");
                }
                var labelObj = $('#'+dictName +'Label');
                if(labelObj){
                    labelObj.children('span').remove();
                }
            }
        });
        if(code){
            var msgDict;
            $.ajax({
                url: $ctx + "/dict/dict/findDictRequired",
                type: "post",
                data: {
                    "dictName": _options.dictName,
                    "code":code
                },
                dataType:"json",
                beforeSend: function () {
                    msgDict = layer.load(3);
                },
                complete: function () {
                    layer.close(msgDict);
                },
                success: function (data) {
                    if(data && data.length > 0){
                        for(var i=0;i<data.length;i++){
                            var dataVal = data[i].dictRequiredValue;
                            if(dataVal){
                                var dataArr = dataVal.split(",");
                                for(var j = 0;j < dataArr.length;j++){
                                    $("[name="+dataArr[j]+"]").each(function () {
                                        if($(this).attr('dictInit')){
                                            var id = $(this).attr('id');
                                            $('#'+id+'hidden').prop('required',true);
                                            $('#'+id+'hidden').attr('initRequired',_options.showId);
                                        }else{
                                            $(this).prop('required',true);
                                            $(this).attr('initRequired',_options.showId);
                                        }
                                        var labelObj = $('#'+$(this).attr('name') +'Label');
                                        if(labelObj && labelObj.text()){
                                            labelObj.html('<span class="fs4 fa fa-asterisk text-danger mr5"></span>' + labelObj.text());
                                        }
                                    });
                                }
                            }
                        }
                    }
                    $('#modal' + _options.showId).modal('hide');
                }.bind(this),
                error: function () {
                    layer.close(msgDict);
                    layer.msg('连接失败，请稍后重试', {
                        icon: 7
                    });
                }
            });
        }else{
        	if(_options) {
            	$('#modal' + _options.showId).modal('hide');
        	}
        }
    };


    var _splitDictVal = function (val) {
        var temp = '';
        if(val){
            temp = val.split("(")[0];
        }
        return temp;
    };

    /**
     * 多选项提示
     * @author liuhuan
     * @date 2016年5月26日 下午3:13:50
     */
    var _show_stack_custom = function (maxLength) {
        layer.msg("最多只能选择" + maxLength + "项", {icon: 7});
    };

    var HisignDict = function (el, options) {
        this.options = options;
        if (!options.id) {
            this.options.id = 'dict' + parseInt(Math.random()*1000000000000);  //(~~(Math.random()*(1<<24))).toString(16);
        }
        this.options.showId = this.options.id + 'hidden';
        this.$el = el;
        this.init();
    };

    HisignDict.DEFAULTS = {
        id: null,
        name: null,
        dictName: null,
        parentKey: null,
        value: null,
        selectParent: null,
        selectChildren: null,
        dictMultiple: null,
        parentName: null,
        dictMaxLength: null,
        inCommonUse: null,
        showKey: null,
        defaultKey: null,
        onchange: null,
        required: null,
        descMark: null,
        dictAbolish: null,
        flagType: '',
        dictInit:null,
        dictRequired:null,
        dictRole:null,
        ifStatistic:null,//字典翻译是否查询单位表
        userLevel:null,//用户级别
        mode: 'tree',
        className: 'form-control'
    };

    HisignDict.prototype.init = function () {
        $('body').on('shown.bs.modal', function () {
            $('.nano').nanoScroller();
        });
        this.initDictInput();
        this.initDictEvent();
    };

    HisignDict.prototype.initDictInput = function () {
        var html = [];
        if (this.options.mode === 'select') {
            this.options.paramKeySelect = _getParamKey.call(this) + 'Select';
            html.push('<select class="fluid-width ' + this.options.className + '" id="' + this.options.id + '" name="' + this.options.name + '"');
            if (this.options.onchange) {
                html.push(' onchange="' + this.options.onchange + '"');
            }
            //是否多选
            if (this.options.dictMultiple === 'true') {
                html.push(' multiple="multiple"');
            }
            //是否必填
            if (this.options.required === 'required') {
                html.push(' required');
            }
            //是否禁用
            if (this.$el.attr('dictReadonly') === 'true') {
                html.push(' disabled');
            }
            html.push('></select>');
            this.$el.after(html.join('')).remove();
        } else {
            this.options.paramKey = _getParamKey.call(this);
            this.options.paramKeySearch = this.options.paramKey + 'Search';
            html.push('<input type="hidden" id="' + this.options.id + '" name="' + this.options.name + '" dictName="' + this.options.dictName + '" flagType="' + this.options.flagType + '" dictInit="' + this.options.dictInit + '">');
            this.$el[0].id = this.options.showId;
            this.$el[0].name = this.options.name + 'hidden';
            //this.$el[0].readOnly = true;
            this.$el.after(html.join(''));
        }
    };

    HisignDict.prototype.initDictEvent = function () {
        if (this.options.mode === 'select') {
            $.ajax({
                type: 'POST',
                url: $ctx + '/dict/dict/findSelectJson',
                data: JSON.stringify(this.options),
                contentType: 'application/json',
                success: function (data) {
                    _selectLoad.call(this, data);
                }.bind(this)
            });
        } else {
            //增加父元素
            this.$el.wrap('<div class="input-group"></div>');
            //增加字典样式
            this.$el.after('<span class="input-group-addon closeDictBtn curpoin"><i class="glyphicons glyphicons-book"></i></span>');
            //字典清空操作
            this.$el.parents("div").children("span.inputdelte").remove();
            this.$el.after('<span class="glyphicons glyphicons-remove_2 pos-a top10 text-muted allhide curpoin dictDelte" style="right: 45px;z-index: 999;pointer-events: auto;"></span>');
            //是否只读
            if (this.$el.attr('dictReadonly') == 'true') {
                this.$el.prop("readOnly",true);
            }
            $.ajax({
                type: 'POST',
                url: $ctx + '/dict/dict/getUserDict',
                data: JSON.stringify(this.options),
                contentType: 'application/json',
                success: function (data) {
                    this.$el.parent().after(_dictModelConstructor.call(this, data));
                    $("#dit" + this.options.showId + " ul li span").off('click.dictEvent').on("click.dictEvent", this.options, _getDictVal);
                    if (this.options.value) {
                        this.$el.val(data.value);
                        $('#' + this.options.id).val(this.options.value);
                    }
                    $('#subtn' + this.options.showId).off('click.dictEvent').on('click.dictEvent', _submit.bind(this));
                    this.$el.after('<div class="content-search content-search-keyup br-a pos-a bg-white hero-plan top30 pln prn allhide" id="skeyUp'+ this.options.showId +'"  ></div>');
                    //按键搜索事件
                    this.$el.off('keyup.dictEvent').on('keyup.dictEvent', _dictCommKeyUp.bind(this));
                    //用于上下回车选择
                    this.$el.off('keydown.dictEvent').on('keydown.dictEvent', _dictCommKeyDown.bind(this));
                    //失去焦点事件
                    this.$el.off('blur.dictEvent').on('blur.dictEvent',_dictCommBlur.bind(this));
                    //获得焦点事件
                    this.$el.off('focus.dictEvent').on('focus.dictEvent',_dictCommFocus.bind(this));
                    //单击事件
                    this.$el.next().next().next().off('click.dictEvent').on('click.dictEvent', _dictCommClick.bind(this));
                    //清空方法
                    this.$el.next().next().off('click').on('click',_clearHisignDict.bind(this));
                    //鼠标移入移出显示/隐藏清空按钮
                    this.$el.parent().mouseover (function () {
                        var childrenInput = $(this).children("input[type='text']");
                        if(childrenInput.val()!= "" && (!childrenInput.attr('dictReadonly') || childrenInput.attr('dictReadonly') === 'false')){
                            $(this).find(".dictDelte").show();
                        }
                    }).mouseout(function () {
                         $(this).find(".dictDelte").hide();
                    });
                    //字典输入时是否有值
                    this.$el.keyup(function () {
                        if($(this).val()!=""){
                            $(this).siblings(".dictDelte").show();
                        }else{
                            $(this).siblings(".dictDelte").hide();
                        }
                    });

                    //描述标识
                    if(this.options.descMark){
                        _descMark.call(this, data.value,this.options);
                    }
                }.bind(this)
            });

        }
    };

    $.fn.dictCommInit = function () {
        var isReadonly = typeof arguments[0] === 'boolean' && arguments[0];
        this.each(function () {
            var $this = $(this);
            //判断字典框时候只读
            if(!$this.attr('dictReadonly')){
                $this.attr('dictReadonly', String(isReadonly));
            }
            //判断字典是否初始化过
            if ($this.attr('dictInit')) {
                return;
            }else {
                $this.attr('dictInit',true);
            }
            var options = $.extend({}, HisignDict.DEFAULTS, _optionsConstructor.call($this));
            $this.attr('dictInit',true);
            new HisignDict($this, options);
            
            // 字典联动必填
            if($this.attr('dictRequired')){
            	_dictRequired.call(this,$this.val(),options);
            }
        });
    };

    $.fn.dictCommInit.Constructor = HisignDict;
    $.fn.dictCommInit.defaults = HisignDict.DEFAULTS;


    /**
     * 字典清空方法
     */
    $.fn.dictClear = function () {
        this.each(function () {
            //获取字典类型
            var inputType = $(this).attr('type').toLowerCase();
            var tempId = $(this).attr('id');
            var id,showId;
            if(inputType == 'hidden'){
                id = tempId;
                showId = tempId + 'hidden';
            }else{
                id = tempId.replace('hidden', '');
                showId = tempId;
            }
            $('#' + id).val('');
            $('#' + showId).val('');
        });
    };

    /**
     * 字典销毁方法
     */
    $.fn.dictDestroy = function () {
        this.each(function () {
            //判断字典是否初始化过
            if ($(this).attr('dictInit')) {
                var id = $(this).attr('id');
                var name = $(this).attr('name');
                var _this = $(this);
                _this.next().remove();
                _this.next().remove();
                _this.next().remove();
                _this.next().remove();
                //删除div
                _this.parent().next().remove();
                //删除隐藏域
                _this.parent().next().remove();
                //删除上级div
                _this.unwrap();
                _this.removeAttr('dictInit');
                _this.prop('readonly',false);
                //去掉事件
                _this.off('keyup.dictEvent');
                id = id.substring(0,id.length - 6);
                name = name.substring(0,name.length - 6);
                _this.attr('name',name);
                _this.attr('id',id);
            }
        });
    };

})(window.jQuery);