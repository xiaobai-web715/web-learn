package com.lxh.admin.controller;

import com.lxh.admin.BiAdminApplication;
import com.lxh.admin.abnormal.resultError;
import com.lxh.admin.mapper.hospUserInfoMapper;
import com.lxh.dao.BaseImageInfo;
import com.lxh.dao.CreateLayerInfo;
import com.lxh.dao.ImageInfo;
import com.lxh.mybatis.entity.hospUserInfo;
import com.lxh.utils.ipHash.LoadBalancer;
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
import java.util.*;

import static com.lxh.utils.image.ImageUtil.pictureTemplatesCut;


@SpringBootTest(classes = {BiAdminApplication.class}) //启动类的class,
@RunWith(SpringRunner.class)
class UserSetControllerTest {
    @Autowired
    private hospUserInfoMapper useSetInfo;

    @Test
    Result<BaseImageInfo> getSlidingLogin() {
        hospUserInfo randInfo = useSetInfo.getRandInfo();
        System.out.println("randInfo" + randInfo);
        File image = new File(randInfo.getHeaderImage());
        String base64OriImage = "";
        ImageInfo oriImageObj = null;
        ImageInfo newImageObj = null;
        int y = 0;
        Result result = null;
        try{
            FileInputStream fileInputStream = new FileInputStream(image);
            CreateLayerInfo createLayer = pictureTemplatesCut(fileInputStream);
            Map<String, BufferedImage> imageMap = createLayer.getImageMap();
            BufferedImage oriImage = imageMap.get("oriImage");
            BufferedImage newImage = imageMap.get("newImage");
            y = createLayer.getY();
            ByteArrayOutputStream oriOutputStream = new ByteArrayOutputStream();
            ByteArrayOutputStream newOutputStream = new ByteArrayOutputStream();
            ImageIO.write(oriImage, "png", oriOutputStream);
            ImageIO.write(newImage, "png", newOutputStream);
            base64OriImage = "oriImage&" + Base64.getEncoder().encodeToString(oriOutputStream.toByteArray()) + "#" + "newImage&" + Base64.getEncoder().encodeToString(newOutputStream.toByteArray());
            oriImageObj = new ImageInfo().setWidth(createLayer.getBaseMapWidth()).setHeight(createLayer.getBaseMapHeight());
            newImageObj = new ImageInfo().setWidth(createLayer.getCropMapWidth()).setHeight(createLayer.getCropMapHeight()).setRadius(createLayer.getRadius());
        } catch(IOException fileNotFound) {
            result = Result.notFoundImage(null);
        }

        if (result != null) {
            throw new resultError(result.getCode(), result.getMessage());
        }
        BaseImageInfo returnContent = new BaseImageInfo().setBaseImageInfo(base64OriImage, oriImageObj, newImageObj, y);
        return Result.success(returnContent);
    }

    @Test
    void testHASHIP() {
        List<String> ipList = Arrays.asList("192.168.0.102", "192.168.2.102");
        TreeMap<Integer, String> mapHash = new LoadBalancer(ipList).getMapHash();
    }
}