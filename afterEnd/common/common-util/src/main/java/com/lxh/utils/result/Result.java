package com.lxh.utils.result;

import lombok.ToString;

@ToString
public class Result<T> {
//    @ApiModelProperty(value="状态码")
    //private 访问权限仅限于类的内部
    private Integer code;
    private String message;
    private T data;

    public void setData(T data) {
        this.data = data;
    }
    public T getData() {
        return this.data;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
    public Integer getCode() {
        return this.code;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    public String getMessage () {
        return this.message;
    }
    // protected 同一个包下的可以访问到父类的protected成员
    // 不在同一个包下的，其子类实例可以访问到从父类当中继承下来的protected方法，但父类本身的实例是访问不到的
    // static关键字 只要类加载了就可以通过类名进行访问
    protected static <T> Result<T> build(T data){
        Result<T> result = new Result<T>();
        if (data != null) {
            result.setData(data);
        }
        return result;
    }

    public static <T> Result<T> build(T data, ResultCodeEnum resultCodeEnum) {
        System.out.println("传入的数据");
        System.out.println(data);
        Result<T> result = build(data);
        result.setCode(resultCodeEnum.getCode());
        result.setMessage(resultCodeEnum.getMessage());
        return result;
    }

    /**
     *
     * @param data
     * @return
     * @param <T>
     */
    public static <T> Result<T> success(T data) {
        return build(data, ResultCodeEnum.SUCCESS);
    }
    public static <T> Result<T> fail(T data) {
        return build(data, ResultCodeEnum.PASSWORDERROR);
    }
    public static <T> Result<T> noUser(T data) {
        return build(data, ResultCodeEnum.NOUSER);
    }
}
