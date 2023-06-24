package com.lxh.admin;

import com.lxh.admin.service.impl.UserSetService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
@EnableDiscoveryClient
public class BiAdminApplication {
    public static void main(String[] args) {
//        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
//        UserSetService info = (UserSetService) context.getBean("UserSetService");
//        System.out.println(info.aroundTest());
        SpringApplication.run(BiAdminApplication.class, args);
    }

}
