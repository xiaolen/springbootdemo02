/*
 * Copyright 2010 by IPS. Floor 3,Universal Industrial Building, 
 * Tian Yaoqiao Road 1178,Shanghai, P.R. China，200300. All rights reserved.
 *
 * This software is the confidential and proprietary information of IPS
 * ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with IPS.
 */
package com.qin.util;


import lombok.extern.slf4j.Slf4j;
import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Base64
 *
 * @author yyj
 * @version 1.0 13-5-18
 */
@Slf4j
public class Base64 {

    /**
     * decode
     *
     * @param text
     * @return
     */
    public static String decode(String text) {
        return new String(org.apache.commons.codec.binary.Base64.decodeBase64(text));
    }

    public static String decode(byte[] binaryData) {
        return new String(org.apache.commons.codec.binary.Base64.decodeBase64(binaryData));
    }

    public static byte[] decodeByte(String text) {
        return org.apache.commons.codec.binary.Base64.decodeBase64(text);
    }

    public static byte[] decodeByte(String text,String charset) {
        return org.apache.commons.codec.binary.Base64.decodeBase64(StringUtils.getBytes(text, charset));
    }


    /**
     * decode
     *
     * @param text
     * @param charset
     * @return
     */
    public static String decode(String text,String charset) {
        return StringUtils.getString(org.apache.commons.codec.binary.Base64.decodeBase64(text),charset);
    }

    /**
     * encode
     *
     * @param text
     * @return
     */
    public static String encode(String text) {
        return new String(org.apache.commons.codec.binary.Base64.encodeBase64(StringUtils.getBytes(text)));
    }

    public static String encode(byte[] binaryData) {
        return new String(org.apache.commons.codec.binary.Base64.encodeBase64(binaryData));
    }

    /**
     * encode
     *
     * @param text
     * @param charset
     * @return
     */
    public static String encode(String text,String charset) {
        return new String(org.apache.commons.codec.binary.Base64.encodeBase64(StringUtils.getBytes(text, charset)));
    }

    /**
     * isBase64
     *
     * @param text
     * @return
     */
    public static boolean isBase64(String text){
        return org.apache.commons.codec.binary.Base64.isBase64(text);
    }

    /**
     * isBase64
     *
     * @param binaryData
     * @return
     */
    public static boolean isBase64(byte[] binaryData){
        return org.apache.commons.codec.binary.Base64.isBase64(binaryData);
    }

    /**
     * 通过读取图片流转BASE64
     * 将图片文件转化为字节数组字符串，并对其进行Base64编码处理
     * @param inputStream
     * @return
     */
    public static String getBase64ByImgInputStream(InputStream inputStream) {
        BASE64Encoder encoder = new BASE64Encoder();
        BufferedImage bi = null;
        ByteArrayOutputStream baos = null;
        String result = null;
        try {
            bi = ImageIO.read(inputStream);
            baos = new ByteArrayOutputStream();
            ImageIO.write(bi, "png", baos);
            byte[] bytes = baos.toByteArray();
            return encoder.encode(bytes);
        } catch (IOException e) {
            log.info(">通过读取图片流转BASE64出错", e);
        } finally {
            try {
                if(baos != null) {
                    baos.close();
                }
            } catch (Exception e) {
                log.info(">关闭文件流发生异常: " + e);
            }
        }
        return result;
    }


}
