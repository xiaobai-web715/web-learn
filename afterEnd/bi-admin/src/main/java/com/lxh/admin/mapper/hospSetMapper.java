package com.lxh.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lxh.mybatis.entity.hospSet;
import com.lxh.mybatis.entity.hospSetExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface hospSetMapper extends BaseMapper<hospSet>  {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_set
     *
     * @mbggenerated
     */
    int countByExample(hospSetExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_set
     *
     * @mbggenerated
     */
    int deleteByExample(hospSetExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_set
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_set
     *
     * @mbggenerated
     */
    int insert(hospSet record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_set
     *
     * @mbggenerated
     */
    int insertSelective(hospSet record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_set
     *
     * @mbggenerated
     */
    List<hospSet> selectByExample(hospSetExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_set
     *
     * @mbggenerated
     */
    hospSet selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_set
     *
     * @mbggenerated
     */
    int updateByExampleSelective(@Param("record") hospSet record, @Param("example") hospSetExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_set
     *
     * @mbggenerated
     */
    int updateByExample(@Param("record") hospSet record, @Param("example") hospSetExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_set
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(hospSet record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_set
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(hospSet record);
}