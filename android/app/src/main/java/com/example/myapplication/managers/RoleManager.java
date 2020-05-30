package com.example.myapplication.managers;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.example.myapplication.entities.Role;
import com.example.myapplication.helpers.DataBaseHelper;
import com.example.myapplication.services.ConnectionBD;
import com.example.myapplication.services.DeleteJson;
import com.example.myapplication.services.PostJson;
import com.example.myapplication.services.PutJson;
import com.google.gson.Gson;

import java.util.ArrayList;


public class RoleManager {
    /**
     * Role TABLE FIELDS
     */
    private static final String ID = "id";
    private static final String TITLE = "title";
    private static final String queryGetAll = "select * from " + DataBaseHelper.ROLE_TABLE_NAME;
    private static final String queryGetById = "select * from " + DataBaseHelper.ROLE_TABLE_NAME + " where id like ?";
    private static final String queryGetByTitle = "select * from " + DataBaseHelper.ROLE_TABLE_NAME + " where title like ?";

    /**
     * getAll return all Role from DataBase
     *
     * @param context
     * @return ArrayList<Role>
     */
    public static ArrayList<Role> getAll(Context context) {
        ArrayList<Role> roles = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetAll, null);
        while (cursor.moveToNext()) {
            roles.add(new Role(
                    cursor.getString(0),
                    cursor.getString(1))
            );
        }
        ConnectionBD.close();
        return roles;
    }

    /**
     * getById return a Role by id from DataBase
     *
     * @param context
     * @return Role
     */
    public static Role getById(Context context, String id) {
        Role role = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetById, new String[]{"" + id});
        while (cursor.moveToNext()) {
            role = new Role(
                    cursor.getString(0),
                    cursor.getString(1)
            );
        }
        ConnectionBD.close();
        return role;
    }

    /**
     * getById return a Role by title from DataBase
     *
     * @param context
     * @param title
     * @return Role
     */
    public static Role getByTitle(Context context, String title) {
        Role role = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByTitle, new String[]{title});
        while (cursor.moveToNext()) {
            role = new Role(
                    cursor.getString(0),
                    cursor.getString(1)
            );
        }
        ConnectionBD.close();
        return role;
    }

    /**
     * Delete Role from DataBase
     *
     * @param context
     * @param id
     */
    public static void delete(Context context, String id) {
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.delete(DataBaseHelper.ROLE_TABLE_NAME, "id = ?", new String[]{"" + id});
        ConnectionBD.close();
    }

    /**
     * Insert Role in DataBase
     *
     * @param context
     * @param role
     */
    public static void insert(Context context, Role role) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID, role.get_id());
        contentValues.put(TITLE, role.getTitle());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.insert(DataBaseHelper.ROLE_TABLE_NAME, null, contentValues);
    }

    /**
     * Update Role in Database
     *
     * @param context
     * @param role
     */
    public static void update(Context context, Role role) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(TITLE, role.getTitle());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.update(DataBaseHelper.ROLE_TABLE_NAME, contentValues, ID + " = " + role.get_id(), null);
    }

    public static void postToAPI(Context context, Role role,String token) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(role);
        String jsonFromApi = PostJson.post(jsonToSemd, "/roles",token);
        Role roleFromApi = gson.fromJson(jsonFromApi, Role.class);
        RoleManager.insert(context, roleFromApi);
    }

    public static void putToAPI(Context context, Role role,String token) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(role);
        String jsonFromApi = PutJson.put(jsonToSemd, "/roles",token);
        Role roleFromApi = gson.fromJson(jsonFromApi, Role.class);
        RoleManager.update(context, roleFromApi);
    }

    public static void deleteToAPI(Context context, String id,String token) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(id);
        String jsonFromApi = DeleteJson.delete("/roles/" + id,token);
        RoleManager.delete(context, id);
    }
}
