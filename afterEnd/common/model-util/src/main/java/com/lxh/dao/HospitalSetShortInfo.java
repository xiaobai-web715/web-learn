package com.lxh.dao;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
public class HospitalSetShortInfo {
    @JsonSerialize(using = ToStringSerializer.class)
    private Integer id;
    private String hospName;
    public HospitalSetShortInfo setId(final Integer id) {
        this.id = id;
        return this;
    }
    public Integer getId() {
        return this.id;
    }
    public String getHospName() {
        return this.hospName;
    }

    public HospitalSetShortInfo setHospName(final String hospName) {
        System.out.println(hospName);
        this.hospName = hospName;
        return this;
    }
}
