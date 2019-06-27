package com.qin;

import com.alibaba.fastjson.JSONObject;
import com.qin.util.GzipUtils;
import com.qin.util.RequestApiData;
import org.apache.commons.httpclient.*;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

/**
 * @Author: admin
 * @Date: 2019/5/14 15:32
 */
public class ApIData {

    @Test
    public void vncompressTest() {

        String string = "123456";
        InputStream is;
        CloseableHttpClient httpclient = HttpClients.createDefault();
        try {
            String path = "http://192.168.1.90:8081/api/source/detail?apiUser=13100000000&apiEnc=ba6a1b269704df4f5c524425a49dc98a&apiName=zhihu5";
//            创建对象HttpClient
//            HttpClient httpclient = new HttpClient();
//            创建Get请求对象
//            GetMethod get = new GetMethod(path);

            HttpGet httpget = new HttpGet(path);
//            httpclient.
            // 执行get请求.

            CloseableHttpResponse response = httpclient.execute(httpget);

            // 获取响应实体
            HttpEntity entity = response.getEntity();
            System.out.println("--------------------------------------");
            // 打印响应状态
            System.out.println(response.getStatusLine());
            if (entity != null) {
                // 打印响应内容长度
//                System.out.println("Response content length: " + entity.getContentLength());
                // 打印响应内容
//                System.out.println("Response content: " + EntityUtils.toString(entity));
                InputStream content = entity.getContent();
//                InputStream bais = new ByteArrayInputStream(content);
//            is = new ByteArrayInputStream(body.getBytes(StandardCharsets.ISO_8859_1));
                String s = new String(GzipUtils.uncompress(content));
                System.out.println(s);
            }
            System.out.println("------------------------------------");


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test02() {
        String ss = "shanxicmcc123456";
        try {
            byte[] compress = GzipUtils.compress(ss, "ISO-8859-1");
            String s = new String(compress);
            System.out.println();
            InputStream bais = new ByteArrayInputStream(compress);
            byte[] uncompress = GzipUtils.uncompress(bais);
            System.out.println(new String(uncompress, "ISO-8859-1"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test03() {
        CloseableHttpClient client = HttpClients.createDefault();
        String path = "192.168.1.225:8081/api/user/message/";

        HttpPost post = new HttpPost(path);

        HashMap<String, String> content = new HashMap<String,String >();
//                String content = JSONBinder.binder(Vendor.class).toJSON(v);
        String s = null;
        try {
            content.put("apiUser","3");
            content.put("apiEnc","36b8ef55f9a74e9284166a0bda87d604");
            content.put("token","a431b843-1826-4893-8239-bef3ee796096");
            content.put("message","213346");

            StringEntity entity = new StringEntity(content.toString());
            entity.setContentEncoding("UTF-8");
            entity.setContentType("application/json");
            post.setEntity(entity);
            HttpResponse response = client.execute(post);
            System.out.println("响应状态码：" + response.getStatusLine().getStatusCode());
            InputStream is = response.getEntity().getContent();
            s = new String(GzipUtils.uncompress(is));
        } catch (IOException e) {
            e.printStackTrace();
        }
//        System.out.println(s);
        System.out.println("服务器端响应的数据：" + s);
    }

    @Test
    public void test04() {
        DefaultHttpClient client = new DefaultHttpClient();

        String path = "192.168.1.225:8081/api/user/message/";
        HttpPost post = new HttpPost(path);
        JSONObject response = null;

        HashMap<String, String> content = new HashMap<String,String >();
//                String content = JSONBinder.binder(Vendor.class).toJSON(v);
            content.put("apiUser","3");
            content.put("apiEnc","36b8ef55f9a74e9284166a0bda87d604");
            content.put("token","a431b843-1826-4893-8239-bef3ee796096");
            content.put("message","213346");
            String sss = null;
        try {
            StringEntity s = new StringEntity(content.toString());
            s.setContentEncoding("UTF-8");
            s.setContentType("application/json");//发送json数据需要设置contentType
            post.setEntity(s);
            HttpResponse res = client.execute(post);
            if(res.getStatusLine().getStatusCode() == HttpStatus.SC_OK){
                HttpEntity entity = res.getEntity();

                InputStream content1 = entity.getContent();
                sss = new String(GzipUtils.uncompress(content1));
                System.out.println(sss);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void test05(){
        String url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60&redirect_uri=http%3A%2F%2Fnba.bluewebgame.com%2Foauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        String sendoutGetReq = RequestApiData.sendoutGetReq(url);
        System.out.println(sendoutGetReq);

        //post请求
//        String jsonParam = "{\n" +
//                "\"apiUser\":\"3\",\n" +
//                "\"apiEnc\":\"36b8ef55f9a74e9284166a0bda87d604\",\n" +
//                "\"phone\":\"15300587785\",\n" +
//                "\"idcard\":\"340828198802165312\",\n" +
//                "\"pwd\":\"121056\",\n" +
//                "\"orderid\":\"0001\"\n" +
//                "}";
//
//        String path = "http://127.0.0.1:8081/api/task/short";


    }

}
