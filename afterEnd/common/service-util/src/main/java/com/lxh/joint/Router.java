package com.lxh.joint;

public class Router {
    public Long id;
    public Float pid;
    public Float fPid;
    public String path;
    public String name;
    public String title;
    public String filePath;
    public Integer ancestor;
    public Integer descendant;
    public Integer distance;

    @Override
    public String toString() {
        return "Router{" +
                "id=" + id +
                ", pid=" + pid +
                ", fPid=" + fPid +
                ", path='" + path + '\'' +
                ", name='" + name + '\'' +
                ", title='" + title + '\'' +
                ", filePath='" + filePath + '\'' +
                ", ancestor=" + ancestor +
                ", descendant=" + descendant +
                ", distance=" + distance +
                '}';
    }
}
