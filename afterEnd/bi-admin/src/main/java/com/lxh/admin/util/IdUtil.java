package com.lxh.admin.util;

import cn.hutool.core.lang.Snowflake;

public class IdUtil {
    private static final Snowflake SNOW = new Snowflake();

    public static String nextId() {
        return String.valueOf(SNOW.nextId());
    }
}
