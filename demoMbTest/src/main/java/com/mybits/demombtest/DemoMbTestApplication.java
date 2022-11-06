package com.mybits.demombtest;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.mybits.demombtest.mapper")
public class DemoMbTestApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoMbTestApplication.class, args);
	}

}
