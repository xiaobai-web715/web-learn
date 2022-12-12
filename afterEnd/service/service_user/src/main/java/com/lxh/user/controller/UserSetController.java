package com.lxh.user.controller;

import com.lxh.mybatis.entity.hospUser;
import com.lxh.user.service.impl.UserSetService;
import com.lxh.utils.result.Result;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/admin/hosp/user")
public class UserSetController {
    @Autowired
    private UserSetService userSetService;
    @PostMapping("login")
    public Result login(@RequestBody hospUser userInfo) {
        String user = userInfo.getUser();
        String password = userInfo.getPassword();
        Map<String, Object> columnMap = new HashMap<>();
        columnMap.put("user", user);
        columnMap.put("password", password);
        List<hospUser> list = userSetService.listByMap(columnMap);
        System.out.println(userSetService.toString(list));
        return Result.success(true);
    };
}
