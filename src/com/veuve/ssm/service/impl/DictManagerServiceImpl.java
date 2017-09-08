package com.veuve.ssm.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;
import com.veuve.ssm.common.page.PageBoundsUtil;
import com.veuve.ssm.common.util.JsonUtils;
import com.veuve.ssm.dao.system.ITbDictDao;
import com.veuve.ssm.model.system.Dict;
import com.veuve.ssm.model.system.User;
import com.veuve.ssm.service.DictManagerService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by chen on 2017-09-06.
 */
@Service
public class DictManagerServiceImpl implements DictManagerService {

    @Resource
    private ITbDictDao dictDao;

    @Override
    public int saveDictInfo(Dict dict) {
        return dictDao.saveDictInfo(dict);
    }

    @Override
    public void deleteDictById(String id) {
        dictDao.deleteDictById(id);
    }

    @Override
    public JSONObject findDictList(Map<String, Object> parameter) {
        JSONObject result = new JSONObject();
        PageBounds bounds = PageBoundsUtil.PageBoundsOrderExtend(parameter);
        List<Dict> list = dictDao.findDictList(bounds,parameter);
        // 获得结果集条总数
        int total = ((PageList<Dict>) list).getPaginator().getTotalCount();
        // 页面列表展示
        result = JsonUtils.getBootstrapTableData(list, total);
        return result;
    }

    @Override
    public Dict findDictByDictValue(String dictValue) {
        return dictDao.findDictByDictValue(dictValue);
    }

    @Override
    public Dict findDictById(String id) {
        return dictDao.findDictById(id);
    }

    @Override
    public int updateDict(Dict dict) {
        return dictDao.updateDictInfo(dict);
    }
}
