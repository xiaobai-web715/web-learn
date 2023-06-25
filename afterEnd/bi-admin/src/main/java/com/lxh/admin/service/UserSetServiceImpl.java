package com.lxh.admin.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lxh.admin.service.impl.UserSetService;
import com.lxh.annotation.ServiceTokenRequired;
import com.lxh.mybatis.entity.hospUser;
import com.lxh.admin.mapper.hospUserMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserSetServiceImpl extends ServiceImpl<hospUserMapper, hospUser> implements UserSetService{
    @ServiceTokenRequired
    public String aroundTest() {
        System.out.println("before测试-serviceimpl层");
        return "before测试end";
    }
}
