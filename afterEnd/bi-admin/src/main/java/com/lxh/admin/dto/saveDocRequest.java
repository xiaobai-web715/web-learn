package com.lxh.admin.dto;

import lombok.Data;

@Data
public class saveDocRequest {
    private int id;
    private String title; // 文档名称
    private Integer userId; // 上传用户id
    private String content;
    private String imageAddress;
}
