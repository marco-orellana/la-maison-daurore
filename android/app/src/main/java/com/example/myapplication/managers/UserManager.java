package com.example.myapplication.managers;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import com.example.myapplication.entities.User;
import com.example.myapplication.helpers.DataBaseHelper;
import com.example.myapplication.services.ConnectionBD;
import com.example.myapplication.services.DeleteJson;
import com.example.myapplication.services.PostJson;
import com.example.myapplication.services.PutJson;
import com.google.gson.Gson;

import java.util.ArrayList;


public class UserManager {

    /**
     * User TABLE FIELDS
     */
    private static final String ID = "id";
    private static final String ID_ROLE = "id_role";
    private static final String FIRST_NAME = "first_name";
    private static final String LAST_NAME = "last_name";
    private static final String SEX = "sex";
    private static final String ADDRESS = "address";
    private static final String BIRTHDAY = "birthday";
    private static final String IMG_URL = "img_url";
    private static final String ID_COLLABORATER = "id_collaborater";
    private static final String ID_CLASSROOM = "id_classroom";
    /**
     * User TABLE'S QUERIES
     */
    private static final String queryGetAll = "select * from " + DataBaseHelper.USER_TABLE_NAME;
    private static final String queryGetById = "select * from " + DataBaseHelper.USER_TABLE_NAME + " where id like ?";
    private static final String queryGetByRole = "select * from " + DataBaseHelper.USER_TABLE_NAME + " where id_role like ?";
    private static final String queryGetByClassroom = "select * from " + DataBaseHelper.USER_TABLE_NAME + " where id_classroom like ?";
    private static final String queryGetByColaborateur = "select * from " + DataBaseHelper.USER_TABLE_NAME + " where id_collaborater like ?";
    private static final String queryGetBySchedule = "select * from " + DataBaseHelper.USER_TABLE_NAME + " where id_schedule like ?";


    /**
     * getAll return all users from DataBase
     *
     * @param context
     * @return ArrayList<User>
     */
    public static ArrayList<User> getAll(Context context) {
        ArrayList<User> users = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetAll, null);
        while (cursor.moveToNext()) {
            users.add(new User(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    cursor.getString(4),
                    cursor.getString(5),
                    cursor.getString(6),
                    cursor.getString(7),
                    cursor.getString(8),
                    cursor.getString(9))
            );
        }
        ConnectionBD.close();
        return users;
    }
    /**
     * getById return  User by id from DataBase
     *
     * @param context
     * @param id
     * @return User
     */
    public static User getById(Context context, String id) {
        User user = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetById, new String[]{ id});
        while (cursor.moveToNext()) {
            user = new User(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    cursor.getString(4),
                    cursor.getString(5),
                    cursor.getString(6),
                    cursor.getString(7),
                    cursor.getString(8),
                    cursor.getString(9));
        }
        ConnectionBD.close();
        return user;
    }
    public static ArrayList<User> getBySchedule(Context context, String idSchedule) {
        ArrayList<User> users = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetBySchedule, new String[]{"" + idSchedule});
        while (cursor.moveToNext()) {
            users.add(new User(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    cursor.getString(4),
                    cursor.getString(5),
                    cursor.getString(6),
                    cursor.getString(7),
                    cursor.getString(8),
                    cursor.getString(9))
            );
        }
        ConnectionBD.close();
        return users;
    }
    /**
     * getByCategory return all users by roles from DataBase
     *
     * @param context
     * @param idRole
     * @return ArrayList<User>
     */

    public static ArrayList<User> getByRole(Context context, String idRole) {
        ArrayList<User> users = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByRole, new String[]{"" + idRole});
        while (cursor.moveToNext()) {
            users.add(new User(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    cursor.getString(4),
                    cursor.getString(5),
                    cursor.getString(6),
                    cursor.getString(7),
                    cursor.getString(8),
                    cursor.getString(9))
            );
        }
        ConnectionBD.close();
        return users;
    }
    public static ArrayList<User> getByIdClassroom(Context context, String idClassroom) {
        ArrayList<User> users = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByClassroom, new String[]{"" + idClassroom});
        while (cursor.moveToNext()) {
            users.add(new User(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    cursor.getString(4),
                    cursor.getString(5),
                    cursor.getString(6),
                    cursor.getString(7),
                    cursor.getString(8),
                    cursor.getString(9))
            );
        }
        ConnectionBD.close();
        return users;
    }
    /**
     * Insert user in DataBase
     *
     * @param context
     * @param user
     */
    public static void insert(Context context, User user) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID, user.get_id());
        contentValues.put(ID_ROLE, user.getId_role());
        contentValues.put(FIRST_NAME, user.getFirst_name());
        contentValues.put(LAST_NAME, user.getLast_name());
        contentValues.put(SEX, user.getSex());
        contentValues.put(ADDRESS, user.getAddress());
        contentValues.put(BIRTHDAY, user.getBirthday());
        contentValues.put(IMG_URL, user.getImg_url());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.insert(DataBaseHelper.USER_TABLE_NAME, null, contentValues);
    }
    /**
     * Update user in Database
     *
     * @param context
     * @param user
     */
    public static void update(Context context, User user) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID_ROLE, user.getId_role());
        contentValues.put(FIRST_NAME, user.getFirst_name());
        contentValues.put(LAST_NAME, user.getLast_name());
        contentValues.put(SEX, user.getSex());
        contentValues.put(ADDRESS, user.getAddress());
        contentValues.put(BIRTHDAY, user.getBirthday());
        contentValues.put(IMG_URL, user.getImg_url());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.update(DataBaseHelper.USER_TABLE_NAME, contentValues, ID + " = " + user.get_id(), null);
    }
    /**
     * Delete user from DataBase
     *
     * @param context
     * @param id
     */
    public static void delete(Context context, String id) {
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.delete(DataBaseHelper.USER_TABLE_NAME, "id = ?", new String[]{"" + id});
        ConnectionBD.close();
    }
    public static void postToAPI(Context context, User user, String token) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(user);
        String jsonFromApi = PostJson.post(jsonToSemd, "/users", token);
        User userFromApi = gson.fromJson(jsonFromApi, User.class);
        UserManager.insert(context, userFromApi);
    }
    public static void putToAPI(Context context, User user, String token) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(user);
        String jsonFromApi = PutJson.put(jsonToSemd, "/users", token);
        User userFromApi = gson.fromJson(jsonFromApi, User.class);
        UserManager.update(context, userFromApi);
    }
    public static void uploadImageFromApi(Context context, String id, String img_url) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(img_url);
        String jsonFromApi = PutJson.put(jsonToSemd, "/users/" + id, img_url);
        //User userFromApi = gson.fromJson(jsonFromApi, User.class);
        //UserManager.update(context, userFromApi);

    }
    public static void deleteToAPI(Context context, String id, String token) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(id);
        String jsonFromApi = DeleteJson.delete("/users/" + id, token);
        UserManager.delete(context, id);
    }
}
