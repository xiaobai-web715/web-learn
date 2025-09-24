package com.lxh.admin.converter;

import com.lxh.admin.entity.DocRouter;
import com.lxh.admin.dto.saveDocParams;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring") // 编译后生成 DocConverterImpl 并扔进 Spring 容器
public interface DocConverter {

    /* ====== DTO -> Entity ====== */
    // 字段名一样会自动拷；不想拷的字段在接口里忽略即可
    @Mapping(target = "userid", source = "userId")
    DocRouter toEntity(saveDocParams dto);

    /* ====== Entity -> VO ====== */
//    DocVO toVO(DocRouter entity);
}
