package com.lxh.utils.token;

import com.lxh.admin.service.impl.UserSetService;
import org.apache.commons.lang3.StringUtils;
import org.jose4j.jws.AlgorithmIdentifiers;
import org.jose4j.jws.JsonWebSignature;
import org.jose4j.jwt.JwtClaims;
import org.jose4j.keys.HmacKey;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Autowired;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.security.Key;

public class GenerateToken {
//    全局静态变量(不带public就是内部静态变量)
    public static final String CONTEXT_USER_NAME = "usename";
    public static final String CONTEXT_USER_ID = "uid";
    public static final String JWT_PRIVATE_KEY = "lxh";
    public static byte[] toUTF8(String s) {
        System.out.println(s);
        try{
            return s.getBytes("utf-8");
        } catch(UnsupportedEncodingException e) {
            System.out.printf("中文转utf8编码报错", e); // 打印异常信息
            return s.getBytes(); // 尝试使用用默认编码
        }
    }
    public static String getTokenByRequest(HttpServletRequest request) {
        String token = request.getParameter("token");
        if (token == null) {
            token = request.getHeader("X-Access-Token");
        }
        return token;
    }
    public static String generateToken(UserToken userToken, int expire){
        JwtClaims claims = new JwtClaims();
//        claims.setSubject(userToken.getUsername());
        claims.setClaim(CONTEXT_USER_NAME, userToken.getUsername());
        claims.setClaim(CONTEXT_USER_ID, userToken.getId());
        claims.setExpirationTimeMinutesInTheFuture(expire == 0 ? 60*24 : expire);
        byte[] bs = toUTF8(JWT_PRIVATE_KEY);
        System.out.println("我的编码结果" + bs);
        Key key =  new HmacKey(bs);

        JsonWebSignature jws = new JsonWebSignature();
        jws.setPayload(claims.toJson());
        jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.HMAC_SHA256);
        jws.setKey(key);
        jws.setDoKeyValidation(false);
        try{
            String token = jws.getCompactSerialization();
            return token;
        } catch (JoseException e) {
            System.out.printf("token生成", e); // 打印异常信息
            return "";
        }
    }
    public static  boolean verifyToken(HttpServletRequest request, UserSetService userSetService) throws AuthenticationException {
        String token = getTokenByRequest(request);
        if (StringUtils.isBlank(token)) {
            throw new AuthenticationException("token不存在");
        }
        Object jwtInfo = new JwtClaims().getClaimValue(CONTEXT_USER_NAME);
        System.out.println(jwtInfo.toString());
        return true;
    }
}
