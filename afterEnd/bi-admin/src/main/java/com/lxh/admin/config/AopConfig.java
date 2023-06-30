package com.lxh.admin.config;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class AopConfig {
    @Pointcut("@annotation(com.lxh.admin.config.ServiceTokenRequired)")
    public void verifyTokenProxy() {}
    @Pointcut("@annotation(com.lxh.admin.config.ServiceTokenRequired)")
    public void checkTokenProxy() {}
    @After(value = "verifyTokenProxy()")
    public void verifyToken(JoinPoint joinPoint) {
        System.out.println("我是后置操作");
    }
    @Before(value = "checkTokenProxy()")
    public void checkToken(JoinPoint joinPonint) {
        System.out.println("我是前置操作");
    };
}
