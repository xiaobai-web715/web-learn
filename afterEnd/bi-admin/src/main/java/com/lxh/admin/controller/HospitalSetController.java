package com.lxh.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.lxh.admin.service.impl.HospitalSetService;
import com.lxh.mybatis.entity.hospSet;

import com.lxh.utils.result.Result;
import com.lxh.utils.utils.print;
import com.lxh.dao.HospitalSetShortInfo;
import org.apache.shenyu.client.springcloud.annotation.ShenyuSpringCloudClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static com.baomidou.mybatisplus.core.toolkit.ObjectUtils.isNotNull;

@RestController
@RequestMapping("/list")
@ShenyuSpringCloudClient(path = "/list")
public class HospitalSetController {
    // 注入service进行调用
    @Autowired
    private HospitalSetService hospitalSetService;

    @PostMapping("/query")
    @ShenyuSpringCloudClient(path = "/query")
    public Result findHospitalSet(@RequestBody pageClass hospInfo) {
//        System.out.println(hospInfo);
        // 调用hospitalSetService的方法
        LambdaQueryWrapper<hospSet> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(isNotNull(hospInfo.getStatus()), hospSet::getStatus, hospInfo.getStatus());
        queryWrapper.like(StringUtils.isNotEmpty(hospInfo.getHospname()), hospSet::getHospname, hospInfo.getHospname());
        Page<hospSet> list = hospitalSetService.page(new Page<>(hospInfo.getPage(), hospInfo.getPageSize()), queryWrapper);
//        System.out.println("``````");
//        System.out.println(list);
//        System.out.println("``````");
        return Result.success(list);
    }
    @PostMapping("/edit")
    @ShenyuSpringCloudClient(path = "/edit")
    public Result editHospitalInfo(@RequestBody hospSet hospInfo) {
//        System.out.println(hospInfo);
        boolean result = hospitalSetService.updateById(hospInfo);
//        System.out.println(result);
        return Result.success(result);
    }
    @PostMapping("/add")
    @ShenyuSpringCloudClient(path = "/add")
    public Result addHospitalInfo(@RequestBody hospSet hospInfo) {
//        System.out.print(hospInfo);
        boolean result = hospitalSetService.save(hospInfo);
        if (result) {
            return Result.success(result);
        } else {
            return Result.fail(result);
        }
    }
    @PostMapping("/delete")
    @ShenyuSpringCloudClient(path = "/delete")
    public Result deleteHospitalInfo(@RequestBody hospSet hospInfo) {
//        System.out.println(hospInfo);
        boolean result = hospitalSetService.removeById(hospInfo.getId());
        if (result) {
            return Result.success(result);
        } else {
            return Result.fail(result);
        }
    }
    @PostMapping("/get/info")
    @ShenyuSpringCloudClient(path = "/get/info")
    public Result getInfoHospitalInfo(@RequestBody hospSet hospInfo) {
        hospSet info = hospitalSetService.getById(hospInfo.getId());
//        System.out.println(info);
        return Result.success(info);
    }
    @PostMapping("/get/briefInfo")
    @ShenyuSpringCloudClient(path = "/get/briefInfo")
    public Result getBriefInfo(@RequestBody hospSet hospInfo) {
        LambdaQueryWrapper<hospSet> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.like(StringUtils.isNotEmpty(hospInfo.getHospname()), hospSet::getHospname, hospInfo.getHospname());
        List<hospSet> list = hospitalSetService.list(queryWrapper);
        print.printArray(list);
        // 先暂时遍历list获取每一条里面所需要的字段再组合成List
        Iterator it = list.iterator();
        List hospShort = new ArrayList<>();
        while(it.hasNext()) {
            hospSet info = (hospSet) it.next();
//            System.out.println("info的开始");
//            System.out.println(info);
            Long id = info.getId();
            String hospname = info.getHospname();
            HospitalSetShortInfo target = new HospitalSetShortInfo().setId(id).setHospName(hospname);
            hospShort.add(target);
        }
        return Result.success(hospShort);
    }
}
