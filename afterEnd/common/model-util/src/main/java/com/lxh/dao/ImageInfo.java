package com.lxh.dao;

public class ImageInfo {
    private Integer width; //图宽
    private Integer height; //截取点y
    private Integer radius; //裁剪额外圆半径

    public Integer getWidth() {
        return width;
    }

    public ImageInfo setWidth(Integer width) {
        this.width = width;
        return this;
    }

    public Integer getHeight() {
        return height;
    }

    public ImageInfo setHeight(Integer height) {
        this.height = height;
        return this;
    }

    public Integer getRadius() {
        return radius;
    }

    public ImageInfo setRadius(Integer radius) {
        this.radius = radius;
        return this;
    }
}
