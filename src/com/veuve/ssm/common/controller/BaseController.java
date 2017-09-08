package com.veuve.ssm.common.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by chen on 2017-07-14.
 */
public class BaseController {

    private static final Logger logger = LoggerFactory.getLogger(BaseController.class);

    /** 操作成功返回值*/
    protected final boolean TRUE = true;

    /** 操作失败返回值*/
    protected final boolean FALSE = false;

    protected HttpServletRequest request;

    protected HttpServletResponse response;

    /**
     * 设置request和response的值
     */
    @ModelAttribute
    public void setReqAndRes(HttpServletRequest request,HttpServletResponse response){
        this.request = request;
        this.response = response;
    }

    /**
     * 获得HttpservletRequest 对象
     */
    public HttpServletRequest getHttpServletRequest() {
        return request;
    }

    /**
     * 获得 HttpServletResponse 对象
     */
    public HttpServletResponse getHttpServletResponse() {
        return response;
    }

    /**
     * 获取字符串的编码
     */
    public static String getEncoding(String str) {
        String encode = "GB2312";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s = encode;
                return s;
            }
        } catch (Exception exception) {}
        encode = "ISO-8859-1";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s1 = encode;
                return s1;
            }
        } catch (Exception exception1) {}
        encode = "UTF-8";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s2 = encode;
                return s2;
            }
        } catch (Exception exception2) {}
        encode = "GBK";
        try {
            if (str.equals(new String(str.getBytes(encode), encode))) {
                String s3 = encode;
                return s3;
            }
        } catch (Exception exception3) {}
        return "";
    }
}
