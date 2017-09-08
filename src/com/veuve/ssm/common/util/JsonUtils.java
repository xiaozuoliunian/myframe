package com.veuve.ssm.common.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;


/**
 * 自定义响应结构
 */
public class JsonUtils {

    /**
     * 回去bootstrap table 指定的jsonobject格式
     * @author wuxiaohua
     * @date 2016年6月20日 下午3:07:14
     * @param list 数据列表信息
     * @param total 记录总数
     * @return jsonobject
     */
    public static <T> JSONObject getBootstrapTableData(List<T> list, Integer total) {
        JSONObject results = new JSONObject();
        if (list == null) {
            list = new ArrayList<T>();
        }
        // list 转 json，包含属性为空或null 转化为''
        String str = JSONObject.toJSONString(list, SerializerFeature.WriteMapNullValue).replace("null", "''");
        // 指定row数据
        results.put("rows",JSONArray.parseArray(str));
        // 记录总数
        results.put("total", total);
        return results;
    }
}
