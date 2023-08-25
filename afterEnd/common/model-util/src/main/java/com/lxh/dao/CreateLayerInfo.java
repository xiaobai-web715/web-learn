package com.lxh.dao;

import java.awt.image.BufferedImage;
import java.util.Map;

public class CreateLayerInfo {
    private Map<String, BufferedImage> imageMap;
    private Integer x; //截取点x
    private Integer y; //截取点y
    private Integer baseMapWidth; //底图宽
    private Integer baseMapHeight; //底图稿
    private Integer cropMapWidth; //裁剪宽
    private Integer cropMapHeight; //裁剪高
    private Integer radius; //裁剪额外圆半径

    public Integer getX() {
        return x;
    }

    public CreateLayerInfo setX(Integer x) {
        this.x = x;
        return this;
    }

    public Map<String, BufferedImage> getImageMap() {
        return imageMap;
    }

    public CreateLayerInfo setImageMap(Map<String, BufferedImage> imageMap) {
        this.imageMap = imageMap;
        return this;
    }

    public Integer getY() {
        return y;
    }

    public CreateLayerInfo setY(Integer y) {
        this.y = y;
        return this;
    }

    public Integer getBaseMapWidth() {
        return baseMapWidth;
    }

    public CreateLayerInfo setBaseMapWidth(Integer baseMapWidth) {
        this.baseMapWidth = baseMapWidth;
        return this;
    }

    public Integer getBaseMapHeight() {
        return baseMapHeight;
    }

    public CreateLayerInfo setBaseMapHeight(Integer baseMapHeight) {
        this.baseMapHeight = baseMapHeight;
        return this;
    }

    public Integer getCropMapWidth() {
        return cropMapWidth;
    }

    public CreateLayerInfo setCropMapWidth(Integer cropMapWidth) {
        this.cropMapWidth = cropMapWidth;
        return this;
    }

    public Integer getCropMapHeight() {
        return cropMapHeight;
    }

    public CreateLayerInfo setCropMapHeight(Integer cropMapHeight) {
        this.cropMapHeight = cropMapHeight;
        return this;
    }

    public Integer getRadius() {
        return radius;
    }

    public CreateLayerInfo setRadius(Integer radius) {
        this.radius = radius;
        return this;
    }
}
