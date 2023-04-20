package com.lxh.utils.result;

import lombok.ToString;

public class Test {
    public static void main(String[] args) {
        @ToString
        class TestResult {
            private String name;
        }
        TestResult test = new TestResult();
        test.name = "刘兴华";
//        System.out.println(ResultCodeEnum.SUCCESS.getCode());
//        System.out.println(Result.success(test));
    }
}
