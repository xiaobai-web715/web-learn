package com.lxh.admin.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lxh.admin.service.impl.UserSetService;
import com.lxh.admin.config.ServiceTokenRequired;
import com.lxh.mybatis.entity.hospUser;
import com.lxh.admin.mapper.hospUserMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserSetServiceImpl extends ServiceImpl<hospUserMapper, hospUser> implements UserSetService{
}
