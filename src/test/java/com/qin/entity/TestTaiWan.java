package com.qin.entity;

import com.gargoylesoftware.htmlunit.util.NameValuePair;
import com.qin.service.CrawlDetails;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author: admin
 * @Date: 2019/4/2 18:37
 */
public class TestTaiWan {




    @Test
    public void taiwanMap01() {
        System.out.println("4411");
        int pageNumber = 1;
        for (int j = 0; j < 40; j++) {
            String url = "https://www.jianshu.com/search/do";
            List<NameValuePair> reqParam = new ArrayList();
            CrawlDetails crawlDetails = new CrawlDetails();
            reqParam.clear();
            reqParam.add(new NameValuePair("q", "贝尔机器人"));
            reqParam.add(new NameValuePair("type", "note"));
            reqParam.add(new NameValuePair("page", String.valueOf(pageNumber)));
            reqParam.add(new NameValuePair("order_by", "default"));
            String page = null;
            try {
                Thread.sleep(60000);
                page = crawlDetails.crawlRobotContnt(reqParam, url);
            } catch (Exception e) {
                e.printStackTrace();
            }
            if (page == null || page.equals("搜索过于频繁，请稍等一下再试吧")) {
                try {
                    page = crawlDetails.crawlRobotContnt(reqParam, url);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            pageNumber++;
        }
    }

    @Test
    public void taiwanMap02() {
        int i = 20;
        for (int j = 0; j < 50; j++) {
            String url = "https://www.zhihu.com/api/v4/search_v3?t=general&q=贝尔科学&correction=1&offset=" + i + "&limit=300&lc_idx=23&show_all_topics=0&search_hash_id=f19559f849584282a219edddc4fa7065&vertical_info=0,0,1,0,0,0,0,0,0,1";
//            String url = "https://bbs.csdn.net/topics/392337085";
            CrawlDetails crawlDetails = new CrawlDetails();
            String s = crawlDetails.craelPage(url);
            System.out.println(s);
            i += 20;
        }

    }

}
