package com.lxh.hosp.controller;

import com.lxh.hosp.service.HospitalSetServiceLXH;
import com.lxh.mybatis.entity.hospSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/hosp/hospitalList")
public class HospitalSetControllerLXH {
    //注入service
    @Autowired
    private HospitalSetServiceLXH hospitalSetServiceLXH;

    @GetMapping("findAll")
    public List<hospSet> findAllHospitalSet() {
        List<hospSet> list = hospitalSetServiceLXH.list();
        return list;
    }

}
