package com.lxh.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;


@SpringBootApplication
@EnableCaching //spring cache简化redis缓存
@ConfigurationPropertiesScan
public class BiAdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(BiAdminApplication.class, args);
    }

}
