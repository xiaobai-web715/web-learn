package com.lxh.user.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lxh.mybatis.entity.hospUser;
import com.lxh.user.service.impl.UserSetService;
import com.lxh.utils.result.Result;
import com.lxh.utils.utils.print;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/admin/hosp/user")
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
            System.out.print(Objects.equals(password, userPassword));
            if (Objects.equals(password, userPassword)) {
                return Result.success(true);
            } else {
                return Result.fail(null);
            }
        } else {
            return Result.noUser(null);
        }
    };
}
