package com.lxh.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lxh.joint.Router;
import com.lxh.mybatis.entity.hospRouter;
import com.lxh.mybatis.entity.hospRouterExample;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface hospRouterMapper extends BaseMapper<hospRouter> {
    @Select("SELECT * from hosp_router a LEFT JOIN hosp_router_relation b on a.id=b.descendant")
    List<Router> getRouter();
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_router
     *
     * @mbggenerated
     */
    int countByExample(hospRouterExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_router
     *
     * @mbggenerated
     */
    int deleteByExample(hospRouterExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_router
     *
     * @mbggenerated
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_router
     *
     * @mbggenerated
     */
    int insert(hospRouter record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_router
     *
     * @mbggenerated
     */
    int insertSelective(hospRouter record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_router
     *
     * @mbggenerated
     */
    List<hospRouter> selectByExample(hospRouterExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_router
     *
     * @mbggenerated
     */
    hospRouter selectByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_router
     *
     * @mbggenerated
     */
    int updateByExampleSelective(@Param("record") hospRouter record, @Param("example") hospRouterExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_router
     *
     * @mbggenerated
     */
    int updateByExample(@Param("record") hospRouter record, @Param("example") hospRouterExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_router
     *
     * @mbggenerated
     */
    int updateByPrimaryKeySelective(hospRouter record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table hosp_router
     *
     * @mbggenerated
     */
    int updateByPrimaryKey(hospRouter record);
}