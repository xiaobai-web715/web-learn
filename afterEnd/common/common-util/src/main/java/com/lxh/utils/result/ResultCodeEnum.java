package com.lxh.utils.result;

public enum ResultCodeEnum {
    SUCCESS(200, "成功"),
    PASSWORDERROR(3987, "密码或账号不正确，请重新输入！"),
    NOUSER(3988, "当前账号不存在，请注册");
//    添加映射的时候前面的应该是逗号而不是分号
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
