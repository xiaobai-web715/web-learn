package com.lxh.utils.image;

import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class ImageUtil {
    private final static String SAVE_IMAGE_PATH = "E:/test/";
    public static String getImagePath(MultipartFile file) {
//        获取文件后缀
        String fileName = file.getOriginalFilename(); //获取文件名称
        System.out.println("fileName" + fileName);
        int index = fileName.indexOf(".");
        return fileName.substring(index, fileName.length());
    }
    public static String getNewFileName(String suffixName) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String date = sdf.format(new Date());
        return date + UUID.randomUUID() + suffixName;
    }
    public static String getNewImagePath(String name) {
        return "";
    }
}
