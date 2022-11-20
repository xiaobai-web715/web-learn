package com.lxh.mybatis.entity;

import java.util.Date;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.ToString;


@ToString
public class hospSet {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_set.id
     *
     * @mbggenerated
     */
    private Long id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_set.hospname
     *
     * @mbggenerated
     */
    private String hospname;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_set.hospcode
     *
     * @mbggenerated
     */
    private String hospcode;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_set.api_url
     *
     * @mbggenerated
     */
    private String apiUrl;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_set.sign_key
     *
     * @mbggenerated
     */
    private String signKey;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_set.contacts_name
     *
     * @mbggenerated
     */
    private String contactsName;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_set.contacts_phone
     *
     * @mbggenerated
     */
    private String contactsPhone;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_set.status
     *
     * @mbggenerated
     */
    private Byte status;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_set.create_time
     *
     * @mbggenerated
     */

    @TableField(value="create_time", fill= FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GNT+8")
    private Date createTime;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_set.update_time
     *
     * @mbggenerated
     */
    @TableField(value="update_time", fill=FieldFill.INSERT_UPDATE)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GNT+8")
    private Date updateTime;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_set.is_delete
     *
     * @mbggenerated
     */
    private Byte isDelete;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_set.id
     *
     * @return the value of hosp_set.id
     *
     * @mbggenerated
     */
    public Long getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_set.id
     *
     * @param id the value for hosp_set.id
     *
     * @mbggenerated
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_set.hospname
     *
     * @return the value of hosp_set.hospname
     *
     * @mbggenerated
     */
    public String getHospname() {
        return hospname;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_set.hospname
     *
     * @param hospname the value for hosp_set.hospname
     *
     * @mbggenerated
     */
    public void setHospname(String hospname) {
        this.hospname = hospname == null ? null : hospname.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_set.hospcode
     *
     * @return the value of hosp_set.hospcode
     *
     * @mbggenerated
     */
    public String getHospcode() {
        return hospcode;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_set.hospcode
     *
     * @param hospcode the value for hosp_set.hospcode
     *
     * @mbggenerated
     */
    public void setHospcode(String hospcode) {
        this.hospcode = hospcode == null ? null : hospcode.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_set.api_url
     *
     * @return the value of hosp_set.api_url
     *
     * @mbggenerated
     */
    public String getApiUrl() {
        return apiUrl;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_set.api_url
     *
     * @param apiUrl the value for hosp_set.api_url
     *
     * @mbggenerated
     */
    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl == null ? null : apiUrl.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_set.sign_key
     *
     * @return the value of hosp_set.sign_key
     *
     * @mbggenerated
     */
    public String getSignKey() {
        return signKey;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_set.sign_key
     *
     * @param signKey the value for hosp_set.sign_key
     *
     * @mbggenerated
     */
    public void setSignKey(String signKey) {
        this.signKey = signKey == null ? null : signKey.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_set.contacts_name
     *
     * @return the value of hosp_set.contacts_name
     *
     * @mbggenerated
     */
    public String getContactsName() {
        return contactsName;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_set.contacts_name
     *
     * @param contactsName the value for hosp_set.contacts_name
     *
     * @mbggenerated
     */
    public void setContactsName(String contactsName) {
        this.contactsName = contactsName == null ? null : contactsName.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_set.contacts_phone
     *
     * @return the value of hosp_set.contacts_phone
     *
     * @mbggenerated
     */
    public String getContactsPhone() {
        return contactsPhone;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_set.contacts_phone
     *
     * @param contactsPhone the value for hosp_set.contacts_phone
     *
     * @mbggenerated
     */
    public void setContactsPhone(String contactsPhone) {
        this.contactsPhone = contactsPhone == null ? null : contactsPhone.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_set.status
     *
     * @return the value of hosp_set.status
     *
     * @mbggenerated
     */
    public Byte getStatus() {
        return status;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_set.status
     *
     * @param status the value for hosp_set.status
     *
     * @mbggenerated
     */
    public void setStatus(Byte status) {
        this.status = status;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_set.create_time
     *
     * @return the value of hosp_set.create_time
     *
     * @mbggenerated
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_set.create_time
     *
     * @param createTime the value for hosp_set.create_time
     *
     * @mbggenerated
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_set.update_time
     *
     * @return the value of hosp_set.update_time
     *
     * @mbggenerated
     */
    public Date getUpdateTime() {
        return updateTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_set.update_time
     *
     * @param updateTime the value for hosp_set.update_time
     *
     * @mbggenerated
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_set.is_delete
     *
     * @return the value of hosp_set.is_delete
     *
     * @mbggenerated
     */
    public Byte getIsDelete() {
        return isDelete;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_set.is_delete
     *
     * @param isDelete the value for hosp_set.is_delete
     *
     * @mbggenerated
     */
    public void setIsDelete(Byte isDelete) {
        this.isDelete = isDelete;
    }
}