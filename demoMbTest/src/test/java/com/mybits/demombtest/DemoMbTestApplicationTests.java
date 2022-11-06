package com.mybits.demombtest;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.mybits.demombtest.mapper.UserMapper;
import com.mybits.demombtest.entity.User;

import java.util.List;

@SpringBootTest
class DemoMbTestApplicationTests {

	@Autowired
	private UserMapper userMapper;

	@Test
	public void findAll() {
		List<User> users = userMapper.selectList(null);
		System.out.println(users);
	}
}
