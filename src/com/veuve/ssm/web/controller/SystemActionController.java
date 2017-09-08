package com.veuve.ssm.web.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.veuve.ssm.common.controller.BaseController;
import com.veuve.ssm.common.util.DateUtil;
import com.veuve.ssm.common.util.SequenceUtil;
import com.veuve.ssm.model.system.Dict;
import com.veuve.ssm.model.system.Menu;
import com.veuve.ssm.model.system.User;
import com.veuve.ssm.service.DictManagerService;
import com.veuve.ssm.service.MenuManagerService;
import com.veuve.ssm.service.UserManagerService;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Controller
public class SystemActionController extends BaseController{

	private static final Logger logger = LoggerFactory.getLogger(SystemActionController.class);

	@Autowired
	private UserManagerService userManagerService;

	@Autowired
	private MenuManagerService menuManagerService;

	@Autowired
	private DictManagerService dictManagerService;

	//--------------------------------------------------------------------------
    @RequestMapping("/userManager")
    public String getUserList(){
        return "/system/userList";
    }

	@RequestMapping(value = "/getUserJson", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSON findUserList(@RequestBody Map<String,Object> parameter){
		return userManagerService.findUserList(parameter);
	}

	@RequestMapping("/toUserGroupForm")
	public String addUserInfo(){
		return "/system/addUser";
	}

	@RequestMapping("/deleteUser")
	@ResponseBody
	public boolean deleteUserById(@RequestParam String id){
		if(StringUtils.isNoneBlank(id)){
			userManagerService.deleteUserById(id);
			return TRUE;
		}else{
			return FALSE;
		}
	}

	@RequestMapping(value= "/editUser", method = RequestMethod.POST)
	@ResponseBody
	public int addUser(User user, HttpServletRequest request){
		if(StringUtils.isNoneBlank(user.getId())){
			user.setCreateDate(DateUtil.getDateTime());
			return userManagerService.updateUser(user);
		}else{
			user.setId(SequenceUtil.getSequenceNo("U"));
			//shiro盐值加密
			String hashAlgorithName = "MD5";
			Object credentials = user.getPassword();
			Object salt = ByteSource.Util.bytes(user.getUserName());
			int hashIterations = 1024;
			Object result = new SimpleHash(hashAlgorithName, credentials, salt, hashIterations);
			user.setPassword(String.valueOf(result));
			user.setCreateDate(DateUtil.getDateTime());
			return this.userManagerService.saveUser(user);
		}
	}

	@RequestMapping("/getUserById")
	@ResponseBody
	public JSONObject findUserById(@RequestParam String id, HttpServletRequest request){
		JSONObject jsnObj = new JSONObject();
		User userInfo = userManagerService.findUserByUserId(id);
		jsnObj.put("userInfo", userInfo);
		return jsnObj;
	}

	//----------------------------------------------------------------------

	@RequestMapping("/menuManager")
	public String getMenuList(){
		return "/system/menuList";
	}

	@RequestMapping(value = "/getMenuJson", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSON findMenuList(@RequestBody Map<String,Object> parameter){
		if(null == parameter){
			parameter.put("order","create_date.desc");
		}
		return menuManagerService.findMenuList(parameter);
	}

	@RequestMapping("/toMenuGroupForm")
	public String addMenuInfo(){
		return "/system/addMenu";
	}

	@RequestMapping("/deleteMenu")
	@ResponseBody
	public boolean deleteMenuById(@RequestParam String id){
		if(StringUtils.isNoneBlank(id)){
			menuManagerService.deleteMenuById(id);
			return TRUE;
		}else{
			return FALSE;
		}
	}

	@RequestMapping(value= "/editMenu", method = RequestMethod.POST)
	@ResponseBody
	public int addMenu(Menu menu, HttpServletRequest request){
		if(StringUtils.isNoneBlank(menu.getId())){
			menu.setCreateDate(DateUtil.getDateTime());
			return menuManagerService.updateMenu(menu);
		}else{
			menu.setId(SequenceUtil.getSequenceNo("M"));
			menu.setCreateDate(DateUtil.getDateTime());
			return this.menuManagerService.saveMenu(menu);
		}
	}

	@RequestMapping("/getMenuById")
	@ResponseBody
	public JSONObject findMenuById(@RequestParam String id, HttpServletRequest request){
		JSONObject jsnObj = new JSONObject();
		Menu menuInfo = menuManagerService.findMenuById(id);
		jsnObj.put("menuInfo", menuInfo);
		return jsnObj;
	}

	@RequestMapping(value = "/getMenuList", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String findMenuListAll(){
		List<Menu> lists = menuManagerService.findMenuListAll();
		return JSON.toJSONString(lists);
	}

	// -------------------------------------------------------------------------------------
	@RequestMapping("/dictManager")
	public String getDictList(){
		return "/system/dictList";
	}

	@RequestMapping(value = "/getDictJson", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSON findDictList(@RequestBody Map<String,Object> parameter){
		return dictManagerService.findDictList(parameter);
	}

	@RequestMapping("/toDictGroupForm")
	public String addDictInfo(){
		return "/system/addDict";
	}

	@RequestMapping("/deleteDict")
	@ResponseBody
	public boolean deleteDictById(@RequestParam String id){
		if(StringUtils.isNoneBlank(id)){
			dictManagerService.deleteDictById(id);
			return TRUE;
		}else{
			return FALSE;
		}
	}

	@RequestMapping(value= "/editDict", method = RequestMethod.POST)
	@ResponseBody
	public int addDict(Dict dict, HttpServletRequest request){
		if(StringUtils.isNoneBlank(dict.getId())){
			dict.setCreateDate(DateUtil.getDateTime());
			return dictManagerService.updateDict(dict);
		}else{
			dict.setId(SequenceUtil.getSequenceNo("D"));
			dict.setCreateDate(DateUtil.getDateTime());
			return this.dictManagerService.saveDictInfo(dict);
		}
	}

	@RequestMapping("/getDictById")
	@ResponseBody
	public JSONObject findDictById(@RequestParam String id, HttpServletRequest request){
		JSONObject jsnObj = new JSONObject();
		Dict dictInfo = dictManagerService.findDictById(id);
		jsnObj.put("dictInfo", dictInfo);
		return jsnObj;
	}

}
