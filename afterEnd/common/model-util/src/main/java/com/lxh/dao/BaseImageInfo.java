package com.lxh.dao;

public class BaseImageInfo {
    public String baseImage;
    public ImageInfo oriImage;
    public ImageInfo newImage;
    public Integer y;
    public BaseImageInfo setBaseImageInfo(String baseImage, ImageInfo oriImage, ImageInfo newImage, int y) {
        this.baseImage = baseImage;
        this.oriImage = oriImage;
        this.newImage = newImage;
        this.y = y;
        return this;
    }
}
