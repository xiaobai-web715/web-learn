package com.lxh.mybatis.entity;

public class hospRouter {
    @Override
    public String toString() {
        return "hospRouter{" +
                "id=" + id +
                ", pid=" + pid +
                ", fPid=" + fPid +
                ", path='" + path + '\'' +
                ", name='" + name + '\'' +
                ", title='" + title + '\'' +
                ", filePath='" + filePath + '\'' +
                '}';
    }

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_router.id
     *
     * @mbggenerated
     */
    private Long id;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_router.pid
     *
     * @mbggenerated
     */
    private Float pid;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_router.f_pid
     *
     * @mbggenerated
     */
    private Float fPid;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_router.path
     *
     * @mbggenerated
     */
    private String path;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_router.name
     *
     * @mbggenerated
     */
    private String name;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_router.title
     *
     * @mbggenerated
     */
    private String title;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database column hosp_router.file_path
     *
     * @mbggenerated
     */
    private String filePath;

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_router.id
     *
     * @return the value of hosp_router.id
     *
     * @mbggenerated
     */
    public Long getId() {
        return id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_router.id
     *
     * @param id the value for hosp_router.id
     *
     * @mbggenerated
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_router.pid
     *
     * @return the value of hosp_router.pid
     *
     * @mbggenerated
     */
    public Float getPid() {
        return pid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_router.pid
     *
     * @param pid the value for hosp_router.pid
     *
     * @mbggenerated
     */
    public void setPid(Float pid) {
        this.pid = pid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_router.f_pid
     *
     * @return the value of hosp_router.f_pid
     *
     * @mbggenerated
     */
    public Float getfPid() {
        return fPid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_router.f_pid
     *
     * @param fPid the value for hosp_router.f_pid
     *
     * @mbggenerated
     */
    public void setfPid(Float fPid) {
        this.fPid = fPid;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_router.path
     *
     * @return the value of hosp_router.path
     *
     * @mbggenerated
     */
    public String getPath() {
        return path;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_router.path
     *
     * @param path the value for hosp_router.path
     *
     * @mbggenerated
     */
    public void setPath(String path) {
        this.path = path == null ? null : path.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_router.name
     *
     * @return the value of hosp_router.name
     *
     * @mbggenerated
     */
    public String getName() {
        return name;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_router.name
     *
     * @param name the value for hosp_router.name
     *
     * @mbggenerated
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_router.title
     *
     * @return the value of hosp_router.title
     *
     * @mbggenerated
     */
    public String getTitle() {
        return title;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_router.title
     *
     * @param title the value for hosp_router.title
     *
     * @mbggenerated
     */
    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method returns the value of the database column hosp_router.file_path
     *
     * @return the value of hosp_router.file_path
     *
     * @mbggenerated
     */
    public String getFilePath() {
        return filePath;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method sets the value of the database column hosp_router.file_path
     *
     * @param filePath the value for hosp_router.file_path
     *
     * @mbggenerated
     */
    public void setFilePath(String filePath) {
        this.filePath = filePath == null ? null : filePath.trim();
    }
}