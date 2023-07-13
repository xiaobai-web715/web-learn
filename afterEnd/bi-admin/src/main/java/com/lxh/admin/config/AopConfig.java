package com.lxh.admin.config;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lxh.admin.abnormal.resultError;
import com.lxh.utils.result.Result;
import com.lxh.utils.token.GenerateToken;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

@Component
@Aspect
public class AopConfig {
    @Pointcut("@annotation(com.lxh.admin.config.ServiceTokenRequired)")
    public void verifyTokenProxy() {}
    @Pointcut("@annotation(com.lxh.admin.config.ServiceTokenRequired)")
    public void checkTokenProxy() {}
    @After(value = "verifyTokenProxy()")
    public void verifyToken(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
    }
    @Before(value = "checkTokenProxy()")
    public void checkToken(JoinPoint joinPonint) throws IOException {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        String token = GenerateToken.getToken();
        DecodedJWT jwt = null;
        Result result = null;
        if (token == null) {
            result = Result.tokenExpire(null);
        } else {
            try {
                jwt = GenerateToken.verifyToken(token);
                Date validityPeriod = jwt.getExpiresAt();
//            Date nowTime = new Date(System.currentTimeMillis());
            } catch (Throwable e) {
                result = Result.tokenExpire(null);
            }
        }
        if (result != null) {
            // 对异常进行抛出
            throw new resultError(result.getCode(), result.getMessage());
        }
    };
}
