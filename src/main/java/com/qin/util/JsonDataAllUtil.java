package com.qin.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.log4j.Log4j;

import java.util.ArrayList;
import java.util.List;


/**
 * @Author: 秦晓渊
 * @Date: 2019/2/13 10:45
 */
@Log4j
public class JsonDataAllUtil {
    /**
     * 获取json数据
     * 先将为数组格式的字符串转换成jsonArray集合
     * 遍历jsonArray集合获取到每个JSONObject对象
     * 在根据传过的key获取指定的value集合并返回
     * @return
     */
    public static List<String> getDataJsonArray(String jsonObject, String key){
        List<String> list = new  ArrayList<>();
        try {
            if(jsonObject != null && key != null){
                JSONArray jsonArray = (JSONArray) JSONArray.parse(jsonObject);
                for (int i = 0; i < jsonArray.size(); i++) {
                    JSONObject json = (JSONObject) jsonArray.get(i);
                    String dataValue = getData(json, key);
                    list.add(dataValue);
                }
                return list;
            }
        } catch (Exception ex) {
            log.error("bean转化为json失败", ex);
        }
        return null;
    }


    /**
     * 获取json数据
     * @return
     * 传入一个JsonObject对象和对象中的一个key值
     * 返回key对应的value的字符串值
     */
    public static String getData(JSONObject jsonObject, String key){
        try {
            if(jsonObject != null && key != null){
                String dataValue = jsonObject.get(key).toString();
                return dataValue;
            }
        } catch (Exception ex) {
            log.error("bean转化为json失败", ex);
        }
        return null;
    }

    /**
     * 获取json数据
     * @return
     * 传入一个JsonObject对象和对象中的一个key值
     * 返回key对应的jsonObject对象
     */
    public static JSONObject getDataJson(JSONObject jsonObject, String key){
        try {
            if (jsonObject != null && key != null){
                String dataValue = jsonObject.get(key).toString();
                return getJsonObject(dataValue);
            }
        } catch (Exception ex) {
            log.error("bean转化为json失败", ex);
        }
        return null;
    }
    /**
     * 将字符串转换成json对象
     * @param data
     * @return
     */
    public static JSONObject getJsonObject(String data){
        try {
            if(data != null){
                JSONObject jsonObject = JSONObject.parseObject(data);
                return jsonObject;
            }
        } catch (Exception ex) {
            log.error("bean转化为json失败", ex);
        }
        return null;
    }

    /**
     * 将字符串转换成json对象,
     * 并且根据key获取其中的value字符串数据数据
     * @param data
     * @return
     */
    public static String getJsonObjectAndString(String data,String key){
        try {
            if(data != null){
                JSONObject jsonObject = JSONObject.parseObject(data);
                String data1 = getData(jsonObject, key);
                return data1;
            }
        } catch (Exception ex) {
            log.error("bean转化为json失败", ex);
        }
        return null;
    }
    /**
     * 传入一个jsonObject（是key为字符串value是数组格式）和一个key
     * 将字符串转换成JSONArray集合并返回,并且获取其中的数据
     * @param list
     * @return
     */
    public static JSONArray getJsonArray(JSONObject jsonObject, String list){
        try {
            if(list != null){
                JSONArray jsonArray = (JSONArray) jsonObject.get(list);
//                String data1 = getData(jsonObject, key);
                return jsonArray;
            }
        } catch (Exception ex) {
            log.error("bean转化为json失败", ex);
        }
        return null;
    }
}
