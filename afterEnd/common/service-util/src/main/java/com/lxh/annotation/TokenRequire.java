package com.lxh.annotation;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect //设置当前类为切面类
@Component
public class TokenRequire {
    @Pointcut("@annotation(com.lxh.annotation.ServiceTokenRequired)")
    public void tokenRequire() {}
    @After("tokenRequire()")
    public Boolean checkToken(JoinPoint joinPonint) {
        System.out.println("绕后切面不同包");
        return true;
    };
}
