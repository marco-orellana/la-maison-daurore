package com.example.myapplication.services;

import android.os.AsyncTask;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


public class HttpDeleteRequest extends AsyncTask<String, Void, String> {
    public static final String REQUEST_METHOD = "DELETE";
    public static final int READ_TIMEOUT = 15000;
    public static final int CONNECTION_TIMEOUT = 15000;

    @Override
    protected String doInBackground(String... params) {
        String stringUrl = params[0];
        String token = "";
        if (params.length > 1) {
            token = params[1];
        }
        String result;
        String inputLine;
        try {
            //Create a URL object holding our url
            URL myUrl = new URL(stringUrl);
            //Create a connection
            HttpURLConnection connection = ( HttpURLConnection )
                    myUrl.openConnection();
            //Set methods and timeouts
//            connection.setDoOutput(true);
//            connection.setDoInput(true);
//            connection.setRequestMethod(REQUEST_METHOD);
            if (token != null) {
                connection.setRequestProperty("Authorization", "Bearer " + token);
            }
            connection.setReadTimeout(READ_TIMEOUT);
            connection.setConnectTimeout(CONNECTION_TIMEOUT);
            //Connect to our url
            connection.connect();
//            PrintWriter pw = new PrintWriter(connection.getOutputStream());
//            pw.print(strToSend);
//            pw.flush();
            //Create a new
            //Create a new InputStreamReader
            InputStreamReader streamReader = new
                    InputStreamReader(connection.getInputStream());
            //Create a new buffered reader and String Builder
            BufferedReader reader = new BufferedReader(streamReader);
            StringBuilder stringBuilder = new StringBuilder();
            //Check if the line we are reading is not null
            while ((inputLine = reader.readLine()) != null) {
                stringBuilder.append(inputLine);
            }
            //Close our InputStream and Buffered reader
//            pw.close();
            reader.close();
            streamReader.close();
            //Set our result equal to our stringBuilder
            result = stringBuilder.toString();
        } catch (IOException e) {
            e.printStackTrace();
            result = null;
        }
        return result;
    }

    protected void onPostExecute(String result) {
        super.onPostExecute(result);
    }
}
