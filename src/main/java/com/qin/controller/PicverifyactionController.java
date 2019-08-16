package com.qin.controller;

import com.qin.util.RandomValidateCodeUtil;
import com.qin.util.RedisUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * @author mayn
 */
@RestController
@RequestMapping("/login")
public class PicverifyactionController {
    private final static Logger logger = LoggerFactory.getLogger(PicverifyactionController.class);

    @Resource
    private RedisUtils redisUtils;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    /**
     * 生成验证码
     */
    @RequestMapping(value = "/getVerify")
    public String getVerify(HttpServletRequest request, HttpServletResponse response) {
        try {
            //设置相应类型,告诉浏览器输出的内容为图片
            response.setContentType("image/jpeg");
            response.setHeader("Pragma", "No-cache");
            //设置响应头信息，告诉浏览器不要缓存此内容
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expire", 0);
            RandomValidateCodeUtil randomValidateCode = new RandomValidateCodeUtil();
            //输出验证码图片方法
            Map<String, String> randcode = randomValidateCode.getRandcode(request, response);
            String randomcodekey = randcode.get("RANDOMCODEKEY");
//            将验证码放入redis并且缓存时间为60秒
            redisTemplate.opsForValue().set("RANDOMCODEKEY", randomcodekey, 10L, TimeUnit.SECONDS);
//            return String.valueOf(Math.random());
        } catch (Exception e) {
            logger.error("获取验证码失败>>>>   ", e);
        }
        return null;
    }

    /**
     * 校验验证码
     */
    @RequestMapping(value = "/checkVerify", method = RequestMethod.POST, headers = "Accept=application/json")
    public String checkVerify(@RequestParam String verifyInput, HttpSession session) {
        try {
            //从session中获取随机数
            String inputStr = verifyInput;
//            String random = (String) session.getAttribute("RANDOMVALIDATECODEKEY");
            String random = redisUtils.get("RANDOMCODEKEY");
            if (random == null) {
                return "验证码失效!";
            }
            if (random.equals(inputStr)) {
                return "验证码正确!";
            } else {
                return "验证码错误!";
            }
        } catch (Exception e) {
            logger.error("验证码校验失败", e);
            return "验证码校验失败";
        }
    }

}