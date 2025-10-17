package com.lxh.admin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lxh.admin.mapper.UserMapper;
import com.lxh.admin.entity.User;
import com.lxh.admin.service.UserSetService;
import org.springframework.stereotype.Service;

@Service
public class UserSetServiceImpl extends ServiceImpl<UserMapper, User> implements UserSetService {
}
