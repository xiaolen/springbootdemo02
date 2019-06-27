package com.qin.util;


import org.apache.commons.httpclient.HttpStatus;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.CharArrayBuffer;
import org.apache.http.util.EntityUtils;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * @Author: 小冷
 * @Date: 2019/5/14 15:32
 */
@SuppressWarnings("all")
public class RequestApiData {

    /**
     * 发送get请求
     */
    public static String sendoutGetReq(String path) {

        CloseableHttpClient httpclient = HttpClients.createDefault();
        CloseableHttpResponse response = null;
        try {
            HttpGet httpget = new HttpGet(path);
//            httpclient.
            // 执行get请求.
            response = httpclient.execute(httpget);
            // 获取响应实体
            HttpEntity entity = response.getEntity();
            System.out.println("--------------------------------------");
            // 打印响应状态
            int statusCode = response.getStatusLine().getStatusCode();
            System.out.println(response.getStatusLine());
            if (entity != null && statusCode == HttpStatus.SC_OK) {
                String entityToString = entityToString(entity);
                return entityToString;
            }
        } catch (Exception e) {
            return "get请求失败!";
        } finally {
            if (response != null) {
                try {
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            try {
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    /**
     * @Author: 小冷
     * 发送post请求
     * @param jsonParam:json格式的数据
     * @param url:请求路径
     */
    public static String sendoutPostReq(String jsonParam,String url) {
        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(url);
        // 创建httpPost
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-Type", "application/json");
        //设置编码格式
        String charSet = "UTF-8";
        StringEntity entity = new StringEntity(jsonParam, charSet);
        httpPost.setEntity(entity);
        CloseableHttpResponse response = null;
        try {
            response = httpclient.execute(httpPost);
            int statusCode = response.getStatusLine().getStatusCode();
            if (entity != null && statusCode == HttpStatus.SC_OK) {
                System.out.println("请求返回:" + statusCode + "(" + url + ")");
                HttpEntity responseEntity = response.getEntity();
//                将响应体转换成字节流的方式
//                InputStream content = responseEntity.getContent();
                String entityToString = entityToString(entity);
                return entityToString;
            } else {
                System.out.println("请求返回:" + statusCode + "(" + url + ")");
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (response != null) {
                try {
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            try {
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    /**
     * @Author: 小冷
     * @Date: 2019/5/14 15:32
     * 将获取到的请求体转换成字符串
     */
    private static String entityToString(HttpEntity entity) throws IOException {
        String result = null;
        if (entity != null) {
            long lenth = entity.getContentLength();
            if (lenth != -1 && lenth < 2048) {
                result = EntityUtils.toString(entity, "UTF-8");
            } else {
                InputStreamReader reader1 = new InputStreamReader(entity.getContent(), "UTF-8");
                CharArrayBuffer buffer = new CharArrayBuffer(2048);
                char[] tmp = new char[1024];
                int l;
                while ((l = reader1.read(tmp)) != -1) {
                    buffer.append(tmp, 0, l);
                }
                result = buffer.toString();
            }
        }
        return result;
    }
}
