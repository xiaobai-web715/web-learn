package com.lxh.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class BiAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(BiAdminApplication.class, args);
    }

}
