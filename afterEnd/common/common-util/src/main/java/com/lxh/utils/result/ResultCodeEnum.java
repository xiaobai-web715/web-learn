package com.lxh.utils.result;

public enum ResultCodeEnum {
    SUCCESS(200, "成功");
    private Integer code;
    private String message;

    public Integer getCode() {
        return this.code;
    }

    public String getMessage() {
        return this.message;
    }

    private ResultCodeEnum (Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
