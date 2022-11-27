package com.lxh.user.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lxh.user.service.impl.UserSetService;
import com.lxh.mybatis.entity.hospUser;
import com.lxh.user.mapper.hospUserMapper;
import lombok.ToString;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserSetServiceImpl extends ServiceImpl<hospUserMapper, hospUser> implements UserSetService {
    @Override
    public String toString(List<hospUser> userList){
        System.out.print("执行到了这里");
        String result = "";
//        for (int i = 0; i < userList.length; i++) {
//            result = result + userList[i];
//        }iu
        return result;
    };

}
