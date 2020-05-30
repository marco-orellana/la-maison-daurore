package com.example.myapplication.helpers;

import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.example.myapplication.entities.Schedule;
import com.example.myapplication.services.Data;
import com.example.myapplication.services.GetJson;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;


public class ScheduleHelper {

    public static void getFromAPI(SQLiteDatabase db, String token) {
        String json = GetJson.get("/schedules", token);
        if (json != null) {
            Gson gson = new Gson();
            Type type = new TypeToken<Data<Schedule>>() {
            }.getType();
            Data<Schedule> data = gson.fromJson(json, type);
            ArrayList<Schedule> schedules = data.getData();
            for (Schedule s : schedules) {
                int is_absent = 0;
                if (s.getIs_absent()) {
                    is_absent = 1;
                }
                String dateString = s.getDate().substring(0, s.getDate().indexOf("T"));
                Log.d("JsonGetlistSchedule", "id_classroom: " + s.getId_classroom() + " title: " + dateString);
                db.execSQL("insert into " + DataBaseHelper.SCHEDULE_TABLE_NAME + " (id, id_user, id_classroom, date, is_absent, comment) values " + "('" + s.get_id() + "','" + s.getId_user() + "','" + s.getId_classroom() + "','" + dateString + "','" + is_absent + "','" + s.getComment() + "')");
            }
        }
    }
}
