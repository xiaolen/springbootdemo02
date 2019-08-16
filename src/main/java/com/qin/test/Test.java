package com.qin.test;

import java.util.function.Consumer;

public class Test {
    public static void main(String[] args) {
        Test consumertest = new Test();
        //传入字符串，然后打印
        consumertest.pass("I'm consumerFunction", (item) -> System.out.println(item));
    }
    
    //接受str字符串参数
    public void pass(String str, Consumer<String> consumer) {
        consumer.accept(str);
    }
 }
