package com.mybits.demombtest.handle;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;


//记录一个问题 java date 存储为spl date好像会丢失时分秒
import java.util.Date;

@Component //这个注解好像使得Springboot调用当前类
public class MyMetaObjectHandler implements MetaObjectHandler {
    //mp执行添加操作的时候当前方法会执行
    @Override
    public void insertFill(MetaObject metaObject){
        this.setFieldValByName("createTime", new Date(), metaObject);
        this.setFieldValByName("updateTime", new Date(), metaObject);
    }

    //mp执行修改操作的时候调用这个函数
    @Override
    public void updateFill(MetaObject metaObject){
        this.setFieldValByName("updateTime", new Date(), metaObject);
    }
}
