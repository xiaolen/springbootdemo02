package com.qin.proxy;

public class Client {
    public static void main(String[] args) {
        RealSubject real = new RealSubject();
        ProxySubject proxy = new ProxySubject(real);
        proxy.doSomething();
    }
}
