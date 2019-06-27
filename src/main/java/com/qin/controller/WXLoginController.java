package com.qin.controller;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: admin
 * @Date: 2019/6/13 10:37
 */
@RestController
@RequestMapping("/api")
public class WXLoginController {

    @RequestMapping("/getcode")
    public JSONObject wxLogin(){



        return null;
    }

}
