package com.lxh.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.beans.BeanUtils;
import com.lxh.admin.converter.DocRequestConverter;
import com.lxh.admin.entity.DocContent;
import com.lxh.admin.service.DocContentSetService;
import com.lxh.utils.result.Result;
import com.lxh.admin.dto.saveDocRequest;
import com.lxh.admin.entity.Doc;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.context.annotation.Bean;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.lxh.admin.service.DocSetService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.baomidou.mybatisplus.core.toolkit.ObjectUtils.isNotNull;

@RestController
@Validated
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

    @GetMapping("/queryDoc")
    public Result queryAllDoc (
            @RequestParam(defaultValue = "1") long current,
            @RequestParam(defaultValue = "10") long size
    ) {
        Page<Doc> page = new Page<>(current, size);
        LambdaQueryWrapper<Doc> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.orderByDesc(Doc::getUpdateTime);
        Page<Doc> docPage = docSetService.page(page, queryWrapper);
        long total = docPage.getTotal();
        long pages = docPage.getPages();
        List<Doc> records = docPage.getRecords();
        Map<String, Object> ov = new HashMap();
        ov.put("total", total);
        ov.put("pages", pages);
        ov.put("records", records);
        return Result.success(ov);
    }

    @GetMapping("getDocContent")
    public Result getDocContent (
            @RequestParam @NotNull(message = "id 不能为空") long id
    ) {
        LambdaQueryWrapper<DocContent> queryWrapper = new LambdaQueryWrapper<>();
        LambdaQueryWrapper<Doc> queryWrapper1 = new LambdaQueryWrapper<>();
        queryWrapper.eq(DocContent::getId, id);
        queryWrapper1.eq(Doc::getId, id);
        DocContent contentInfo = docContentSetService.getOne(queryWrapper);
        Doc docInfo = docSetService.getOne(queryWrapper1);
        saveDocRequest vo = new saveDocRequest();
        BeanUtils.copyProperties(contentInfo, vo);
        BeanUtils.copyProperties(docInfo, vo);
        System.out.println(vo);
        return Result.success(vo);
    }
}
