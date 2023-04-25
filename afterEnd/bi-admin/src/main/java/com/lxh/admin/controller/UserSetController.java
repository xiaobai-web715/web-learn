package com.lxh.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lxh.dao.UserTokenInfo;
import com.lxh.mybatis.entity.hospUser;
import com.lxh.admin.service.impl.UserSetService;
import com.lxh.utils.result.Result;
import com.lxh.utils.token.UserToken;
import com.lxh.utils.utils.print;
import com.lxh.utils.token.GenerateToken;
import org.apache.shenyu.client.springcloud.annotation.ShenyuSpringCloudClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/user")
@ShenyuSpringCloudClient(path = "/user")
public class UserSetController {
    @Autowired
    private UserSetService userSetService;

    @PostMapping("/login")
    @ShenyuSpringCloudClient(path = "/login")
    public Result login(@RequestBody hospUser userInfo){
        String user = userInfo.getUser();
        String password = userInfo.getPassword();
        LambdaQueryWrapper<hospUser> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(hospUser::getUser, user); //借助hospUser表进条件查询
        List<hospUser> list = userSetService.list(queryWrapper);
        print.printArray(list); //遍历数组进行打印
        if (list.size() > 0) {
            hospUser useInfoTarget = list.get(0);
            String userPassword = useInfoTarget.getPassword();
            String userName = useInfoTarget.getUser();
            Long uid = useInfoTarget.getId();
            if (Objects.equals(password, userPassword)) {
//                用户登录密码与数据库存储相同
                UserToken userToken = new UserToken().setUserInfo(uid, userName);
                String token = GenerateToken.generateToken(userToken, 0);
//                System.out.println(token);
                UserTokenInfo userLoginInfo = new UserTokenInfo().createUserTokenInfo(uid, userName, token);
                return Result.success(userLoginInfo);
            } else {
                return Result.fail(null);
            }
        } else {
            return Result.noUser(null);
        }
    };
    @PostMapping("/register")
    @ShenyuSpringCloudClient(path = "/register")
    public Result register(@RequestBody hospUser userInfo) {
//        System.out.print(userInfo);
        Boolean result = userSetService.save(userInfo);
//        System.out.print(result);
        if (result) {
            return Result.success(true);
        } else {
            return Result.fail(null);
        }
    }
}
