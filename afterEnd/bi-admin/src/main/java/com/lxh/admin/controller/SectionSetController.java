package com.lxh.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.lxh.admin.config.ServiceTokenRequired;
import com.lxh.admin.mapper.hospSectionMapper;
import com.lxh.admin.service.impl.HospPrivSetService;
import com.lxh.joint.Section;
import com.lxh.joint.SetHospSection;
import com.lxh.mybatis.entity.hospPriv;
import com.lxh.utils.result.Result;
import org.apache.shenyu.client.apidocs.annotations.ApiDoc;
import org.apache.shenyu.client.apidocs.annotations.ApiModule;
import org.apache.shenyu.client.springmvc.annotation.ShenyuSpringMvcClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.baomidou.mybatisplus.core.toolkit.ObjectUtils.isNotNull;

@RestController
@RequestMapping("/section")
@ShenyuSpringMvcClient("/section/**")
@ApiModule("/section")
public class SectionSetController {
    @Autowired
    hospSectionMapper jointSectionSetService;
    @Autowired
    HospPrivSetService hospPrivSetService;

    @GetMapping("/query")
    @ApiDoc(desc = "query")
    @ServiceTokenRequired
    public Result getSectionList() {
        try{
            List<Section> list = jointSectionSetService.getSection();
            return Result.success(list);
        } catch (Error e) {
            return Result.fail("fail");
        }
    }

    @GetMapping("/get/hospSection")
    @ApiDoc(desc = "get/hospSection")
    @ServiceTokenRequired
    public Result getHospSection(Integer hospId) {
        System.out.println(hospId);
        LambdaQueryWrapper<hospPriv> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(isNotNull(hospId), hospPriv::getHospId, hospId);
        hospPriv info = hospPrivSetService.getOne(queryWrapper);
        System.out.println(info);
        if (info == null) {
            return Result.fail(info);
        } else {
            return Result.success(info);
        }
    }

    @PostMapping("/set/hospSection")
    @ApiDoc(desc = "set/hospSection")
    @ServiceTokenRequired
    public Result setHospSection(@RequestBody hospPriv info) {
        LambdaQueryWrapper<hospPriv> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(isNotNull(info.getHospId()), hospPriv::getHospId, info.getHospId());
        hospPriv hospPrivInfo = hospPrivSetService.getOne(queryWrapper);
        boolean result;
        if (hospPrivInfo == null) {
//            如果获取的是null证明数据库还没有写入数据, 可以进行插入操作
            result = hospPrivSetService.save(info);
        } else {
            // 将hosp_id的值等于 info.getHospId()的数据进行修改
            UpdateWrapper<hospPriv> updateWrapper = new UpdateWrapper<>();
            updateWrapper.eq("hosp_id", info.getHospId());
            result = hospPrivSetService.update(info, updateWrapper);
        }
        if (result) {
            return Result.success(result);
        } else {
            return Result.fail(result);
        }
    }
}
