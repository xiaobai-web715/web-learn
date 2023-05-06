package com.lxh.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lxh.dao.UserTokenInfo;
import com.lxh.mybatis.entity.hospUser;
import com.lxh.admin.service.impl.UserSetService;
import com.lxh.utils.image.ImageUtil;
import com.lxh.utils.result.Result;
import com.lxh.utils.token.UserToken;
import com.lxh.utils.utils.print;
import com.lxh.utils.token.GenerateToken;
import org.apache.shenyu.client.springcloud.annotation.ShenyuSpringCloudClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedOutputStream;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/admin/hosp/user")
@ShenyuSpringCloudClient(path = "/user")
public class UserSetController {
    @Autowired
    private UserSetService userSetService;

    @PostMapping("/login")
    @ShenyuSpringCloudClient(path = "/login")
    public Result login(@RequestBody hospUser userInfo){
        String user = userInfo.getUser();
        String password = userInfo.getPassword();
        LambdaQueryWrapper<hospUser> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(hospUser::getUser, user); //借助hospUser表进条件查询
        List<hospUser> list = userSetService.list(queryWrapper);
        print.printArray(list); //遍历数组进行打印
        if (list.size() > 0) {
            hospUser useInfoTarget = list.get(0);
            String userPassword = useInfoTarget.getPassword();
            String userName = useInfoTarget.getUser();
            Long uid = useInfoTarget.getId();
            if (Objects.equals(password, userPassword)) {
//                用户登录密码与数据库存储相同
                UserToken userToken = new UserToken().setUserInfo(uid, userName);
                String token = GenerateToken.generateToken(userToken, 0);
//                System.out.println(token);
                UserTokenInfo userLoginInfo = new UserTokenInfo().createUserTokenInfo(uid, userName, token);
                return Result.success(userLoginInfo);
            } else {
                return Result.fail(null);
            }
        } else {
            return Result.noUser(null);
        }
    };
    @PostMapping("/register")
    @ShenyuSpringCloudClient(path = "/register")
    public Result register(@RequestBody hospUser userInfo) {
//        System.out.print(userInfo);
        Boolean result = userSetService.save(userInfo);
//        System.out.print(result);
        if (result) {
            return Result.success(true);
        } else {
            return Result.fail(null);
        }
    }

    @PostMapping("/uploadImage")
    @ShenyuSpringCloudClient(path = "/uploadImage")
    @ResponseBody
    public Result setUserImage(HttpServletRequest request) {
        MultipartHttpServletRequest params = ((MultipartHttpServletRequest) request);
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        String filename = params.getParameter("filename");
//        System.out.println("filename:"+filename);
//        System.out.println("files length:"+files.size());
        for (int i = 0; i < files.size(); i++) {
            MultipartFile file = files.get(i);
//            获取文件后缀
            String suffixName = ImageUtil.getImagePath(file);
            System.out.println("文件后缀名" + suffixName);
//            生成新文件名
            String newFileName = ImageUtil.getNewFileName(suffixName);
            System.out.println("新的文件名" + newFileName);
//            保存文件
//            File file = new File(ImageUtil.get)
        }
        return Result.success(200);
    }
}
