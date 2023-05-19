package com.lxh.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.lxh.dao.UserTokenInfo;
import com.lxh.mybatis.entity.hospUser;
import com.lxh.admin.service.impl.UserSetService;
import com.lxh.admin.mapper.hospUserInfoMapper;
import com.lxh.mybatis.entity.hospUserInfo;
import com.lxh.utils.image.ImageUtil;
import com.lxh.utils.image.UpLoadFileState;
import com.lxh.utils.image.UpLoadFileCodeEnum;
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
import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/admin/hosp/user")
@ShenyuSpringCloudClient(path = "/user")
public class UserSetController {
    @Autowired
    private UserSetService userSetService;
    @Autowired
    private hospUserInfoMapper useSetInfo;

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
            int uid = useInfoTarget.getId();
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
    @PostMapping("/getUserInfo")
    @ShenyuSpringCloudClient(path = "/getUserInfo")
//    这里前端部分最好改成xxxx的格式
    public Result getUserInfo(@RequestParam("uid") int uid) {
        hospUser info = userSetService.getById(uid);
        hospUserInfo imageInfo = useSetInfo.selectById(uid);
        System.out.println("info" + info);
        System.out.println("imageInfo" + imageInfo);
        return Result.success(11);
    }

    @PostMapping("/uploadImage")
    @ShenyuSpringCloudClient(path = "/uploadImage")
    @ResponseBody
    public Result setUserImage(HttpServletRequest request) {
        MultipartHttpServletRequest params = ((MultipartHttpServletRequest) request);
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        String userId = params.getParameter("uid");
        int uid = Integer.parseInt(userId.trim());
        System.out.printf("uid" + uid);
        System.out.println("files length:"+files.size());
        UpLoadFileState[] UpLoadFileStateList = new UpLoadFileState[files.size()];
        for (int i = 0; i < files.size(); i++) {
            UpLoadFileState fileUpInfo;
            if (!files.isEmpty()) {
                MultipartFile file = files.get(i);
//            获取文件后缀
                String suffixName = ImageUtil.getImagePath(file);
                System.out.println("文件后缀名" + suffixName);
//            生成新文件名
                String newFileName = ImageUtil.getNewFileName(suffixName);
                System.out.println("新的文件名" + newFileName);
//            获取文件保存路径
                File fileDest = new File(ImageUtil.getNewImagePath(newFileName));
                System.out.println("fileDest" + fileDest.getPath());
                if (!fileDest.getParentFile().exists()) {
                    // 检测上级文件是否存在，不存在新建文件夹
                    fileDest.getParentFile().mkdirs();
                }
//            保存文件
                Boolean state = ImageUtil.saveImage(ImageUtil.getNewImagePath(newFileName), file);
                if (state) {
                    hospUserInfo insertInfo = new hospUserInfo();
                    insertInfo.setUid(uid);
                    insertInfo.setHeaderImage(fileDest.getPath());
                    System.out.println("insertInfo" + insertInfo);
                    useSetInfo.insert(insertInfo);
                    fileUpInfo = new UpLoadFileState().setUpLoadFileState(file.getOriginalFilename(), UpLoadFileCodeEnum.SUCCESS.getCode());
                } else {
                    fileUpInfo = new UpLoadFileState().setUpLoadFileState(file.getOriginalFilename(), UpLoadFileCodeEnum.FAIL.getCode());
                }
            } else {
                fileUpInfo = new UpLoadFileState().setUpLoadFileState("", UpLoadFileCodeEnum.EMPTY.getCode());
            }
            Arrays.fill(UpLoadFileStateList, fileUpInfo);
        }
        return Result.success(UpLoadFileStateList);
    }
}
