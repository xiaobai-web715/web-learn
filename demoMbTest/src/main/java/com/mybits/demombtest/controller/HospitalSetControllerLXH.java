package com.mybits.demombtest.controller;

import com.mybits.demombtest.entity.User;
import com.mybits.demombtest.entity.hospSet;
import com.mybits.demombtest.service.HospitalSetServiceLXH;
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
    public List<User> findAllHospitalSet() {
        List<User> list = hospitalSetServiceLXH.list();
        return list;
    }

}
