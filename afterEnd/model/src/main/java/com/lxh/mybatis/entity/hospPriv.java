package com.lxh.mybatis.entity;

public class hospPriv {
    @Override
    public String toString() {
        return "hospPriv{" +
                "id=" + id +
                ", hospId=" + hospId +
                ", sectionList='" + sectionList + '\'' +
                '}';
    }

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_priv.id
     *
     * @mbggenerated
     */
    private Integer id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_priv.hosp_id
     *
     * @mbggenerated
     */
    private Integer hospId;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_priv.section_list
     *
     * @mbggenerated
     */
    private String sectionList;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_priv.id
     *
     * @return the value of hosp_priv.id
     *
     * @mbggenerated
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_priv.id
     *
     * @param id the value for hosp_priv.id
     *
     * @mbggenerated
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_priv.hosp_id
     *
     * @return the value of hosp_priv.hosp_id
     *
     * @mbggenerated
     */
    public Integer getHospId() {
        return hospId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_priv.hosp_id
     *
     * @param hospId the value for hosp_priv.hosp_id
     *
     * @mbggenerated
     */
    public void setHospId(Integer hospId) {
        this.hospId = hospId;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_priv.section_list
     *
     * @return the value of hosp_priv.section_list
     *
     * @mbggenerated
     */
    public String getSectionList() {
        return sectionList;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_priv.section_list
     *
     * @param sectionList the value for hosp_priv.section_list
     *
     * @mbggenerated
     */
    public void setSectionList(String sectionList) {
        this.sectionList = sectionList == null ? null : sectionList.trim();
    }
}