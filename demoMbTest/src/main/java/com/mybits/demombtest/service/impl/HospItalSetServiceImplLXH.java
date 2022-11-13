package com.mybits.demombtest.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.mybits.demombtest.entity.User;
import com.mybits.demombtest.entity.hospSet;
import com.mybits.demombtest.mapper.UserMapper;
import com.mybits.demombtest.service.HospitalSetServiceLXH;
import org.springframework.stereotype.Service;

@Service
public class HospItalSetServiceImplLXH extends ServiceImpl<UserMapper, User> implements HospitalSetServiceLXH {
}
