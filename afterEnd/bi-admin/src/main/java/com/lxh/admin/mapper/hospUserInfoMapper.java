package com.lxh.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lxh.joint.Router;
import com.lxh.mybatis.entity.hospUserInfo;
import com.lxh.mybatis.entity.hospUserInfoExample;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface hospUserInfoMapper extends BaseMapper<hospUserInfo> {
    @Select("select * from hosp_user_info order by rand() limit 1")
    hospUserInfo getRandInfo();
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user_info
     *
     * @mbggenerated
     */
    int countByExample(hospUserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user_info
     *
     * @mbggenerated
     */
    int deleteByExample(hospUserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user_info
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(@Param("id") Integer id, @Param("uid") Integer uid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user_info
     *
     * @mbggenerated
     */
    int insert(hospUserInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user_info
     *
     * @mbggenerated
     */
    int insertSelective(hospUserInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user_info
     *
     * @mbggenerated
     */
    List<hospUserInfo> selectByExample(hospUserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user_info
     *
     * @mbggenerated
     */
    hospUserInfo selectByPrimaryKey(@Param("id") Integer id, @Param("uid") Integer uid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user_info
     *
     * @mbggenerated
     */
    int updateByExampleSelective(@Param("record") hospUserInfo record, @Param("example") hospUserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user_info
     *
     * @mbggenerated
     */
    int updateByExample(@Param("record") hospUserInfo record, @Param("example") hospUserInfoExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user_info
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(hospUserInfo record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_user_info
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(hospUserInfo record);
}