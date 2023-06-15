package com.lxh.admin.service.impl;

import com.auth0.jwt.JWTVerifier;
import com.baomidou.mybatisplus.extension.service.IService;
import com.lxh.mybatis.entity.hospUser;

import java.util.List;

public interface UserSetService extends IService<hospUser> {
    public String aroundTest();
}
