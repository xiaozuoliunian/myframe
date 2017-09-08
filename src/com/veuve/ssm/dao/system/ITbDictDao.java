package com.veuve.ssm.dao.system;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.veuve.ssm.model.system.Dict;
import com.veuve.ssm.model.system.User;

import java.util.List;
import java.util.Map;

public interface ITbDictDao {

    int saveDictInfo(Dict dict);

    void deleteDictById(String id);

    List<Dict> findDictList(PageBounds bounds, Map<String,Object> parameter);

    Dict findDictByDictValue(String dictValue);

    Dict findDictById(String id);

    int updateDictInfo(Dict dict);
}
