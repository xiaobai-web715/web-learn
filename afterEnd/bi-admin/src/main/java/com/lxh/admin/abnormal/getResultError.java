package com.lxh.admin.abnormal;

import com.lxh.utils.result.Result;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@ResponseBody
@ControllerAdvice
public class getResultError {
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(value = {resultError.class})
    public resultError resultErrorServletRequest(resultError ex, HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("全局异常捕获" + ex);
        return ex;
    }
}
