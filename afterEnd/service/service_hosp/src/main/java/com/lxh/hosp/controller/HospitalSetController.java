package com.lxh.hosp.controller;

import com.lxh.hosp.service.impl.HospitalSetService;
import com.lxh.mybatis.entity.hospSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/hosp/hospitalList")
public class HospitalSetController {
    // 注入service进行调用
    @Autowired
    private HospitalSetService hospitalSetService;

    @GetMapping("findAll")
    public List<hospSet> findAllHospitalSet() {
        // 调用hospitalSetService的方法
        List<hospSet> list = hospitalSetService.list();
        return list;
    }

}
