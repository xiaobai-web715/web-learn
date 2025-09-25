package com.lxh.admin.service.impl;

import com.lxh.admin.service.DocSetService;
import com.lxh.admin.mapper.DocMapper;
import com.lxh.admin.entity.Doc;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

@Service
public class DocSetServiceImpl extends ServiceImpl<DocMapper, Doc> implements DocSetService  {}



