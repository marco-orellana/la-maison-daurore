package com.example.myapplication.services;

import java.util.ArrayList;


public class Data<T> {
    private ArrayList<T> data;

    public Data() {
    }

    public Data(ArrayList<T> data) {
        this.data = data;
    }

    public ArrayList<T> getData() {
        return data;
    }

    public void setData(ArrayList<T> data) {
        this.data = data;
    }
}
