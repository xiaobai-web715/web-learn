package com.lxh.hosp.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lxh.hosp.service.impl.HospitalSetService;
import com.lxh.mybatis.entity.hospSet;

import com.lxh.utils.result.Result;
import com.lxh.utils.utils.print;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/hosp/hospitalList")
public class HospitalSetController {
    // 注入service进行调用
    @Autowired
    private HospitalSetService hospitalSetService;

    @PostMapping("query")
    public Result findAllHospitalSet(@RequestBody hospSet hospInfo) {
        System.out.println(hospInfo);
        // 调用hospitalSetService的方法
        LambdaQueryWrapper<hospSet> queryWrapper = new LambdaQueryWrapper<>();
        List<hospSet> list = hospitalSetService.list();
        print.printArray(list);
        return Result.success(list);
    }
    @PostMapping("edit")
    public Result editHospitalInfo(@RequestBody hospSet hospInfo) {
        System.out.println(hospInfo);
        boolean result = hospitalSetService.updateById(hospInfo);
        System.out.println(result);
        return Result.success(result);
    }
    @PostMapping("add")
    public Result addHospitalInfo(@RequestBody hospSet hospInfo) {
//        System.out.print(hospInfo);
        boolean result = hospitalSetService.save(hospInfo);
        if (result) {
            return Result.success(result);
        } else {
            return Result.fail(result);
        }
    }
}
