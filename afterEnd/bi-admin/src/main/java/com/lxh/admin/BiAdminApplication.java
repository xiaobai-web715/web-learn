package com.lxh.admin;

import com.lxh.admin.service.impl.UserSetService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
@EnableDiscoveryClient
//@EnableAspectJAutoProxy
public class BiAdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(BiAdminApplication.class, args);
    }

}
