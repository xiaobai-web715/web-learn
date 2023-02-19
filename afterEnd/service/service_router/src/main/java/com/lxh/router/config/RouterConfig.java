package com.lxh.router.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.lxh.router.mapper")
public class RouterConfig {
}
