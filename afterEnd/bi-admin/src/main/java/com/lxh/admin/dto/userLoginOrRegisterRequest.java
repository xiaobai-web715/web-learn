package com.lxh.admin.dto;

import lombok.Data;

@Data
public class userLoginOrRegisterRequest {
    private String email;
    private String password;
    private String username;
}
