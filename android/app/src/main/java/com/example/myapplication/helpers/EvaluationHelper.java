package com.example.myapplication.helpers;

import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

import com.example.myapplication.entities.Evaluation;
import com.example.myapplication.entities.EvaluationClosedQuestions;
import com.example.myapplication.services.Data;
import com.example.myapplication.services.GetJson;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;


public class EvaluationHelper {

    public static void getFromAPI(SQLiteDatabase db, String token) {
        String json = GetJson.get("/evaluations", token);
        if (json != null) {
            Gson gson = new Gson();
            Type type = new TypeToken<Data<Evaluation>>() {
            }.getType();
            Data<Evaluation> data = gson.fromJson(json, type);
            ArrayList<Evaluation> evaluations = data.getData();
            if (evaluations != null) {
                for (Evaluation e : evaluations) {
                    Log.d("JsonGetlistEvaluation", "id: " + e.get_id() + " title: " + e.getId_schedule() + " questions: " + json);
                    db.execSQL("insert into " + DataBaseHelper.EVALUATION_TABLE_NAME + " (id, id_schedule) values " + "('" + e.get_id() + "','" + e.getId_schedule() + "')");
                }
            }
        }
    }
}
