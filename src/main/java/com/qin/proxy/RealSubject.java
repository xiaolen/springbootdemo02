package com.qin.proxy;

public class RealSubject implements AbstractSubject {
    @Override
    public void doSomething() {
        System.out.println("真实角色被使用");
    }
}
