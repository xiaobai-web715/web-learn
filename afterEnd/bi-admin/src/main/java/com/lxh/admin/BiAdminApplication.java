package com.lxh.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching //spring cache简化redis缓存
public class BiAdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(BiAdminApplication.class, args);
    }

}
