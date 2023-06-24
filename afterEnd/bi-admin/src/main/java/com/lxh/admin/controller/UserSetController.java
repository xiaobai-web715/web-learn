package com.lxh.admin.controller;

import com.auth0.jwt.JWTVerifier;
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
import com.lxh.utils.result.ResultCodeEnum;
import com.lxh.utils.token.UserToken;
import com.lxh.utils.utils.print;
import com.lxh.utils.token.GenerateToken;
import org.apache.shenyu.client.springcloud.annotation.ShenyuSpringCloudClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLDecoder;
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
    protected static String handlingFile(UpLoadFileState[] fileResultList, List<MultipartFile> files, int uid, hospUserInfoMapper useSetInfo) {
        String filePath = "";
        for (int i = 0; i < files.size(); i++) {
            UpLoadFileState fileUpInfo;
            if (!files.isEmpty()) {
                MultipartFile file = files.get(i);
//            获取文件后缀
                String suffixName = ImageUtil.getImagePath(file);
//                System.out.println("文件后缀名" + suffixName);
//            生成新文件名
                String newFileName = ImageUtil.getNewFileName(suffixName);
//                System.out.println("新的文件名" + newFileName);
//            获取文件保存路径
                File fileDest = new File(ImageUtil.getNewImagePath(newFileName));
                filePath = fileDest.getPath();
//                System.out.println("fileDest" + fileDest.getPath());
                if (!fileDest.getParentFile().exists()) {
                    // 检测上级文件是否存在，不存在新建文件夹
                    fileDest.getParentFile().mkdirs();
                }
//            保存文件
                Boolean state = ImageUtil.saveImage(ImageUtil.getNewImagePath(newFileName), file);
                if (state) {
                    fileUpInfo = new UpLoadFileState().setUpLoadFileState(file.getOriginalFilename(), UpLoadFileCodeEnum.SUCCESS.getCode());
                } else {
                    fileUpInfo = new UpLoadFileState().setUpLoadFileState(file.getOriginalFilename(), UpLoadFileCodeEnum.FAIL.getCode());
                }
            } else {
                fileUpInfo = new UpLoadFileState().setUpLoadFileState("", UpLoadFileCodeEnum.EMPTY.getCode());
            }
            Arrays.fill(fileResultList, fileUpInfo);
        }
        return filePath;
    }
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
            System.out.println("用户登录信息" + userName.toString());
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
    @PostMapping("/getUserImage")
    @ShenyuSpringCloudClient(path = "/getUserImage")
//    这里前端部分最好改成xxxx的格式(获取图片的二进制流)
    public void getUserImage(@RequestParam("uid") int uid, HttpServletResponse response) throws IOException {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        UserSetService useSretService = (UserSetService) context.getBean("UserSetService");
        String info = useSretService.aroundTest();
        System.out.println(info);
        LambdaQueryWrapper<hospUserInfo> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(hospUserInfo::getUid, uid);
        Boolean userHaveImage = useSetInfo.exists(wrapper);
//        System.out.println("用户的图片信息" + userHaveImage);
        if (userHaveImage) {
            hospUserInfo imageInfo = useSetInfo.selectOne(wrapper);
            String filePath = imageInfo.getHeaderImage();
            if (filePath.contains("%")) {
                try {
                    filePath = URLDecoder.decode(filePath, "UTF-8");
                } catch (UnsupportedEncodingException e) {
                    throw new RuntimeException(e);
                }
            }
            ServletOutputStream out = null;
            FileInputStream in = null;
            try {
                in = new FileInputStream(new File(filePath));
//            \\\\这样才是真正的匹配单反斜杠
                String[] dir = filePath.split("\\\\");
                String fileName = dir[dir.length - 1];
                String[] array = fileName.split("\\.");
                String fileType = array[array.length - 1];
                // contains方法判断当前字符串当中是否含有子字符串
                if ("jpg,jepg,gif,png".contains(fileType)) {
                    response.setContentType("image/" + fileType);
                } else if ("pdf".contains(fileType)) {
                    // pdf类型
                    response.setContentType("application/pdf");
                } else {
                    // 自动判断下载类型
                    response.setContentType("multipart/form-data");
                }
                out = response.getOutputStream();
                // 读取字节流 (IO流体系:字节流、字符流 => 字符流仅能处理字符(txt文件), 字节流可以处理所有以bit为单位的文件)
                int len = 0;
                int totalBytes = 0;
                byte[] buffer = new byte[1024 * 10];
                while ((len = in.read(buffer)) != -1) {
                    totalBytes += len;
                    // FileInputStream.read(byte[] a) 将文件流中的字节缓冲到数组a当中,会返回长度,当流读取完成的时候会返回-1
                    out.write(buffer, 0, len);
                }
                System.out.println("我是文件的长度" + totalBytes);
                // ??这里的content-type设置好像不起作用
                response.setContentLength(totalBytes);
                out.flush();
                response.setStatus(ResultCodeEnum.SUCCESS.getCode());
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            } catch (IOException e) {
                throw new RuntimeException(e);
            } finally {
                try {
                    assert out != null;
                    out.close();
                    in.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        } else {
            response.getOutputStream().close();
            response.setStatus(ResultCodeEnum.PASSWORDERROR.getCode());
        }
    }

    @PostMapping("/uploadImage")
    @ShenyuSpringCloudClient(path = "/uploadImage")
    @ResponseBody
    public Result setUserImage(HttpServletRequest request) {
        MultipartHttpServletRequest params = ((MultipartHttpServletRequest) request);
        List<MultipartFile> files = ((MultipartHttpServletRequest) request).getFiles("file");
        String userId = params.getParameter("uid");
        int uid = Integer.parseInt(userId.trim());
        LambdaQueryWrapper<hospUserInfo> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(hospUserInfo::getUid, uid);
        Boolean haveImage = useSetInfo.exists(queryWrapper);
//        System.out.printf("uid" + uid);
//        System.out.println("files length:"+files.size());
        if (haveImage) {
            System.out.println("当前用户已有头像存储");
            hospUserInfo existsInfo = useSetInfo.selectOne(queryWrapper);
            File file = new File(existsInfo.getHeaderImage());
            if (file.isFile() && file.exists()) {
                file.delete();
            }
            UpLoadFileState[] UpLoadFileStateList = new UpLoadFileState[files.size()];
            String filePath = handlingFile(UpLoadFileStateList, files, uid, useSetInfo);
            hospUserInfo info = new hospUserInfo();
            info.setUid(uid);
            info.setHeaderImage(filePath);
//            System.out.println("info" + info);
            try {
                int updateNum = useSetInfo.update(info, queryWrapper);
                return Result.success(UpLoadFileStateList);
            } catch(Error e) {
                return Result.fail("更新失败");
            }
        } else {
            UpLoadFileState[] UpLoadFileStateList = new UpLoadFileState[files.size()];
            String filePath = handlingFile(UpLoadFileStateList, files, uid, useSetInfo);
            hospUserInfo insertInfo = new hospUserInfo();
            insertInfo.setUid(uid);
            insertInfo.setHeaderImage(filePath);
//            System.out.println("insertInfo" + insertInfo);
            useSetInfo.insert(insertInfo);
            return Result.success(UpLoadFileStateList);
        }
    }
}
