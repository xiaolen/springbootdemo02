package com.qin.test;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.junit.Test;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author xzq 地表最强bug
 * @DATE : 2019/1/9
 * @description ：
 */
public class TaoBaoPic {
    Pattern pattern;
    Matcher matcher;

    @Test
    public void ggg() throws Exception {
        //天猫国际
//        String url = "https://detail.tmall.hk/hk/item.htm?id=583019542776&spm=875.7931836/B.2017041.7.56664265WJXdNl&scm=1007.12144.81309.73133_0_0&pvid=5f70d03e-a671-4166-9b8a-7adcac48fd8e&utparam={%22x_hestia_source%22:%2273133%22,%22x_object_type%22:%22item%22,%22x_mt%22:5,%22x_src%22:%2273133%22,%22x_pos%22:4,%22x_pvid%22:%225f70d03e-a671-4166-9b8a-7adcac48fd8e%22,%22x_object_id%22:583019542776}";
        //天猫
//        String url = "https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.5.255a27a7WPEBZP&id=36424250160&skuId=3557073644412&user_id=408107205&cat_id=2&is_b=1&rn=775f879905f12904f4672b65e12ddec";

        //天猫国际

        // 字符串 : \u5f00\u59cb\u4efb\u52a1 ，由于 \ 在java里是转义字符，要写出下面这种形式
//        String input = "storeTownList([\\r\\n  {\\r\\n    \\\"post\\\": \\\"260\\\",\\r\\n    \\\"town\\\": \\\"宜蘭市\\\",\\r\\n    \\\"city\\\": \\\"宜蘭縣\\\"\\r\\n  },\\r\\n  {\\r\\n    \\\"post\\\": \\\"261\\\",\\r\\n    \\\"town\\\": \\\"頭城鎮\\\",\\r\\n    \\\"city\\\": \\\"宜蘭縣\\\"\\r\\n  },\\r\\n  {\\r\\n    \\\"post\\\": \\\"262\\\",\\r\\n    \\\"town\\\": \\\"礁溪鄉\\\",\\r\\n    \\\"city\\\": \\\"宜蘭縣\\\"\\r\\n  },\\r\\n  {\\r\\n    \\\"post\\\": \\\"263\\\",\\r\\n    \\\"town\\\": \\\"壯圍鄉\\\",\\r\\n    \\\"city\\\": \\\"宜蘭縣\\\"\\r\\n  },\\r\\n  {\\r\\n    \\\"post\\\": \\\"264\\\",\\r\\n    \\\"town\\\": \\\"員山鄉\\\",\\r\\n    \\\"city\\\": \\\"宜蘭縣\\\"\\r\\n  },\\r\\n  {\\r\\n    \\\"post\\\": \\\"265\\\",\\r\\n    \\\"town\\\": \\\"羅東鎮\\\",\\r\\n    \\\"city\\\": \\\"宜蘭縣\\\"\\r\\n  },\\r\\n  {\\r\\n    \\\"post\\\": \\\"266\\\",\\r\\n    \\\"town\\\": \\\"三星鄉\\\",\\r\\n    \\\"city\\\": \\\"宜蘭縣\\\"\\r\\n  },\\r\\n  {\\r\\n    \\\"post\\\": \\\"267\\\",\\r\\n    \\\"town\\\": \\\"大同鄉\\\",\\r\\n    \\\"city\\\": \\\"宜蘭縣\\\"\\r\\n  },\\r\\n  {\\r\\n    \\\"post\\\": \\\"268\\\",\\r\\n    \\\"town\\\": \\\"五結鄉\\\",\\r\\n    \\\"city\\\": \\\"宜蘭縣\\\"\\r\\n  },\\r\\n  {\\r\\n    \\\"post\\\": \\\"269\\\",\\r\\n    \\\"town\\\": \\\"冬山鄉\\\",\\r\\n    \\\"city\\\": \\\"宜蘭縣\\\"\\r\\n  },\\r\\n  {\\r\\n    \\\"post\\\": \\\"270\\\",\\r\\n    \\\"town\\\": \\\"蘇澳鎮\\\",\\r\\n    \\\"city\\\": \\\"宜蘭縣\\\"\\r\\n  },\\r\\n  {\\r\\n    \\\"post\\\": \\\"272\\\",\\r\\n    \\\"town\\\": \\\"南澳鄉\\\",\\r\\n    \\\"city\\\": \\\"宜蘭縣\\\"\\r\\n  }\\r\\n])";
        String input = "[\n" +
                "  {\n" +
                "    \"NAME\": \"全家台中新公園店\",\n" +
                "    \"TEL\": \"04-22231801\",\n" +
                "    \"POSTel\": \"04-37007270\",\n" +
                "    \"px\": 120.683706,\n" +
                "    \"py\": 24.142766,\n" +
                "    \"addr\": \"台中市中區公園路19-2號壹樓及地下室\",\n" +
                "    \"SERID\": 19305.0,\n" +
                "    \"pkey\": \"017490\",\n" +
                "    \"oldpkey\": \"009305\",\n" +
                "    \"post\": \"400\",\n" +
                "    \"all\": \"COFFEE,SWEETPOTATO,WiFi,icecream,Rest,oneice,COFFEEDeliver,SharePot,Kantoni,SingleOrigin,Preorder\",\n" +
                "    \"road\": \"公園路\",\n" +
                "    \"twoice\": null\n" +
                "  },\n" +
                "  {\n" +
                "    \"NAME\": \"全家台中新興中店\",\n" +
                "    \"TEL\": \"04-22236602\",\n" +
                "    \"POSTel\": \"04-37046761\",\n" +
                "    \"px\": 120.680219,\n" +
                "    \"py\": 24.14559,\n" +
                "    \"addr\": \"台中市中區公園路81號\",\n" +
                "    \"SERID\": 52745.0,\n" +
                "    \"pkey\": \"012745\",\n" +
                "    \"oldpkey\": \"012745\",\n" +
                "    \"post\": \"400\",\n" +
                "    \"all\": \"COFFEE,SWEETPOTATO,WiFi,icecream,Toilet,Rest,oneice,twoice,SharePot,SUNMAI,Kantoni,Preorder\",\n" +
                "    \"road\": \"公園路\",\n" +
                "    \"twoice\": \"Y\"\n" +
                "  },\n" +
                "  {\n" +
                "    \"NAME\": \"全家台中萬代福店\",\n" +
                "    \"TEL\": \"04-22010133\",\n" +
                "    \"POSTel\": \"04-37070456\",\n" +
                "    \"px\": 120.679894,\n" +
                "    \"py\": 24.14647,\n" +
                "    \"addr\": \"台中市中區公園路42號\",\n" +
                "    \"SERID\": 57816.0,\n" +
                "    \"pkey\": \"017816\",\n" +
                "    \"oldpkey\": \"017816\",\n" +
                "    \"post\": \"400\",\n" +
                "    \"all\": \"COFFEE,SWEETPOTATO,SingleOrigin,Preorder\",\n" +
                "    \"road\": \"公園路\",\n" +
                "    \"twoice\": null\n" +
                "  }\n" +
                "]";
        String param = null;
        String pattern = "(?=&).*?(?=&)";
        Pattern p = Pattern.compile(pattern);
//        Matcher m = p.matcher(input.replace("\'", "\""));
//        input = input.replace("storeTownList(", "").replace(")", "");
//        input = input.replace("storeTownList(", "").replace(")", "").replace("\\r", "").replace("\\n", "");
        System.out.println(input);
        String dataJsonArray = getDataJsonArray(input);
        Matcher m = p.matcher(input);
        if (m.find()) {
            param = m.group(0);
        }
        System.out.println(param);
//        String url = Integer.parseInt((100*Double.parseDouble("0.10"))+"")+"%";
//        url = "*"+url.substring(1);
//        System.out.println(url);

    }

    public static String getDataJsonArray(String jsonObject) {
        try {
            if (jsonObject != null) {
                JSONArray jsonArray = (JSONArray) JSONArray.parse(jsonObject);
                for (int i = 0; i < jsonArray.size(); i++) {
                    JSONObject json = (JSONObject) jsonArray.get(i);
                    System.out.println(json);
//                    return json.toJSONString();
                }
                return null;
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

}
