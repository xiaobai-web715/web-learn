package com.lxh.admin.controller;

import com.aliyun.sdk.service.sts20150401.models.AssumeRoleResponse;
import com.lxh.admin.config.AssumeRole;
import com.lxh.utils.result.Result;
import com.lxh.utils.result.ResultCodeEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequestMapping("/getConfig")
public class OssController {

    @Autowired
    private AssumeRole stsSupplier;

    @GetMapping("/getSTSToken")
    public Result getSTSToken() {
        try {
            AssumeRoleResponse res = stsSupplier.getAssumeRole();
            return Result.success(res.getBody().getCredentials());
        } catch(Exception err) {
            return Result.build(null, ResultCodeEnum.SYSTEM_INNER_ERROR_OSS);
        }
    }
}
