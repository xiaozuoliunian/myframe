package com.veuve.ssm.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.veuve.ssm.common.page.PageBoundsUtil;
import com.veuve.ssm.common.util.JsonUtils;
import com.veuve.ssm.dao.system.ITbMenuDao;
import com.veuve.ssm.model.system.Menu;
import com.veuve.ssm.service.MenuManagerService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by chen on 2017-09-06.
 */
@Service
public class MenuManagerServiceImpl implements MenuManagerService {

    @Resource
    public ITbMenuDao menuDao;

    @Override
    public JSONObject findMenuList(Map<String, Object> parameter) {
        JSONObject result = new JSONObject();
        PageBounds bounds = PageBoundsUtil.PageBoundsOrderExtend(parameter);
        List<Menu> list = menuDao.findMenuList(bounds, parameter);
        // 获得结果集条总数
        int total = ((PageList<Menu>) list).getPaginator().getTotalCount();
        // 页面列表展示
        result = JsonUtils.getBootstrapTableData(list, total);
        return result;
    }

    @Override
    public int saveMenu(Menu menu) {
        return menuDao.saveMenuInfo(menu);
    }

    @Override
    public void deleteMenuById(String id) {
        menuDao.deleteMenuById(id);
    }

    @Override
    public int updateMenu(Menu menu) {
        return menuDao.updateMenuInfo(menu);
    }

    @Override
    public Menu findMenuById(String id) {
        return menuDao.findMenuById(id);
    }

    @Override
    public List<Menu> findMenuListAll() {
        return menuDao.findMenuListAll();
    }
}
