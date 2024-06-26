package com.lxh.admin.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lxh.annotation.ServiceTokenRequired;
import com.lxh.joint.Router;
import com.lxh.admin.service.impl.RouterSetService;
import com.lxh.admin.mapper.hospRouterMapper;
import com.lxh.utils.result.Result;
import org.apache.shenyu.client.apidocs.annotations.ApiDoc;
import org.apache.shenyu.client.apidocs.annotations.ApiModule;
import org.apache.shenyu.client.springmvc.annotation.ShenyuSpringMvcClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/router")
@ShenyuSpringMvcClient("/router/**")
@ApiModule("/router")
public class RouterSetController {
    @Autowired
    private RouterSetService routerSetService;
    @Autowired
    private hospRouterMapper hospRouterMapper;
    @PostMapping("/getUserRouter")
    @ApiDoc(desc = "getUserRouter")
    @ServiceTokenRequired
    public Result getUserRouter() throws JsonProcessingException {
//        连表查询需要自定义sql语句, 从被ServiceImpl实现变为在Mapper当中自定义sql查询语句进行处理
//        List<hospRouter> list = routerSetService.list();
//        try {
//            List<Router> listTest = hospRouterMapper.getRouter();
//            System.out.println("-------");
//            print.printArray(listTest);
//        } catch (Error err) {
//            System.out.println(err);
//        }
        List<Router> list = hospRouterMapper.getRouter();
        return Result.success(list);
    }
}
