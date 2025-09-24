package com.lxh.admin.dto;

import lombok.Data;

@Data
public class saveDocParams {
    private Integer id;
    private String title; // 文档名称
    private String content; // md文档内容
    private Integer userId; // 上传用户id
}
