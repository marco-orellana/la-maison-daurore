package com.example.myapplication.services;

import com.example.myapplication.helpers.DataBaseHelper;

import java.util.concurrent.ExecutionException;


public class PostJson {

    public static String post(String json, String routes, String token) {
        String response = null;
        HttpPostRequest httpPostRequest = new HttpPostRequest();
        try {
            String host = DataBaseHelper.URL_SERVER;
            response = httpPostRequest.execute(host + routes, json,token).get();
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        String jsonToReturn = "";
        if (response != null) {
            jsonToReturn = response;
        }
        return jsonToReturn;
    }
}
