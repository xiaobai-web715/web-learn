package com.lxh.admin.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.lxh.admin.mapper")
public class HospConfig {
}