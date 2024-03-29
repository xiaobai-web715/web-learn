package com.lxh.mybatis.mapper;

import com.lxh.mybatis.entity.hospUser;
import com.lxh.mybatis.entity.hospUserExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface hospUserMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user
     *
     * @mbggenerated
     */
    int countByExample(hospUserExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user
     *
     * @mbggenerated
     */
    int deleteByExample(hospUserExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user
     *
     * @mbggenerated
     */
    int insert(hospUser record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user
     *
     * @mbggenerated
     */
    int insertSelective(hospUser record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user
     *
     * @mbggenerated
     */
    List<hospUser> selectByExample(hospUserExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user
     *
     * @mbggenerated
     */
    hospUser selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user
     *
     * @mbggenerated
     */
    int updateByExampleSelective(@Param("record") hospUser record, @Param("example") hospUserExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user
     *
     * @mbggenerated
     */
    int updateByExample(@Param("record") hospUser record, @Param("example") hospUserExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(hospUser record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(hospUser record);
}