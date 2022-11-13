package com.lxh.hosp;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//启动类
@SpringBootApplication
public class ServiceHospApplication {
    //这里在run启动类的时候有可能发现启动后就立即停止,查到的是没有在pom中加入依赖spring-boot-starter-web
    public static void main(String[] args) {
        SpringApplication.run(ServiceHospApplication.class, args);
    }
}
