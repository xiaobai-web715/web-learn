package com.lxh.admin.abnormal;

public class resultError extends RuntimeException {
    private Integer code;
    private String message;

    @Override
    public String toString() {
        return "resultError{" +
                "code=" + code +
                ", message='" + message + '\'' +
                '}';
    }

    public resultError(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
