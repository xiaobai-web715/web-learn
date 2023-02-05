package com.lxh.utils.utils;


import java.util.Arrays;
import java.util.List;

public class print<T> {
    public static <T> void printArray(List<T> result) {
        System.out.println(result.size());
        for (int i = 0; i < result.size(); i++) {

            System.out.println(result.get(i));
        }
    };
}
