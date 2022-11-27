package com.lxh.user.service.impl;

import com.baomidou.mybatisplus.extension.service.IService;
import com.lxh.mybatis.entity.hospUser;

import java.util.List;

public interface UserSetService extends IService<hospUser> {
//    boolean findByWrapper(hospUser userInfo);
    String toString(List<hospUser> userList);
}
