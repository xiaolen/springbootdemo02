package com.qin.proxy;

public class ProxySubject implements AbstractSubject {


    private AbstractSubject real;

    public ProxySubject(AbstractSubject real) {
        this.real = real;
    }

    @Override
    public void doSomething() {

        real.doSomething();
    }

    public void doOtherthing() {

    }
} 
