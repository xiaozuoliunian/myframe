package com.veuve.ssm.web.controller;

import com.veuve.ssm.common.controller.BaseController;
import com.veuve.ssm.model.system.Menu;
import com.veuve.ssm.service.MenuManagerService;
import com.veuve.ssm.service.UserManagerService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class LoginActionController extends BaseController{

    private static final Logger logger = LoggerFactory.getLogger(LoginActionController.class);

    @Autowired
    private MenuManagerService menuService;

    @RequestMapping("/login")
    public String login(){
        return "/system/login";
    }

    @RequestMapping("/shiroLogin")
    public String login(@RequestParam String username, @RequestParam String password,Model model){
        Subject currentUser = SecurityUtils.getSubject();
        if (!currentUser.isAuthenticated()){
            //将用户名和密码封装为UsernamePasswordToken对象
            UsernamePasswordToken token = new UsernamePasswordToken(username,password);
            token.setRememberMe(true);
            try {
                currentUser.login(token);
                logger.info("-------登录成功！");
            } catch (UnknownAccountException e) {
                logger.info("-------登录失败【用户不存在】");
            } catch (IncorrectCredentialsException e){
                logger.info("-------登录失败【密码错误】");
            } catch (LockedAccountException e) {
                logger.info("-------登录失败【用户已锁】");
            } catch (AuthenticationException e) {
                logger.info("-------登录失败【认证异常】");
            }
        }
        List<Menu> lists = menuService.findMenuListAll();
        model.addAttribute("menuList",lists);
        return "/system/main";
    }




}
