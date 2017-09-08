package com.veuve.ssm.service;

import com.alibaba.fastjson.JSONObject;
import com.veuve.ssm.model.system.Menu;

import java.util.List;
import java.util.Map;

public interface MenuManagerService {

    int saveMenu(Menu menu);

    void deleteMenuById(String id);

    JSONObject findMenuList(Map<String,Object> parameter);

    Menu findMenuById(String id);

    List<Menu> findMenuListAll();

    int updateMenu(Menu menu);

}
