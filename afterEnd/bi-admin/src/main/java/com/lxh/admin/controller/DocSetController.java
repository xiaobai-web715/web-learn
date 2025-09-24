package com.lxh.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lxh.utils.result.Result;
import com.lxh.admin.dto.saveDocParams;
import com.lxh.admin.entity.DocRouter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.lxh.admin.service.DocSetService;
import com.lxh.admin.converter.DocConverter;

import static com.baomidou.mybatisplus.core.toolkit.ObjectUtils.isNotNull;

@RestController
@RequestMapping("/doc")
public class DocSetController {
    @Autowired
    private DocSetService docSetService;

    @Autowired
    private DocConverter docConverter;

    @PostMapping("/setDoc")
    public Result setDoc (@RequestBody saveDocParams params) {
        System.out.println(params);
        DocRouter entity = docConverter.toEntity(params);
        LambdaQueryWrapper<DocRouter> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(isNotNull(entity.getId()), DocRouter::getId, entity.getId());
        DocRouter docInfo = docSetService.getOne(queryWrapper);
        System.out.println(docInfo);
        if (docInfo == null) {
            docSetService.save(entity);
        } else {
            docSetService.update(entity, queryWrapper);
        }
        return Result.success("1234");
    }
}
