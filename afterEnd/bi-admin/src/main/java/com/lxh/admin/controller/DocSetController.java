package com.lxh.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lxh.admin.converter.DocRequestConverter;
import com.lxh.admin.entity.DocContent;
import com.lxh.admin.service.DocContentSetService;
import com.lxh.utils.result.Result;
import com.lxh.admin.dto.saveDocRequest;
import com.lxh.admin.entity.Doc;
import org.springframework.beans.factory.annotation.Autowired;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.web.bind.annotation.*;
import com.lxh.admin.service.DocSetService;

import java.util.HashMap;
import java.util.Map;

import static com.baomidou.mybatisplus.core.toolkit.ObjectUtils.isNotNull;

@RestController
@RequestMapping("/doc")
public class DocSetController {
    @Autowired
    private DocSetService docSetService;

    @Autowired
    private DocContentSetService docContentSetService;

    @Autowired
    private DocRequestConverter docRequestConverter;

    @PostMapping("/setDoc")
    public Result setDoc (@RequestBody saveDocRequest params) {
        Doc entity = docRequestConverter.toDocEntity(params);
        DocContent contentEntity = docRequestConverter.toDocContentEntity(params);
        LambdaQueryWrapper<Doc> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(isNotNull(entity.getId()), Doc::getId, entity.getId());
        docSetService.save(entity);
        int id = entity.getId();
        LambdaQueryWrapper<DocContent> queryContentWrapper = new LambdaQueryWrapper<>();
        queryContentWrapper.eq(DocContent::getId, id);
        contentEntity.setId(id);
        System.out.println(id);
        docContentSetService.save(contentEntity);
        Map<String, Integer> vo = new HashMap<>();
        vo.put("id", entity.getId());
        return Result.success(vo);
    }

//    @GetMapping("/queryDoc")
//    public Result queryAllDoc (
//            @RequestParam(defaultValue = "1") long current,
//            @RequestParam(defaultValue = "10") long size
//    ) {
//        Page<DocContent> page = new Page<>(current, size);
//        LambdaQueryWrapper<DocContent> queryWrapper = new LambdaQueryWrapper<>();
//        queryWrapper.orderByDesc(DocContent::getUpdateTime);
//        Page<DocContent> docContentList = docContentSetService.page(page, queryWrapper);
//        return Result.success("124");
//    }
}
