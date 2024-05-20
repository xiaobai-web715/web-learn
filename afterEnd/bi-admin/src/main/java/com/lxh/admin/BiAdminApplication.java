package com.lxh.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient // 启用服务发现功能
@SpringBootTest
@EnableCaching //spring cache简化redis缓存
public class BiAdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(BiAdminApplication.class, args);
    }

}
