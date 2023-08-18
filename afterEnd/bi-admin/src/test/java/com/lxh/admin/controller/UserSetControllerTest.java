package com.lxh.admin.controller;

import com.lxh.admin.BiAdminApplication;
import com.lxh.admin.abnormal.resultError;
import com.lxh.admin.mapper.hospUserInfoMapper;
import com.lxh.mybatis.entity.hospUserInfo;
import com.lxh.utils.result.Result;
import org.apache.logging.log4j.util.Base64Util;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.Buffer;
import java.util.Base64;
import java.util.Map;

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
            Map<String, BufferedImage> imageMap = pictureTemplatesCut(fileInputStream);
            BufferedImage oriImage = imageMap.get("oriImage");
            BufferedImage newImage = imageMap.get("newImage");
            ByteArrayOutputStream oriOutputStream = new ByteArrayOutputStream();
            ByteArrayOutputStream newOutputStream = new ByteArrayOutputStream();
            ImageIO.write(oriImage, "png", oriOutputStream);
            ImageIO.write(newImage, "png", newOutputStream);
            String base64OriImage = "oriImage&" + Base64.getEncoder().encodeToString(oriOutputStream.toByteArray()) + "#" + "newImage&" + Base64.getEncoder().encodeToString(newOutputStream.toByteArray());
            System.out.println("base64OriImage:" + base64OriImage);
        } catch(IOException fileNotFound) {
            result = Result.notFoundImage(null);
        }

        if (result != null) {
            throw new resultError(result.getCode(), result.getMessage());
        }
    }
}