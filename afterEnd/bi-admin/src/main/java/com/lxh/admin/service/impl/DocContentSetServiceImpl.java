package com.lxh.admin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lxh.admin.entity.DocContent;
import com.lxh.admin.mapper.DocContentMapper;
import com.lxh.admin.service.DocContentSetService;
import org.springframework.stereotype.Service;

@Service
public class DocContentSetServiceImpl extends ServiceImpl<DocContentMapper, DocContent> implements DocContentSetService {
}
