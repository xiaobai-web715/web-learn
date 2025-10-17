package com.lxh.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lxh.admin.entity.User;
import com.lxh.admin.service.UserSetService;
import com.lxh.admin.util.IdUtil;
import com.lxh.utils.result.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lxh.admin.dto.userLoginOrRegisterRequest;

import static com.baomidou.mybatisplus.core.toolkit.ObjectUtils.isNotNull;

@RestController
@Validated
@RequestMapping("/user")
public class UserSetController {
    @Autowired
    private UserSetService userSetService;

    @PostMapping("/login")
    public Result login(@RequestBody userLoginOrRegisterRequest params) {
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(isNotNull(params.getEmail()), User::getEmail, params.getEmail());
        User userInfo = userSetService.getOne(queryWrapper);
        if (userInfo == null) {
            return Result.fail("邮箱未注册");
        } else if (userInfo.getPassword().equals(params.getPassword())) {
            return Result.success(userInfo);
        } else {
            return Result.fail("密码错误");
        }
    }

    @PostMapping("/register")
    public Result register(@RequestBody userLoginOrRegisterRequest params) {
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(isNotNull(params.getEmail()), User::getEmail, params.getEmail());
        User userInfo = userSetService.getOne(queryWrapper);
        if (userInfo != null) {
            return Result.fail("邮箱已被注册");
        } else {
            User user = new User();
            user.setUserId(IdUtil.nextId());
            user.setEmail(params.getEmail());
            user.setPassword(params.getPassword());
            user.setUsername(params.getUsername());
            boolean res = userSetService.save(user);
            if (res) {
                return Result.success(user);
            } else {
                return Result.fail("创建失败");
            }
        }
    }
}
