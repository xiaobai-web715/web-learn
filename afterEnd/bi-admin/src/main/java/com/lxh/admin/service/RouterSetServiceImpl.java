package com.lxh.admin.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lxh.mybatis.entity.hospRouter;
import com.lxh.admin.mapper.hospRouterMapper;
import com.lxh.admin.service.impl.RouterSetService;
import org.springframework.stereotype.Service;

@Service
public class RouterSetServiceImpl extends ServiceImpl<hospRouterMapper, hospRouter> implements RouterSetService {}
