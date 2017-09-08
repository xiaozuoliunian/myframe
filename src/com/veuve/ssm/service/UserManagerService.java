package com.veuve.ssm.service;

import com.alibaba.fastjson.JSONObject;
import com.veuve.ssm.model.system.User;

import java.util.Map;

/**
 * Created by chen on 2017-09-06.
 */
public interface UserManagerService {

    int saveUser(User user);

    void deleteUserById(String id);

    JSONObject findUserList(Map<String,Object> parameter);

    User findUserByUsername(String username);

    User findUserByUserId(String id);

    int updateUser(User user);

}
