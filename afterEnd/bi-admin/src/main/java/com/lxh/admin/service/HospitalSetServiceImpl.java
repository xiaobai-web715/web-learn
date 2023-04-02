package com.lxh.admin.service;

import com.lxh.admin.mapper.hospSetMapper;
import com.lxh.mybatis.entity.hospSet;
import com.lxh.admin.service.impl.HospitalSetService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

//注解，交给spring boot进行管理
//extends 继承 implements 实现
@Service
public class HospitalSetServiceImpl extends ServiceImpl<hospSetMapper, hospSet> implements HospitalSetService {
}
