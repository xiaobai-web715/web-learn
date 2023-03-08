package com.lxh.hosp.controller;

import com.lxh.mybatis.entity.hospSet;

public class pageClass extends hospSet {
    @Override
    public String toString() {
        return "pageClass{" +
                "page=" + page + '\'' +
                ", pageSize=" + pageSize + '\'' +
                ", id=" + getId() + '\'' +
                ", hospname='" + getHospname() + '\'' +
                ", hospcode='" + getHospcode() + '\'' +
                ", apiUrl='" + getApiUrl() + '\'' +
                ", signKey='" + getSignKey() + '\'' +
                ", contactsName='" + getContactsName() + '\'' +
                ", contactsPhone='" + getContactsPhone() + '\'' +
                ", status=" + getStatus() + '\'' +
                ", createTime=" + getCreateTime() + '\'' +
                ", updateTime=" + getUpdateTime() + '\'' +
                ", isDelete=" + getIsDelete() + '\'' +
                '}';
    }

    private int page = 1;

    private int pageSize = 10;

    public int getPage() {return page;}
    public void setPage(int page) {this.page = page;}
    public int getPageSize() {return pageSize;}
    public void setPageSize(int pageSize) {this.pageSize = pageSize;}
}
