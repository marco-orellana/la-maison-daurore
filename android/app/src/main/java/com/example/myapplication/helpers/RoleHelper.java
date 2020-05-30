package com.example.myapplication.helpers;

import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.example.myapplication.entities.Role;
import com.example.myapplication.services.Data;
import com.example.myapplication.services.GetJson;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;


public class RoleHelper {

    public static void getFromAPI(SQLiteDatabase db,String token) {
        String json = GetJson.get("/roles",token);
        if (json != null) {
            Gson gson = new Gson();
            Type type = new TypeToken<Data<Role>>() {
            }.getType();
            Data<Role> data = gson.fromJson(json, type);
            ArrayList<Role> roles = data.getData();
            for (Role r : roles) {
                Log.d("JsonGetlistRole", "id: " + r.get_id() + " title: " + r.getTitle());
                db.execSQL("insert into " + DataBaseHelper.ROLE_TABLE_NAME + " (id,title) values " + "('" + r.get_id() + "','" + r.getTitle() + "')");
            }
        }
    }
}
