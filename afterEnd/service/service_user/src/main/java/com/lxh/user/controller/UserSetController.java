package com.lxh.user.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lxh.mybatis.entity.hospUser;
import com.lxh.user.service.impl.UserSetService;
import com.lxh.utils.result.Result;
import com.lxh.utils.utils.print;
//import org.apache.shenyu.client.springcloud.annotation.ShenyuSpringCloudClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
//@ShenyuSpringCloudClient(path = "/admin/hosp/user/**")
@RequestMapping("/admin/hosp/user")
//@SoulSpringMvcClient(path = "/admin/hosp/user/**")
public class UserSetController {
    @Autowired
    private UserSetService userSetService;

    @PostMapping("login")
    public Result login(@RequestBody hospUser userInfo) {
        String user = userInfo.getUser();
        String password = userInfo.getPassword();
        LambdaQueryWrapper<hospUser> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(hospUser::getUser, user); //借助hospUser表进条件查询
        List<hospUser> list = userSetService.list(queryWrapper);
        print.printArray(list); //遍历数组进行打印
        if (list.size() > 0) {
            hospUser useInfo = list.get(0);
            String userPassword = useInfo.getPassword();
            String userName = userInfo.getUser();
            Long uid = userInfo.getId();

            System.out.print(Objects.equals(password, userPassword));
            if (Objects.equals(password, userPassword)) {
                return Result.success(useInfo);
            } else {
                return Result.fail(null);
            }
        } else {
            return Result.noUser(null);
        }
    };
    @PostMapping("register")
    public Result register(@RequestBody hospUser userInfo) {
        System.out.print(userInfo);
        Boolean result = userSetService.save(userInfo);
        System.out.print(result);
        if (result) {
            return Result.success(true);
        } else {
            return Result.fail(null);
        }
    }
}
