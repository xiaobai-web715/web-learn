package com.lxh.router.controller;

import com.lxh.mybatis.entity.hospRouter;
import com.lxh.router.service.impl.RouterSetService;
import com.lxh.utils.result.Result;
import com.lxh.utils.utils.print;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/hosp/router")
public class RouterSetController {
    @Autowired
    private RouterSetService routerSetService;
    @PostMapping("getUserRouter")
    public Result getUserRouter() {
        // 目前先暂时获取所有的路由列表
        List<hospRouter> list = routerSetService.list();
        print.printArray(list);
        return Result.success(list);
    }
}
