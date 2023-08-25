package com.lxh.utils.image;

import com.lxh.dao.CreateLayerInfo;
import org.apache.tomcat.util.buf.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

public class ImageUtil {
    private final static String SAVE_IMAGE_PATH = "E:/test/";
    static String nowDate;
    //画板宽度
    private  static  int SKET_WIDTH = 300;
    //画板高度
    private  static  int SKET_HEIGHT = 150;
    //抠图上面的半径
    private static int RADIUS = 8;
    //抠图区域的高度
    private static int TAM_HEIGHT = 40;
    //抠图区域的宽度
    private static int TAM_WIDTH = 40;
    public static String getImagePath(MultipartFile file) {
//        获取文件后缀
        String fileName = file.getOriginalFilename(); //获取文件名称
        System.out.println("fileName" + fileName);
        int index = fileName.indexOf(".");
        return fileName.substring(index, fileName.length());
    }
    public static String getNewFileName(String suffixName) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String date = sdf.format(new Date());
        nowDate = date;
        return date + UUID.randomUUID() + suffixName;
    }
    public static String getNewImagePath(String name) {
        System.out.println("文件夹" + SAVE_IMAGE_PATH + nowDate + '/' + name);
        return SAVE_IMAGE_PATH + nowDate + '/' + name;
    }
    public static Boolean saveImage(String filePath, MultipartFile file) {
        try{
            // 保存文件（当前文件路径必须存在否则报错）
            byte[] bytes = file.getBytes();
            System.out.println(bytes.length);
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(
                    new File(filePath)));//设置文件路径及名字
            stream.write(bytes);// 写入
            stream.close();
//            file.transferTo(dest);
            return true;
        } catch(IllegalStateException | IOException e){
            e.printStackTrace();
        }
        return false;
    }

    /**
     *
     * @param oriImage 原图
     * @return
     */
    public static int[][] getBlockData (BufferedImage oriImage, int x, int y) {
        int ORI_WIDTH = oriImage.getWidth();
        int ORI_HEIGHT = oriImage.getHeight();
        Random random = new Random();
        int randomDir = random.nextInt(4) + 1; // 1,2,3,4分别代表左上, 右上, 右下, 左下
        int[][] blockData = new int[ORI_WIDTH][ORI_HEIGHT]; //创建一个图层大小的二维数组
        // 凹陷点((pitX1, pitY1), (pitX2, pitY2))
        int pitX1;
        int pitY1;
        int pitX2;
        int pitY2;
        switch(randomDir) {
            case 2:
                pitX1 = x + TAM_WIDTH / 2;
                pitY1 = y;
                pitX2 = x + TAM_WIDTH;
                pitY2 = y + TAM_HEIGHT / 2;
                break;
            case 3:
                pitX1 = x + TAM_WIDTH / 2;
                pitY1 = y + TAM_HEIGHT;
                pitX2 = x + TAM_WIDTH;
                pitY2 = y + TAM_HEIGHT / 2;
                break;
            case 4:
                pitX1 = x + TAM_WIDTH / 2;
                pitY1 = y + TAM_HEIGHT;
                pitX2 = x;
                pitY2 = y + TAM_HEIGHT / 2;
                break;
            default:
                pitX1 = x + TAM_WIDTH / 2;
                pitY1 = y;
                pitX2 = x;
                pitY2 = y + TAM_HEIGHT / 2;
                break;
        }
        System.out.println("我是抠图起点的坐标:" + x + "x" + "y" + " 我是两个凹陷圆的中心点坐标:" + "(" + pitX1 + "," + pitY1 + ")" + ","  + "(" + pitX2 + "," + pitY2 + ")");
        for (int i = 0; i < ORI_WIDTH; i++) {
            for(int j = 0; j < ORI_HEIGHT; j++) {
                if (i >= x && j >= y && i <= x + TAM_WIDTH && j <= y + TAM_HEIGHT) {
                    blockData[i][j] = 2;
                } else {
                    blockData[i][j] = 0;
                }
            }
        }
        for (int i = pitX1 - RADIUS; i <= pitX1 + RADIUS; i++) {
            for (int j = pitY1 - RADIUS; j <= pitY1 + RADIUS; j++) {
                if (Math.pow(Math.abs(i - pitX1), 2) + Math.pow(Math.abs(j - pitY1), 2) <= Math.pow(RADIUS, 2)) {
                    // 说明在圆内
                    blockData[i][j] = 0;
                }
            }
        }
        for (int i = pitX2 - RADIUS; i <= pitX2 + RADIUS; i++) {
            for (int j = pitY2 - RADIUS; j <= pitY2 + RADIUS; j++) {
                if (Math.pow(Math.abs(i - pitX2), 2) + Math.pow(Math.abs(j - pitY2), 2) <= Math.pow(RADIUS, 2)) {
                    blockData[i][j] = 2;
                }
            }
        }
        return blockData;
    }
    /**
     *
     * @param oriImage 原图
     * @param newImage 裁剪图
     * @param blockData 0/2分布的二维矩阵(画板宽高矩阵)
     * @param x 横坐标(裁剪起点)
     * @param y 纵坐标(裁剪起点)
     */
    public static CreateLayerInfo createLayer(BufferedImage oriImage, BufferedImage newImage, int[][] blockData, int x, int y) {
        Map<String, BufferedImage> map = new HashMap<String, BufferedImage>();
        int blockDataXStart = x - RADIUS;
        int blockDataXEnd = x + TAM_WIDTH + RADIUS;
        int blockDataYStart = y - RADIUS;
        int blockDataYEnd = y + TAM_HEIGHT + RADIUS;
        for (int i = blockDataXStart; i < blockDataXEnd; i++) {
            for (int j = blockDataYStart; j < blockDataYEnd; j++){
                int num = blockData[i][j];
                if (num == 2) {
//                    System.out.println("我是成功的数据" + i + "x" + j + "x" + blockDataXStart + "x" + blockDataYStart);
                    newImage.setRGB(i - blockDataXStart, j - blockDataYStart, oriImage.getRGB(i, j));
                    oriImage.setRGB(i, j, Color.gray.getRGB());
                }
//                else {
//                    System.out.println("我是报错的数据" + i + "x" + j + "x" + blockDataXStart + "x" + blockDataYStart);
//                    newImage.setRGB(i - blockDataXStart, j - blockDataYStart, Color.gray.getRGB());
//                }
            }
        }
        map.put("oriImage", oriImage);
        map.put("newImage", newImage);
//        try {
//            ImageIO.write(oriImage, "png", new File("E://oriImage.png"));
//            ImageIO.write(newImage, "png", new File("E://newImage.png"));
//        } catch (Exception e) {
//            System.out.println("e" + e);
//        }
        return new CreateLayerInfo().setImageMap(map).setX(x).setY(y);
    }
    public static CreateLayerInfo pictureTemplatesCut(InputStream targeFile) throws IOException {
        try {
            BufferedImage originalImage = ImageIO.read(targeFile);
            // 创建新的bufferImage对象并设置宽高
            BufferedImage sourceImage = new BufferedImage(SKET_WIDTH, SKET_HEIGHT, BufferedImage.TYPE_INT_RGB);
            // 获取Graphics2D对象
            Graphics2D g2d = sourceImage.createGraphics();
            g2d.drawImage(originalImage, 0, 0, SKET_WIDTH, SKET_HEIGHT, null);
            //释放g2d对象
            g2d.dispose();
            int sourceWidth = sourceImage.getWidth();
            int sourceHeight = sourceImage.getHeight();
            // 随机生成抠图坐标X,Y(保证x + TAM_WIDTH <= sourceWidth, y + TAM_HEIGHT <= sourceHeight)
            Random random = new Random();
            int widthRandom = random.nextInt(sourceWidth - 3 * TAM_WIDTH) + TAM_WIDTH;

            // int heightRandom = 1;
            int heightRandom = random.nextInt(sourceHeight - 3 * TAM_HEIGHT ) + TAM_HEIGHT;
//            System.out.println("原图大小: " + sourceWidth + "x" + sourceHeight + "抠图坐标: " + widthRandom + "x" + heightRandom);
            //获取抠图区域
            int [][] blockData = getBlockData(sourceImage, widthRandom, heightRandom);
//            for (int i = 0; i < blockData.length; i++) {
//                String result = "";
//                for (int j = 0; j < blockData[i].length; j ++) {
//                    result += blockData[i][j];
//                }
//                System.out.println(result);
//            }
            // 新建一个和裁剪区域一样大小的图像(裁剪区域要预留左右,上下分别一个圆半径的扩展)
            BufferedImage newImage = new BufferedImage(TAM_WIDTH + 2 * RADIUS, TAM_HEIGHT + 2 *RADIUS, BufferedImage.TYPE_INT_RGB);
            //获取画笔
            Graphics2D graphics = newImage.createGraphics();
            // 如果需要生成RGB格式，需要做如下配置,Transparency 设置透明
            newImage = graphics.getDeviceConfiguration().createCompatibleImage(TAM_WIDTH + 2 * RADIUS, TAM_HEIGHT + 2 *RADIUS, Transparency.TRANSLUCENT);
//            System.out.println("我是抠图的宽高:" + newImage.getWidth() + "x" + newImage.getHeight());
            // 新建的图像根据模板颜色赋值,源图生成遮罩
            return createLayer(sourceImage, newImage, blockData ,widthRandom, heightRandom)
                    .setBaseMapWidth(SKET_WIDTH)
                    .setBaseMapHeight(SKET_HEIGHT)
                    .setCropMapWidth(TAM_WIDTH)
                    .setCropMapHeight(TAM_HEIGHT)
                    .setRadius(RADIUS);
        } catch(IOException ex) {
            throw ex;
        }
    }
}
