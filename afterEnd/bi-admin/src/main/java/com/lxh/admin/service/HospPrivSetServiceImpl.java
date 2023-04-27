package com.lxh.admin.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lxh.admin.mapper.hospPrivMapper;
import com.lxh.admin.service.impl.HospPrivSetService;
import com.lxh.mybatis.entity.hospPriv;
import org.springframework.stereotype.Service;

@Service
public class HospPrivSetServiceImpl extends ServiceImpl<hospPrivMapper, hospPriv> implements HospPrivSetService {
}
