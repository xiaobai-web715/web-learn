package com.lxh.joint;

public class Section {
    public int id;
    public String sectionName; // 科室名称
    public int ancestor; // 祖先节点id
    public int descendant; //当前节点id
    public int distance;

    @Override
    public String toString() {
        return "Section{" +
                "id=" + id +
                ", sectionName='" + sectionName + '\'' +
                ", ancestor=" + ancestor +
                ", descendant=" + descendant +
                ", distance=" + distance +
                '}';
    }
}
