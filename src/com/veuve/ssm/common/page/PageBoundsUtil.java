package com.veuve.ssm.common.page;

import com.github.miemiedev.mybatis.paginator.domain.Order;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

import java.util.Map;

/**
 * Created by chen on 2017-07-17.
 */
public class PageBoundsUtil {
    /**
     * 再次封装Mybatis PageBounds分页对象
     * @return PageBounds分页对象
     */
    public static PageBounds PageBoundsOrderExtend(int pageOffset, int pageSize, String order) {
        PageBounds pageBounds = new PageBounds(pageOffset/pageSize +1 , pageSize , Order.formString(order));
        return pageBounds;
    }

    /**
     * 再次封装Mybatis PageBounds分页对象
     * @return PageBounds分页对象
     */
    public static PageBounds PageBoundsOrderExtend(Map<String, Object> paramMap) {
        Integer pageSize = Integer.parseInt(paramMap.get("limit").toString());
        Integer pageOffset = Integer.parseInt(paramMap.get("offset").toString());
        String order = (String) paramMap.get("order");
        if(null == pageOffset || pageOffset<0) pageOffset = 0;
        if(null == pageSize || pageSize<0) pageSize = 10;
        PageBounds pageBounds = new PageBounds(pageOffset/pageSize +1 , pageSize , Order.formString(order));
        return pageBounds;
    }
}
