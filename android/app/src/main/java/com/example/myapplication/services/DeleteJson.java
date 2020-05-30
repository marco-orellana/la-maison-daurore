package com.example.myapplication.services;


import com.example.myapplication.helpers.DataBaseHelper;

import java.util.concurrent.ExecutionException;


public class DeleteJson {
    public static String delete(String routes,String token) {
        String response = null;
        HttpDeleteRequest httpDeleteRequest = new HttpDeleteRequest();
        try {
            String host = DataBaseHelper.URL_SERVER;
            response = httpDeleteRequest.execute(host + routes).get();
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        String responseToReturn = "";
        if (response != null) {
            responseToReturn = response;
        }
        return responseToReturn;
    }
}
