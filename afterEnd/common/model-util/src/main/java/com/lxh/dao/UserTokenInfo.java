package com.lxh.dao;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

public class UserTokenInfo {
    @JsonSerialize(using = ToStringSerializer.class)
    public int id;
    public String username;
    public String token;
//    不在同一个包下即是new了也不能调用里面的方法(要加public变成全局成员变量)
    public UserTokenInfo createUserTokenInfo(int id, String username, String token) {
        this.id = id;
        this.username = username;
        this.token = token;
        return this;
    }
}
