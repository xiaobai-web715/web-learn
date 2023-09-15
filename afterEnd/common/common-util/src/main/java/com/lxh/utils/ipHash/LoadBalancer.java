package com.lxh.utils.ipHash;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

//这种简单的charCode累加的ipHash会有重复的hash值产生
public class LoadBalancer {
    private TreeMap<Integer, String> serverMap;
    public LoadBalancer(List<String> serverList) {
        // 构造方法, 与类同名,没有返回值,new的时候自动调用
        for(String server: serverList) {
            int hash = getHase(server);
            serverMap.put(hash, server);
        }
    }
    public String getServer(String clientIP) {
        int hash = getHase(clientIP);
        Map.Entry<Integer, String> entry = serverMap.ceilingEntry(hash); //使用ceilingEntry方法查找大于等于该哈希值的最小键值对
        if (entry == null) {
            entry = serverMap.firstEntry(); //如果没有匹配的就取最近的
        }
        return entry.getValue();
    }
    public int getHase(String server) {
        int hash = 0;
        for (char c: server.toCharArray()) {
            hash += c;
        }
        return hash;
    }
    public TreeMap<Integer, String> getMapHash() {
        return serverMap;
    }
}
