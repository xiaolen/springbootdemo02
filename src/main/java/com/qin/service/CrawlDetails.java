package com.qin.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.gargoylesoftware.htmlunit.HttpMethod;
import com.gargoylesoftware.htmlunit.Page;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebRequest;
import com.gargoylesoftware.htmlunit.util.NameValuePair;
import com.qin.util.HttpClientUtil;
import com.qin.util.JsonDataAllUtil;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * @Author: admin
 * @Date: 2019/6/27 10:32
 */
public class CrawlDetails {


    public WebClient webClient = new WebClient();

    public String crawlRobotContnt(List<NameValuePair> list, String pUrl) throws Exception {

//        Thread.sleep(3000L);
        URL url = new URL(pUrl);
        WebRequest webRequest = new WebRequest(url, HttpMethod.POST);
//        webRequest.setRequestBody(list);
        webRequest.setRequestParameters(list);
        webRequest.setCharset(StandardCharsets.UTF_8);
        Page page = webClient.getPage(webRequest);
        if (null != page) {
            Thread.sleep(3000L);
            String contentAsString = page.getWebResponse().getContentAsString();
            JSONObject jsonObject = JsonDataAllUtil.getJsonObject(contentAsString);
            JSONArray data = JsonDataAllUtil.getJsonArray(jsonObject, "entries");
            for (Object object : data) {
                JSONObject object1 = (JSONObject) object;
                System.out.println(object1);
//                    获取id
                String title = JsonDataAllUtil.getData(object1, "title");
                if (title != null) {
                    System.out.println(title + "========");
                    String pattern = "([-+*/^()\\]\\[\"|/\\\\<>?？&$￥% @;:：；“”‘’\t\n])";
                    String test = title.replaceAll(pattern, "");
                    String object3 = null;
                    String content = null;
                    if (test.length() > 30) {
                        //获取到的文章
                        StringBuilder stringBuilder = new StringBuilder(test);
                        stringBuilder.replace(10, test.length(), "...");
                        object3 = JsonDataAllUtil.getData(object1, "content");
                        content = object3.replaceAll(pattern, "");
                        System.out.println(object3);
                    }
                    if (object3 != null) {

                        //创建文本文件
                        String pageName = "D:/简书";
                        File myPath = new File(pageName);
                        if (!myPath.exists()) {//若此目录不存在，则创建之
                            myPath.mkdir();
                            System.out.println("创建文件夹路径为：");
                        }
                        //循环写入
                        //写入 \r\n换行
                        FileWriter fileWriter = null;
                        fileWriter = new FileWriter(pageName + "/" + test+".txt");
//                        BufferedWriter bw = new BufferedWriter( new FileWriter(pageName + "/" + test+".txt"));
                        fileWriter.write(test + "\r\n");
                        fileWriter.write("============================" + "\r\n");
                        fileWriter.write(content + "\r\n");
                        fileWriter.flush();
                        fileWriter.close();

                    }
                }
            }
            return contentAsString;
        }
        return null;
    }

    public String craelPage(String pageUrl) {
        try {
//            URL url = new URL(pageUrl);
//            WebRequest webRequest = new WebRequest(url, HttpMethod.GET);
//            webRequest.setCharset(StandardCharsets.UTF_8);
//            Page page = webClient.getPage(webRequest);
            String pageJson = HttpClientUtil.doGet(pageUrl);
            if (null != pageJson) {
                Thread.sleep(3000L);
//                String contentAsString = pageJson.getWebResponse().getContentAsString();
                JSONObject jsonObject = JsonDataAllUtil.getJsonObject(pageJson);
                JSONArray data = JsonDataAllUtil.getJsonArray(jsonObject, "data");
                for (Object object : data) {
                    JSONObject object1 = (JSONObject) object;
                    JSONObject object2 = JsonDataAllUtil.getDataJson(object1, "object");
                    System.out.println(object2);
//                    获取id
                    String title = JsonDataAllUtil.getData(object2, "title");
                    if (title != null) {
                        System.out.println(title + "========");
                        String pattern = "([-+*/^()\\]\\[\"|/\\\\<>?？&$￥% @;:：；“”‘’\t\n])";
                        String test = title.replaceAll(pattern, "");
                        String object3 = null;
                        String content = null;
                        if (test.length() > 30) {
                            //获取到的文章
                            StringBuilder stringBuilder = new StringBuilder(test);
                            stringBuilder.replace(10, test.length(), "...");
                            object3 = JsonDataAllUtil.getData(object2, "content");
                            content = object3.replaceAll(pattern, "");
                            System.out.println(object3);
                        }
                        if (object3 != null) {
                            try {
                                //创建文本文件
                                String pageName = "D:/知乎";
                                File myPath = new File(pageName);
                                if (!myPath.exists()) {//若此目录不存在，则创建之
                                    myPath.mkdir();
                                    System.out.println("创建文件夹路径为：");
                                }
                                //循环写入
                                //写入 \r\n换行
                                FileWriter fileWriter = null;
                                fileWriter = new FileWriter(pageName + "/" + test + ".txt");
                                fileWriter.write(test + "\r\n");
                                fileWriter.write("============================" + "\r\n");
                                fileWriter.write(content + "\r\n");
                                fileWriter.flush();
                                fileWriter.close();

                            } catch (IOException e) {
                                // TODO Auto-generated catch block
                                e.printStackTrace();
                            }
                        }
                    }
                }
                return pageJson;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    //保存图片
    public static void download(String imgurl, String path) throws Exception {
        try {
            URL url = new URL(imgurl);
            URLConnection con = url.openConnection();
            con.setConnectTimeout(5000);
            InputStream is = con.getInputStream();
            byte[] bs = new byte[1024];
            int len;
            File sf = new File(path);
            OutputStream os = new FileOutputStream(sf);
            while ((len = is.read(bs)) != -1) {
                os.write(bs, 0, len);
            }
            os.close();
            is.close();

        } catch (IOException e) {
        }
    }

}
