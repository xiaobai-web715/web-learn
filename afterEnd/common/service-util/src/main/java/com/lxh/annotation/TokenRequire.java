package com.lxh.annotation;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.core.annotation.Order;

@Aspect //设置当前类为切面类
@Order(0) //设置order=0,执行时机优先于AbstractRoutingDataSource.determineCurrentLookupKey
public class TokenRequire {
    @Pointcut("@annotation(com.lxh.annotation.ServiceTokenRequired)")
    public void tokenRequire() {}
    @Around("tokenRequire()")
    public Boolean checkToken(ProceedingJoinPoint joinPonint) {
        return true;
    };
}
