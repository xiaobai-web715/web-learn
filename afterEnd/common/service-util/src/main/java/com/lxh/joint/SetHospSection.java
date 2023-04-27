package com.lxh.joint;

import java.util.List;

public class SetHospSection {
    @Override
    public String toString() {
        return "SetHospSection{" +
                "sectionList=" + sectionList +
                ", hospId=" + hospId +
                '}';
    }
    public Integer id;
    public List<Integer> sectionList;
    public Integer hospId;


    public List<Integer> getSectionList() {
        return sectionList;
    }

    public void setSectionList(List<Integer> sectionList) {
        this.sectionList = sectionList;
    }

    public Integer getHospId() {
        return hospId;
    }

    public void setHospId(Integer id) {
        this.hospId = id;
    }
}
