package com.example.myapplication.managers;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.example.myapplication.entities.Evaluation;
import com.example.myapplication.helpers.DataBaseHelper;
import com.example.myapplication.services.ConnectionBD;
import com.example.myapplication.services.DeleteJson;
import com.example.myapplication.services.PostJson;
import com.example.myapplication.services.PutJson;
import com.google.gson.Gson;

import java.util.ArrayList;


public class EvaluationManager {

    /**
     * Evaluation TABLE FIELDS
     */
    private static final String ID = "id";
    private static final String ID_SCHEDULE = "id_schedule";
    private static final String queryGetAll = "select * from " + DataBaseHelper.EVALUATION_TABLE_NAME;
    private static final String queryGetById = "select * from " + DataBaseHelper.EVALUATION_TABLE_NAME + " where id like ?";
    private static final String queryGetByIdSchedule = "select * from " + DataBaseHelper.EVALUATION_TABLE_NAME + " where id_schedule like ?";

    /**
     * getAll return all Evaluation from DataBase
     *
     * @param context
     * @return ArrayList<Evaluation>
     */
    public static ArrayList<Evaluation> getAll(Context context) {
        ArrayList<Evaluation> evaluations = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetAll, null);
        while (cursor.moveToNext()) {
            evaluations.add(new Evaluation(
                    cursor.getString(0),
                    cursor.getString(1))
            );
        }
        ConnectionBD.close();
        return evaluations;
    }

    /**
     * getById return a Evaluation by id from DataBase
     *
     * @param context
     * @return Evaluation
     */
    public static Evaluation getById(Context context, String id) {
        Evaluation evaluation = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetById, new String[]{"" + id});
        while (cursor.moveToNext()) {
            evaluation = new Evaluation(
                    cursor.getString(0),
                    cursor.getString(1)
            );
        }
        ConnectionBD.close();
        return evaluation;
    }

    /**
     * getById return a Evaluation by id_schedule from DataBase
     *
     * @param context
     * @param id_schedule
     * @return Evaluation
     */
    public static Evaluation getByIdSchedule(Context context, String id_schedule) {
        Evaluation evaluation = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByIdSchedule, new String[]{id_schedule});
        while (cursor.moveToNext()) {
            evaluation = new Evaluation(
                    cursor.getString(0),
                    cursor.getString(1)
            );
        }
        ConnectionBD.close();
        return evaluation;
    }

    /**
     * Delete Role from DataBase
     *
     * @param context
     * @param id
     */
    public static void delete(Context context, String id) {
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.delete(DataBaseHelper.EVALUATION_TABLE_NAME, "id = ?", new String[]{"" + id});
        ConnectionBD.close();
    }

    /**
     * Insert Evaluation in DataBase
     *
     * @param context
     * @param evaluation
     */
    public static void insert(Context context, Evaluation evaluation) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID, evaluation.get_id());
        contentValues.put(ID_SCHEDULE, evaluation.getId_schedule());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.insert(DataBaseHelper.EVALUATION_TABLE_NAME, null, contentValues);
    }

    /**
     * Update Evaluation in Database
     *
     * @param context
     * @param evaluation
     */
    public static void update(Context context, Evaluation evaluation) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID_SCHEDULE, evaluation.getId_schedule());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.update(DataBaseHelper.EVALUATION_TABLE_NAME, contentValues, ID + " = " + evaluation.get_id(), null);
    }

    public static void postToAPI(Context context, Evaluation evaluation,String token) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(evaluation);
        String jsonFromApi = PostJson.post(jsonToSemd, "/evaluations",token);
        Evaluation evaluationFromApi = gson.fromJson(jsonFromApi, Evaluation.class);
        EvaluationManager.insert(context, evaluationFromApi);
    }

    public static void putToAPI(Context context, Evaluation evaluation,String token) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(evaluation);
        String jsonFromApi = PutJson.put(jsonToSemd, "/evaluations",token);
        Evaluation evaluationFromApi = gson.fromJson(jsonFromApi, Evaluation.class);
        EvaluationManager.update(context, evaluationFromApi);
    }

    public static void deleteToAPI(Context context, String id,String token) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(id);
        String jsonFromApi = DeleteJson.delete("/evaluations/" + id,token);
        EvaluationManager.delete(context, id);
    }
}
