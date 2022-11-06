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
	//添加操作
	@Test
	public void testAdd() {
		User user = new User();
		user.setName("程瀚轶");
		user.setAge(22);
		user.setEmail("chenghanyi123@163.com");
		int insert = userMapper.insert(user);
		System.out.println(insert);
	}
	@Test
	public void findAll() {
		List<User> users = userMapper.selectList(null);
		System.out.println(users);
	}
	@Test
	public void testUpData() {
		User user = new User();
		user.setId(3); //这里加上一个L好像可以解决问题
		user.setEmail("caiboyu123@163.com");
		int count = userMapper.updateById(user);
		System.out.println(count);
	}
	@Test
	public void testUpDate() {
		//mybatis-plus有自动填充的功能
		User user = new User();
		user.setId(3); //这里加上一个L好像可以解决问题
		int count = userMapper.deleteById(user);
		System.out.println(count);
	}
}
