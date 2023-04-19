package com.lxh.admin.controller;

import com.lxh.admin.mapper.hospRouterMapper;
import com.lxh.admin.service.RouterSetServiceImpl;
import com.lxh.mybatis.entity.hospRouter;
import com.lxh.admin.service.impl.RouterSetService;
import com.lxh.utils.result.Result;
import com.lxh.utils.utils.print;
import org.apache.shenyu.client.springcloud.annotation.ShenyuSpringCloudClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hosp/router")
@ShenyuSpringCloudClient(path = "/router")
public class RouterSetController {
    @Autowired
    private RouterSetService routerSetService;
    @Autowired
    private hospRouterMapper hospRouterMapper;
    @PostMapping("/getUserRouter")
    @ShenyuSpringCloudClient(path = "/getUserRouter")
    public Result getUserRouter() {
        // 目前先暂时获取所有的路由列表
        List<hospRouter> list = routerSetService.list();
        try {
            List<RouterSetServiceImpl> listTest = hospRouterMapper.getRouter();
            System.out.println("-------");
            print.printArray(listTest);
        } catch (Error err) {
            System.out.println(err);
        }
        return Result.success(list);
    }
}
