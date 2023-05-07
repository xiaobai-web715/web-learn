package com.lxh.utils.image;

public enum UpLoadFileCodeEnum {
    SUCCESS(1),
    FAIL(0),
    EMPTY(2);
    private Integer code;
    public Integer getCode() {
        return this.code;
    }
    private UpLoadFileCodeEnum (Integer code) {
        this.code = code;
    }
}
