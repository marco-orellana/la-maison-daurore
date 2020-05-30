package com.example.myapplication.helpers;

import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.example.myapplication.entities.User;
import com.example.myapplication.services.Data;
import com.example.myapplication.services.GetJson;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Type;
import java.util.ArrayList;


public class UserHelper {

    public static void getFromAPI(SQLiteDatabase db, String token) {
        String json = GetJson.get("/users", token);
        if (json != null) {
            Gson gson = new Gson();
            Type type = new TypeToken<Data<User>>() {
            }.getType();
            Data<User> data = gson.fromJson(json, type);
            ArrayList<User> users = data.getData();
            for (User u : users) {
                String jsonUrl = GetJson.get("/users/" + u.get_id() + "/photo", token);
                JSONObject jsonResult = null;
                try {
                    jsonResult = new JSONObject(jsonUrl);
                    String img_url = jsonResult.getString("data");
//                    if (u.getId_classroom() != null ) {
                    Log.d("JsonGetlistUser", "id_classroom: " + u.getId_classroom() + " title: " + u.getFirst_name() + " img url: " + img_url);
                    db.execSQL("insert into " + DataBaseHelper.USER_TABLE_NAME + " (id, id_role, first_name, last_name, id_collaborater, id_classroom, sex, address, birthday, img_url) values " + "('" + u.get_id() + "','" + u.getId_role() + "','" + u.getFirst_name() + "','" + u.getLast_name() + "','" + u.getId_collaborater() + "','" + u.getId_classroom() + "','" + u.getSex() + "','" + u.getAddress() + "','" + u.getBirthday() + "','" + img_url + "')");
//                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
