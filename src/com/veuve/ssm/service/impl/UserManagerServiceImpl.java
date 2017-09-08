package com.veuve.ssm.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.veuve.ssm.common.page.PageBoundsUtil;
import com.veuve.ssm.common.util.JsonUtils;
import com.veuve.ssm.dao.system.ITbUserDao;
import com.veuve.ssm.model.system.User;
import com.veuve.ssm.service.UserManagerService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service
public class UserManagerServiceImpl implements UserManagerService {

    @Resource
    public ITbUserDao userDao;

    @Override
    public void deleteUserById(String id) {
        userDao.deleteUserById(id);
    }

    @Override
    public JSONObject findUserList(Map<String, Object> parameter) {
        JSONObject result = new JSONObject();
        PageBounds bounds = PageBoundsUtil.PageBoundsOrderExtend(parameter);
        List<User> list = userDao.findUserList(bounds, parameter);
        // 获得结果集条总数
        int total = ((PageList<User>) list).getPaginator().getTotalCount();
        // 页面列表展示
        result = JsonUtils.getBootstrapTableData(list, total);
        return result;
    }

    @Override
    public User findUserByUsername(String username) {
        return userDao.findUserByUsername(username);
    }

    @Override
    public int updateUser(User user) {
        return userDao.updateUserInfo(user);
    }

    @Override
    public int saveUser(User user) {
        return userDao.saveUserInfo(user);
    }

    @Override
    public User findUserByUserId(String id) {
        return userDao.findUserByUserId(id);
    }

}
