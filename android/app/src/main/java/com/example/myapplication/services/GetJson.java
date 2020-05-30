package com.example.myapplication.services;

import com.example.myapplication.helpers.DataBaseHelper;

import java.util.concurrent.ExecutionException;


public class GetJson {

    public static String get(String routes,String token) {
        String response = null;
        HttpGetRequest httpGetRequest = new HttpGetRequest();
        try {
            String host = DataBaseHelper.URL_SERVER;
            response = httpGetRequest.execute(host + routes,token).get();
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
