package com.lxh.dao;

public class ImageInfo {
    private Integer width; //图宽
    private Integer height; //截取点y
    private Integer radius; //裁剪额外圆半径
    public ImageInfo setInfo(int width, int height, int radius) {
        this.width = width;
        this.height = height;
        this.radius = radius;
        return this;
    }
}
