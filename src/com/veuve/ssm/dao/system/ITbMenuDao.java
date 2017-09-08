package com.veuve.ssm.dao.system;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.veuve.ssm.model.system.Menu;
import com.veuve.ssm.model.system.User;

import java.util.List;
import java.util.Map;

public interface ITbMenuDao {

	int saveMenuInfo(Menu menu);

	void deleteMenuById(String id);

	Menu findMenuById(String menu);

	List<Menu> findMenuList(PageBounds bounds, Map<String, Object> parameter);

	List<Menu> findMenuListAll();

	int updateMenuInfo(Menu menu);

}
