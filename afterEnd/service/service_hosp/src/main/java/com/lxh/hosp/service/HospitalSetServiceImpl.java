package com.lxh.hosp.service;

import com.lxh.hosp.mapper.hospSetMapper;
import com.lxh.mybatis.entity.hospSet;
import com.lxh.hosp.service.impl.HospitalSetService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

//注解，交给spring boot进行管理
//extends 继承 implements 实现
@Service
public class HospitalSetServiceImpl extends ServiceImpl<hospSetMapper, hospSet> implements HospitalSetService {
}
