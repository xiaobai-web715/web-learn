package com.lxh.admin.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lxh.admin.service.impl.UserSetService;
import com.lxh.annotation.ServiceTokenRequired;
import com.lxh.mybatis.entity.hospUser;
import com.lxh.admin.mapper.hospUserMapper;
import org.springframework.stereotype.Service;

@Service
public class UserSetServiceImpl extends ServiceImpl<hospUserMapper, hospUser> implements UserSetService {
    // 引入自定义注解执行切面
    @ServiceTokenRequired

    @Override
    public String aroundTest() {
        System.out.println("around注解开始");
        return "around注解结束";
    }
}
