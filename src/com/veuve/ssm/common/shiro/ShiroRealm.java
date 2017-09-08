package com.veuve.ssm.common.shiro;

/**
 * Created by Administrator on 2017/7/8.
 */
import com.veuve.ssm.common.util.SpringContextHolderUtil;
import com.veuve.ssm.model.system.User;
import com.veuve.ssm.service.UserManagerService;
import org.apache.shiro.authc.*;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.realm.AuthenticatingRealm;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 自定义的指定Shiro验证用户登录的类
 */
public class ShiroRealm extends AuthenticatingRealm {

    private static final Logger logger = LoggerFactory.getLogger("ShiroRealm.class");

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        //1.把AuthenticationToken转换为UsernamePasswordToken
        UsernamePasswordToken upToken = (UsernamePasswordToken) token;

        //2.从UsernamePasswordToken中获取username
        String username = upToken.getUsername();

        //3.调用数据库的方法，从数据库查询username对应的用户记录
        UserManagerService dao = (UserManagerService) SpringContextHolderUtil.getApplicationContext().getBean("userManagerService");
        User user = dao.findUserByUsername(username);

        //4.若用户不存在则可以抛出UnknownAccountException异常
        if (null == user){
            throw new UnknownAccountException("用户不存在！");
        }

        //5.根据用户信息的情况，决定是否需要抛出其它的AuthenticationException异常
        if ("monster".equals(username)){
            throw new LockedAccountException("用户被锁定！");
        }

        //6.根据用户的情况来构建AuthenticationInfo对象并返回
        Object principal = username;

        Object credentials = user.getPassword().trim();
        //从父类调用当前realm的名字
        String realmName = getName();
        //获取盐值
        ByteSource credentialsSalt = ByteSource.Util.bytes(username);

        SimpleAuthenticationInfo info = null;
        info = new SimpleAuthenticationInfo(principal, credentials, credentialsSalt, realmName);
        return  info;
    }

    public static void main(String[] args){
        String hashAlgorithName = "MD5";
        Object credentials = "111111";
        Object salt = ByteSource.Util.bytes("admin");
        int hashIterations = 1024;
        Object result = new SimpleHash(hashAlgorithName, credentials, salt, hashIterations);
        System.out.println(credentials + "【MD5加密1024次结果】：" + String.valueOf(result));

    }
}