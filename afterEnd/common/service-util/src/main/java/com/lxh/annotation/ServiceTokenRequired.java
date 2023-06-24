package com.lxh.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

//创建自定义注解(用于使用注解作为切入点)
@Retention(RetentionPolicy.CLASS) //@Retention 标注生命周期
@Target({ElementType.CONSTRUCTOR, ElementType.METHOD})
public @interface ServiceTokenRequired {
}