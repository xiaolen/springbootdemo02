package com.qin.test;

import com.qin.util.RedisUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.util.Date;
import java.util.concurrent.TimeUnit;

/**
 * @Author: admin
 * @Date: 2019/5/24 13:42
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class demo05 {
    @Resource
    private RedisUtils redisUtils;
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    /**
     * 插入缓存数据
     */
    @Test
    public void set() {
//        RedisUtils redisUtils = new RedisUtils();
//        redisUtils.set("redis_key", "redis_vale");
//        redisUtils.set("jjj", "25252");
//        redisUtils.set("哈哈哈哈哈", "sssss");
        redisTemplate.opsForValue().set("RANDOMCODEKEY", "hisdscisbcsb",10L, TimeUnit.SECONDS);
//        redisTemplate.opsForValue().set("ddd", "142536",10L, TimeUnit.SECONDS);
        System.out.println("保存成功！");
    }

    /**
     * 读取缓存数据
     */
    @Test
    public void get() {
//        RedisUtils redisUtils = new RedisUtils();
        String value = redisUtils.get("ddd");
        System.out.println("取出数据为————"+value);
    }/**
     * 读取缓存数据
     */
    @Test
    public void get01() {
        System.out.println("取出数据为————"+new Date());
    }
}
