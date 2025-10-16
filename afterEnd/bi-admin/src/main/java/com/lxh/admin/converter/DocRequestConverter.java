package com.lxh.admin.converter;

import com.lxh.admin.dto.saveDocRequest;
import com.lxh.admin.entity.Doc;
import com.lxh.admin.entity.DocContent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface DocRequestConverter {

    // @Mapping(target = "userid", source = "userId")
    Doc toDocEntity(saveDocRequest dto);

    DocContent toDocContentEntity(saveDocRequest dto);
}
