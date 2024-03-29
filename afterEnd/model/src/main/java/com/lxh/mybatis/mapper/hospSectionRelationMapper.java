package com.lxh.mybatis.mapper;

import com.lxh.mybatis.entity.hospSectionRelation;
import com.lxh.mybatis.entity.hospSectionRelationExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface hospSectionRelationMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    int countByExample(hospSectionRelationExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    int deleteByExample(hospSectionRelationExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(@Param("ancestor") Integer ancestor, @Param("descendant") Integer descendant);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    int insert(hospSectionRelation record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    int insertSelective(hospSectionRelation record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    List<hospSectionRelation> selectByExample(hospSectionRelationExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    hospSectionRelation selectByPrimaryKey(@Param("ancestor") Integer ancestor, @Param("descendant") Integer descendant);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    int updateByExampleSelective(@Param("record") hospSectionRelation record, @Param("example") hospSectionRelationExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    int updateByExample(@Param("record") hospSectionRelation record, @Param("example") hospSectionRelationExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(hospSectionRelation record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_section_relation
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(hospSectionRelation record);
}