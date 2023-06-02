package com.lxh.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
//创建自定义注解(用于使用注解作为切入点)
@Retention(RetentionPolicy.RUNTIME) //@Retention 标注生命周期
public @interface ServiceTokenRequired {
}