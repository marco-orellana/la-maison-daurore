package com.example.myapplication.helpers;

import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.example.myapplication.entities.Login;
import com.example.myapplication.services.Data;
import com.example.myapplication.services.GetJson;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;


public class LoginHelper {

    public static void getFromAPI(SQLiteDatabase db, String token) {
        String json = GetJson.get("/logins", token);
        if (json != null) {
            Gson gson = new Gson();
            Type type = new TypeToken<Data<Login>>() {
            }.getType();
            Data<Login> data = gson.fromJson(json, type);
            ArrayList<Login> logins = data.getData();
            for (Login l : logins) {
                Log.d("JsonGetlistLogin", "id: " + l.get_id() + " title: " + l.getEmail());
                db.execSQL("insert into " + DataBaseHelper.LOGIN_TABLE_NAME + " (id, id_user, email, password) values " + "('" + l.get_id() + "','" + l.getId_user() + "','" + l.getEmail() + "','" + l.getPassword() + "')");
            }
        }
    }
}
