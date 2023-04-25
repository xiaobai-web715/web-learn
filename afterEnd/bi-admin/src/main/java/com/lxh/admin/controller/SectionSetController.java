package com.lxh.admin.controller;

import com.lxh.admin.mapper.hospSectionMapper;
import com.lxh.admin.service.impl.SectionSetService;
import com.lxh.joint.Section;
import com.lxh.utils.result.Result;
import org.apache.shenyu.client.springcloud.annotation.ShenyuSpringCloudClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/hosp/section")
@ShenyuSpringCloudClient(path = "/section")
public class SectionSetController {
    @Autowired
    hospSectionMapper jointSectionSetService;

    @GetMapping("/query")
    @ShenyuSpringCloudClient(path = "/query")
    public Result getSectionList() {
        try{
            List<Section> list = jointSectionSetService.getSection();
            return Result.success(list);
        } catch (Error e) {
            return Result.fail("fail");
        }
    }
}
