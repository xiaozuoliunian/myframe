package com.veuve.ssm.service;

import com.alibaba.fastjson.JSONObject;
import com.veuve.ssm.model.system.Dict;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface DictManagerService{

    int saveDictInfo(Dict dict);

    void deleteDictById(String id);

    JSONObject findDictList(Map<String,Object> parameter);

    Dict findDictByDictValue(String dictValue);

    Dict findDictById(String id);

    int updateDict(Dict dict);
}
