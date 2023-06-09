package com.lxh.admin.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lxh.admin.service.impl.UserSetService;
import com.lxh.annotation.ServiceTokenRequired;
import com.lxh.mybatis.entity.hospUser;
import com.lxh.admin.mapper.hospUserMapper;
import com.lxh.utils.token.GenerateToken;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;

@Service
public class UserSetServiceImpl extends ServiceImpl<hospUserMapper, hospUser> implements UserSetService {
    // 引入自定义注解执行切面
    @ServiceTokenRequired
    @Override
    public Boolean aroundTest(UserSetService userSetService) {
        System.out.println("around注解开始");
        try{
            RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
            HttpServletRequest request = (HttpServletRequest) requestAttributes.resolveReference(RequestAttributes.REFERENCE_REQUEST);
            String token = request.getParameter("token");
            if (token == null) {
                token = request.getHeader("X-Access-Token");
            }
            System.out.println("我的token是" + token);
            if (StringUtils.isBlank(token)) {
                throw new AuthenticationException("token不存在");
            }
            Boolean result = GenerateToken.verifyToken(token);
            return result;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
