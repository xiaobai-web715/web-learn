package com.lxh.dao;

public class BaseImageInfo {
    private String baseImage;
    private ImageInfo oriImage;
    private ImageInfo newImage;
    public BaseImageInfo setBaseImageInfo(String baseImage, ImageInfo oriImage, ImageInfo newImage) {
        this.baseImage = baseImage;
        this.oriImage = oriImage;
        this.newImage = newImage;
        return this;
    }
}
