package com.qin.util;

import org.springframework.util.Assert;
import java.io.*;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

/**
 * @author lijing
 * @date 2018/6/25 0025.
 */
public class GzipUtils {
    /**
     * 压缩字符串
     * @param str 待压缩数据
     * @param charset 字符集
     * @return
     * @throws IOException
     */
    public static byte[] compress(String str,String charset) throws IOException {
        Assert.notNull(str, " null compress error ");
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        GZIPOutputStream gzip = new GZIPOutputStream(out);
        try{
            gzip.write(str.getBytes(charset));
            gzip.close();
            return  out.toByteArray();
        }catch(Exception e){
            throw new IOException(e);
        }finally{
            out.close();
            gzip.close();
        }
    }

    /**
     * 解压缩字符串
     * @throws IOException
     * @throws UnsupportedEncodingException
     * @throws FileNotFoundException
     */
    public static byte[] uncompress(InputStream in)throws IOException, UnsupportedEncodingException,FileNotFoundException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        GZIPInputStream gunzip = new GZIPInputStream(in);
        try{
            byte[] buffer = new byte[256];
            int n;
            while ((n = gunzip.read(buffer)) >= 0) {
                out.write(buffer, 0, n);
            }
            return out.toByteArray();
        }catch(Exception e){
            throw new IOException(e);
        }finally{
            out.close();
            in.close();
            gunzip.close();
        }
    }
}