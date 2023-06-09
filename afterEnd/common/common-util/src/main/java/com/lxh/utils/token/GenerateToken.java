package com.lxh.utils.token;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.io.UnsupportedEncodingException;
import java.util.Date;

public class GenerateToken {
//    全局静态变量(不带public就是内部静态变量)
    public static final String CONTEXT_USER_NAME = "usename";
    public static final String CONTEXT_USER_ID = "uid";
    public static final String JWT_PRIVATE_KEY = "yahaha";
    public static byte[] toUTF8(String s) {
        System.out.println(s);
        try{
            return s.getBytes("utf-8");
        } catch(UnsupportedEncodingException e) {
            System.out.printf("中文转utf8编码报错", e); // 打印异常信息
            return s.getBytes(); // 尝试使用用默认编码
        }
    }
    public static String generateToken(UserToken userToken, int expire){
//        JwtClaims claims = new JwtClaims();
////        claims.setSubject(userToken.getUsername());
//        claims.setClaim(CONTEXT_USER_NAME, userToken.getUsername());
//        claims.setClaim(CONTEXT_USER_ID, userToken.getId());
//        claims.setExpirationTimeMinutesInTheFuture(expire == 0 ? 60*24 : expire);
//        byte[] bs = toUTF8(JWT_PRIVATE_KEY);
//        System.out.println("我的编码结果" + bs);
//        Algorithm secretKey = Algorithm.HMAC256(bs); //生成的是Algorithm类型的,jws.setKey()接收的是Key类型的
//
//        JsonWebSignature jws = new JsonWebSignature();
//        jws.setHeader("typ", "JWT"); // header头部, 指定了其Token类型和所使用的加密算法
//        jws.setAlgorithmHeaderValue(AlgorithmIdentifiers.HMAC_SHA256); // 等价与jws.setHeader("alg", "HS256");
//        jws.setPayload(claims.toJson()); // 载荷, 存放的是Claims声明信息。载荷其实就是自定义的数据，一般存储用户Id，过期时间等信息。
//        jws.setKey((Key) secretKey); // 这里设置key会在getCompactSerialization中调用sing方法被使用(这里key.length * 8的长度要满足超过一个最小值)
//        jws.setDoKeyValidation(true); // 这里设置成false会在getgetCompactSerialization()生成token的时候不去管setKey传进去的key


        try{
            Date expiresAt = new Date(System.currentTimeMillis() + 24L * 60L * 3600L * 1000L);
            byte[] bs = toUTF8(JWT_PRIVATE_KEY);
            String token = JWT.create()
                    .withIssuer("lxh")
                    .withClaim(CONTEXT_USER_NAME, userToken.getUsername())
                    .withClaim(CONTEXT_USER_ID, userToken.getId())
                    .withExpiresAt(expiresAt)
                    .sign(Algorithm.HMAC256(bs));
            return token;
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        } catch (JWTCreationException e) {
            throw new RuntimeException(e);
        }
    }
    public static Boolean verifyToken(String token) {
        byte[] bs = toUTF8(JWT_PRIVATE_KEY);
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(bs))
                .withIssuer("lxh")
                .build();
        DecodedJWT jwt = verifier.verify(token);
        System.out.println("jwt内容" + jwt.getIssuer());
        System.out.println(CONTEXT_USER_NAME + ":"  + jwt.getClaim(CONTEXT_USER_NAME).asString());
        System.out.println(CONTEXT_USER_ID + ":" + jwt.getClaim(CONTEXT_USER_ID).asString());
        System.out.println("过期时间:" + jwt.getExpiresAt());
        return true;
    }
}
