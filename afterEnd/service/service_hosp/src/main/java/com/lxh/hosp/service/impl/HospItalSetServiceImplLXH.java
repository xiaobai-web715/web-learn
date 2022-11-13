package com.lxh.hosp.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lxh.hosp.mapper.HospitalSetMapperLXH;
import com.lxh.hosp.service.HospitalSetServiceLXH;
import com.lxh.mybatis.entity.hospSet;
import org.springframework.stereotype.Service;

@Service
public class HospItalSetServiceImplLXH extends ServiceImpl<HospitalSetMapperLXH, hospSet> implements HospitalSetServiceLXH {
}
