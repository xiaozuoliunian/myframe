package com.veuve.ssm.common.util;

import org.apache.commons.lang3.Validate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * Created by chen on 2017-07-13.
 * 以静态变量保存Spring ApplicationContext，可以在代码任意位置调用ApplicationContext。
 */
@Service
@Lazy(false)
public class SpringContextHolderUtil implements ApplicationContextAware,DisposableBean{

    private static Logger logger = LoggerFactory.getLogger(SpringContextHolderUtil.class);

    private static ApplicationContext applicationContext = null;

    /**
     * 取得静态变量中的ApplicationContext
     */
    public static ApplicationContext getApplicationContext(){
        assertContextInjected();
        return applicationContext;
    }

    /**
     * 获取系统根目录
     */
    public static String getRootRealPath() throws IOException {
        String rootRealPath ="";
        try {
            rootRealPath= getApplicationContext().getResource("").getFile().getAbsolutePath();
        } catch (IOException e) {
            logger.warn("获取系统根目录失败:" + e.getMessage());
        }
        return rootRealPath;
    }

    /**
     * 获取系统资源根目录
     */
    public static String getResourceRootRealPath(){
        String rootRealPath ="";
        try {
            rootRealPath=new DefaultResourceLoader().getResource("").getFile().getAbsolutePath();
        } catch (IOException e) {
            logger.warn("获取资源根目录失败：" + e.getMessage());
        }
        return rootRealPath;
    }

    /**
     * 从静态变量applicationContext中取得Bean, 自动转型为所赋值对象的类型.
     */
    @SuppressWarnings("unchecked")
    public static <T> T getBean(String name) {
        assertContextInjected();
        return (T) applicationContext.getBean(name);
    }

    /**
     * 从静态变量applicationContext中取得Bean, 自动转型为所赋值对象的类型.
     */
    public static <T> T getBean(Class<T> requiredType) {
        assertContextInjected();
        return applicationContext.getBean(requiredType);
    }

    /**
     * 清除SpringContextHolder中的ApplicationContext为Null.
     */
    public static void clearHolder() {
        if (logger.isDebugEnabled()){
            logger.debug("清除SpringContextHolder中的ApplicationContext:" + applicationContext);
        }
        applicationContext = null;
    }

    /**
     * 实现ApplicationContextAware接口, 注入Context到静态变量中.
     */
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        if (SpringContextHolderUtil.applicationContext != null) {
            logger.info("SpringContextHolder中的ApplicationContext被覆盖, 原有ApplicationContext为:" + SpringContextHolderUtil.applicationContext);
        }
        SpringContextHolderUtil.applicationContext = applicationContext;
    }

    /**
     * 实现DisposableBean接口, 在Context关闭时清理静态变量.
     */
    @Override
    public void destroy() throws Exception {
        SpringContextHolderUtil.clearHolder();
    }


    /**
     * 检查ApplicationContext不为空.
     */
    private static void assertContextInjected() {
        Validate.notNull(applicationContext,"applicaitonContext属性未注入, 请在applicationContext.xml中定义SpringContextHolder.");
    }

}
