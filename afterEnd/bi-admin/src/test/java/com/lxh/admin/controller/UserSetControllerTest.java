package com.lxh.admin.controller;

import com.lxh.admin.BiAdminApplication;
import com.lxh.admin.abnormal.resultError;
import com.lxh.admin.mapper.hospUserInfoMapper;
import com.lxh.mybatis.entity.hospUserInfo;
import com.lxh.utils.result.Result;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import static com.lxh.utils.image.ImageUtil.pictureTemplatesCut;


@SpringBootTest(classes = {BiAdminApplication.class}) //启动类的class,
@RunWith(SpringRunner.class)
class UserSetControllerTest {
    @Autowired
    private hospUserInfoMapper useSetInfo;

    @Test
    void getSlidingLogin() {
        hospUserInfo randInfo = useSetInfo.getRandInfo();
        System.out.println("randInfo" + randInfo);
        File image = new File(randInfo.getHeaderImage());
        Result result = null;
        try{
            FileInputStream fileInputStream = new FileInputStream(image);
            pictureTemplatesCut(fileInputStream);
        } catch(IOException fileNotFound) {
            result = Result.notFoundImage(null);
        }

        if (result != null) {
            throw new resultError(result.getCode(), result.getMessage());
        }
    }
}