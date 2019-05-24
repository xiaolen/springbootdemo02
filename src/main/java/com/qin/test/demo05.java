package com.qin.test;

import com.qin.util.RedisUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

/**
 * @Author: admin
 * @Date: 2019/5/24 13:42
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class demo05 {
    @Resource
    private RedisUtils redisUtils;

    /**
     * 插入缓存数据
     */
    @Test
    public void set() {
//        RedisUtils redisUtils = new RedisUtils();
//        redisUtils.set("redis_key", "redis_vale");
        redisUtils.set("jjj", "倾销员");
//        redisUtils.set("kkkk", "哈哈哈");
    }

    /**
     * 读取缓存数据
     */
    @Test
    public void get() {
//        RedisUtils redisUtils = new RedisUtils();
        String value = redisUtils.get("kkkk");
        System.out.println(value);
    }
}
