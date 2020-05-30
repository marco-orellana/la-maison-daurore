package com.example.myapplication.managers;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.example.myapplication.entities.Inconsistency;
import com.example.myapplication.helpers.DataBaseHelper;
import com.example.myapplication.services.ConnectionBD;
import com.example.myapplication.services.DeleteJson;
import com.example.myapplication.services.PostJson;
import com.example.myapplication.services.PutJson;
import com.google.gson.Gson;

import java.util.ArrayList;


public class InconsistencyManager {

    /**
     * Inconsistency TABLE FIELDS
     */
    private static final String ID = "id";
    private static final String ID_SCHEDULE = "id_schedule";
    private static final String ID_CHILD = "id_child";
    private static final String ID_COLLABORATOR = "id_collaborator";
    private static final String queryGetAll = "select * from " + DataBaseHelper.INCONSISTENCY_TABLE_NAME;
    private static final String queryGetById = "select * from " + DataBaseHelper.INCONSISTENCY_TABLE_NAME + " where id like ?";
    private static final String queryGetByIdSchedule = "select * from " + DataBaseHelper.INCONSISTENCY_TABLE_NAME + " where id_schedule like ?";
    private static final String queryGetByIdChild = "select * from " + DataBaseHelper.INCONSISTENCY_TABLE_NAME + " where id_child like ?";
    private static final String queryGetByIdCollaborator = "select * from " + DataBaseHelper.INCONSISTENCY_TABLE_NAME + " where id_collaborator like ?";

    /**
     * getAll return all Inconsistency from DataBase
     *
     * @param context
     * @return ArrayList<Inconsistency>
     */
    public static ArrayList<Inconsistency> getAll(Context context) {
        ArrayList<Inconsistency> inconsistencies = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetAll, null);
        while (cursor.moveToNext()) {
            inconsistencies.add(new Inconsistency(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3))
            );
        }
        ConnectionBD.close();
        return inconsistencies;
    }

    /**
     * getById return a Inconsistency by id from DataBase
     *
     * @param context
     * @return Inconsistency
     */
    public static Inconsistency getById(Context context, String id) {
        Inconsistency inconsistency = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetById, new String[]{"" + id});
        while (cursor.moveToNext()) {
            inconsistency = new Inconsistency(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3)
            );
        }
        ConnectionBD.close();
        return inconsistency;
    }

    /**
     * getByIdSchedule return a Inconsistency by id_schedule from DataBase
     *
     * @param context
     * @param id_schedule
     * @return Inconsistency
     */
    public static Inconsistency getByIdSchedule(Context context, String id_schedule) {
        Inconsistency inconsistency = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByIdSchedule, new String[]{id_schedule});
        while (cursor.moveToNext()) {
            inconsistency = new Inconsistency(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3)
            );
        }
        ConnectionBD.close();
        return inconsistency;
    }

    /**
     * getByIdChild return all Inconsistency by id_child from DataBase
     *
     * @param context
     * @param id_child
     * @return ArrayList<Inconsistency>
     */
    public static ArrayList<Inconsistency> getByIdChild(Context context, String id_child) {
        ArrayList<Inconsistency> inconsistencies = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByIdChild, new String[]{id_child});
        while (cursor.moveToNext()) {
            inconsistencies.add(new Inconsistency(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3))
            );
        }
        ConnectionBD.close();
        return inconsistencies;
    }

    /**
     * getByIdCollaborator return all Inconsistency by id_collaborator from DataBase
     *
     * @param context
     * @param id_collaborator
     * @return ArrayList<Inconsistency>
     */
    public static ArrayList<Inconsistency> getByIdCollaborator(Context context, String id_collaborator) {
        ArrayList<Inconsistency> inconsistencies = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByIdCollaborator, new String[]{id_collaborator});
        while (cursor.moveToNext()) {
            inconsistencies.add(new Inconsistency(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3))
            );
        }
        ConnectionBD.close();
        return inconsistencies;
    }

    /**
     * Delete Inconsistency from DataBase
     *
     * @param context
     * @param id
     */
    public static void delete(Context context, String id) {
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.delete(DataBaseHelper.INCONSISTENCY_TABLE_NAME, "id = ?", new String[]{"" + id});
        ConnectionBD.close();
    }

    /**
     * Insert Inconsistency in DataBase
     *
     * @param context
     * @param inconsistency
     */
    public static void insert(Context context, Inconsistency inconsistency) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID, inconsistency.get_id());
        contentValues.put(ID_SCHEDULE, inconsistency.getId_schedule());
        contentValues.put(ID_CHILD, inconsistency.getId_child());
        contentValues.put(ID_COLLABORATOR, inconsistency.getId_collaborator());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.insert(DataBaseHelper.INCONSISTENCY_TABLE_NAME, null, contentValues);
    }

    /**
     * Update Inconsistency in Database
     *
     * @param context
     * @param inconsistency
     */
    public static void update(Context context, Inconsistency inconsistency) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID_SCHEDULE, inconsistency.getId_schedule());
        contentValues.put(ID_CHILD, inconsistency.getId_child());
        contentValues.put(ID_COLLABORATOR, inconsistency.getId_collaborator());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.update(DataBaseHelper.INCONSISTENCY_TABLE_NAME, contentValues, ID + " = " + inconsistency.get_id(), null);
    }

    public static void postToAPI(Context context, Inconsistency inconsistency,String token) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(inconsistency);
        String jsonFromApi = PostJson.post(jsonToSemd, "/inconsistencies",token);
        Inconsistency inconsistencyFromApi = gson.fromJson(jsonFromApi, Inconsistency.class);
        InconsistencyManager.insert(context, inconsistencyFromApi);
    }

    public static void putToAPI(Context context, Inconsistency inconsistency,String token) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(inconsistency);
        String jsonFromApi = PutJson.put(jsonToSemd, "/inconsistencies",token);
        Inconsistency inconsistencyFromApi = gson.fromJson(jsonFromApi, Inconsistency.class);
        InconsistencyManager.update(context, inconsistencyFromApi);
    }

    public static void deleteToAPI(Context context, String id,String token) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(id);
        String jsonFromApi = DeleteJson.delete("/inconsistencies/" + id,token);
        InconsistencyManager.delete(context, id);
    }
}
