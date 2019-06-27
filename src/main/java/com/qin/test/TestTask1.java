package com.qin.test;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.http.HttpEntity;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Date;


/**
 * @Author: 秦渊渊
 * @Date: 2018/12/1 13:05
 */
@Component
public class TestTask1 {
    private int count = 0;

    //定时任务注解详细查看注解参数
//    @Scheduled(cron = "*/4 * * * * ?")
    private void process() {
        Date date = new Date();
        try {
            Thread.sleep(100L);
            System.out.println(date + "[" + Thread.currentThread().getName() + "]" + "this is scheduler task runing  " + (count++));
            String path = "http://192.168.185:8993/api/json";
//            创建对象HttpClient
            HttpClient httpclient = new HttpClient();
//            创建Get请求对象
            GetMethod get = new GetMethod(path);
//            发送get请求
            int st1 = httpclient.executeMethod(get);
            System.out.println(st1);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * post请求，参数为json字符串
     * @param
     * @param
     * @return 响应
     */
//    @Test
//    @Scheduled(cron = "*/4 * * * * ?")
    public void postJson(){
        Date date = new Date();
        String jsonParam = "{\n"+
                "\"token\":\"xueziqiang11111111\",\n" +
                "\"orderid\":\"xueziqiang\"\n" +
                "}";
//        String url = "http://192.168.1.185:9092/testProxy/callback";
        String url = "http://localhost:8082/post";
        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(url);// 创建httpPost
        httpPost.setHeader("Accept", "application/json");
        httpPost.setHeader("Content-Type", "application/json");
        String charSet = "UTF-8";
        StringEntity entity = new StringEntity(jsonParam, charSet);
        httpPost.setEntity(entity);
        CloseableHttpResponse response = null;
        try {
            response = httpclient.execute(httpPost);
            StatusLine status = response.getStatusLine();
            int state = status.getStatusCode();
            if (state == HttpStatus.SC_OK) {
                HttpEntity responseEntity = response.getEntity();
//                InputStream content = responseEntity.getContent();
//
//                byte[] uncompress = GzipUtils.uncompress(content);
//                String result = new String(uncompress);
                System.out.println(responseEntity+"======");
//                return content;
                System.out.println(date + "[" + Thread.currentThread().getName() + "]" + "this is scheduler task runing  " + (count++));
            }
            else{
                System.out.println("请求返回:"+state+"("+url+")");
            }
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
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
//        return null;
    }

}
