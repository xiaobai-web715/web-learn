package com.lxh.admin.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lxh.mybatis.entity.hospRouter;
import com.lxh.admin.mapper.hospRouterMapper;
import com.lxh.admin.service.impl.RouterSetService;
import org.springframework.stereotype.Service;

@Service
public class RouterSetServiceImpl extends ServiceImpl<hospRouterMapper, hospRouter> implements RouterSetService {
    private Long id;
    private Float pid;
    private Float fPid;
    private String path;
    private String name;
    private String title;
    private String filePath;
    private Integer ancestor;
    private Integer descendant;
    private Integer distance;

    @Override
    public String toString() {
        return "RouterSetServiceImpl{" +
                "id=" + id +
                ", pid=" + pid +
                ", fPid=" + fPid +
                ", path='" + path + '\'' +
                ", name='" + name + '\'' +
                ", title='" + title + '\'' +
                ", filePath='" + filePath + '\'' +
                ", ancestor=" + ancestor +
                ", descendant=" + descendant +
                ", distance=" + distance +
                '}';
    }
}
