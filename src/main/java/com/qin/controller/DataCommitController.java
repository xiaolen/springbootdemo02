package com.qin.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * @Author: admin
 * @Date: 2019/4/15 14:59
 */

@Controller
@RequestMapping("")
@CrossOrigin(origins = "*", maxAge = 3600) //* 可以改成ip地址
public class DataCommitController {

    //springboot解决跨域问题的注解
//    @CrossOrigin(origins = "*", maxAge = 3600) //* 可以改成ip地址
    @RequestMapping(value = "/get",method= RequestMethod.GET)
    @ResponseBody
    public JSON dataCommit(@RequestParam Map<String,Object> map){

        String sss = "{\"id\":5,\"name\":\"长安汽车\"}";
        JSONObject jsonObject = JSONObject.parseObject(sss);
        System.out.println(jsonObject);

        return jsonObject;
    }
    @RequestMapping(value = "/post",method = RequestMethod.POST)
    @ResponseBody
    public int dataCommitPost(@RequestBody Map<String,Object> map){
//        String sss = "{\"id\":6,\"name\":\""+name+"\"}";
//        JSONObject jsonObject = JSONObject.parseObject(sss);
//        System.out.println(jsonObject);
        System.out.println(map);
        return 1;
    }

    @RequestMapping(value = "/delId/{id}",method= RequestMethod.GET)
    @ResponseBody
    public void deleteId(@PathVariable String id){
        System.out.println(id);
    }
}
