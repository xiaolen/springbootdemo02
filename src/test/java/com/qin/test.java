package com.qin;

import com.qin.util.GzipUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ByteArrayEntity;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.CharArrayBuffer;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author
 * @date 2019/5/21 10:42
 */
public class test {
    /**
     * post请求，参数为json字符串
     * @param
     * @param
     * @return 响应
     */
    @Test
    public void postJson(){

        String jsonParam = "{\n" +
                "\"apiUser\":\"3\",\n" +
                "\"apiEnc\":\"36b8ef55f9a74e9284166a0bda87d604\",\n" +
                "\"phone\":\"18935137863\",\n" +
                "\"idcard\":\"142225199401017017\",\n" +
                "\"pwd\":\"118750\",\n" +
                "\"orderid\":\"0001\"\n" +
                "}";
        String url = "http://192.168.1.225:8081/api/task/short";
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
                InputStream content = responseEntity.getContent();

                byte[] uncompress = GzipUtils.uncompress(content);
                String result = new String(uncompress);
                System.out.println(result+"======");
//                return content;
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
    }

}
