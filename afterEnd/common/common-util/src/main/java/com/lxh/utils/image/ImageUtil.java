package com.lxh.utils.image;

import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class ImageUtil {
    private final static String SAVE_IMAGE_PATH = "E:/test/";
    static String nowDate;
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
        nowDate = date;
        return date + UUID.randomUUID() + suffixName;
    }
    public static String getNewImagePath(String name) {
        System.out.println("文件夹" + SAVE_IMAGE_PATH + nowDate + '/' + name);
        return SAVE_IMAGE_PATH + nowDate + '/' + name;
    }
    public static Boolean saveImage(String filePath, MultipartFile file) {
        try{
            // 保存文件（当前文件路径必须存在否则报错）
            byte[] bytes = file.getBytes();
            System.out.println(bytes.length);
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(
                    new File(filePath)));//设置文件路径及名字
            stream.write(bytes);// 写入
            stream.close();
//            file.transferTo(dest);
            return true;
        } catch(IllegalStateException | IOException e){
            e.printStackTrace();
        }
        return false;
    }
}
