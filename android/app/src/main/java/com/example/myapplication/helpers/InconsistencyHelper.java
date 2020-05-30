package com.example.myapplication.helpers;

import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.example.myapplication.entities.Inconsistency;
import com.example.myapplication.services.Data;
import com.example.myapplication.services.GetJson;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;


public class InconsistencyHelper {

    public static void getFromAPI(SQLiteDatabase db,String token) {
        String json = GetJson.get("/inconsistencies", token);
        if (json != null) {
            Gson gson = new Gson();
            Type type = new TypeToken<Data<Inconsistency>>() {
            }.getType();
            Data<Inconsistency> data = gson.fromJson(json, type);
            ArrayList<Inconsistency> inconsistencies = data.getData();
            for (Inconsistency i : inconsistencies) {
                Log.d("JsonGetInconsistencies", "id: " + i.get_id() + " title: " + i.getId_schedule());
                db.execSQL("insert into " + DataBaseHelper.INCONSISTENCY_TABLE_NAME + " (id, id_shcedule, id_child, id_collaborator) values " + "('" + i.get_id() + "','" + i.getId_schedule() + "','" + i.getId_child() + "','" + i.getId_collaborator() + "')");
            }
        }
    }
}
