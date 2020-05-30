package com.example.myapplication.helpers;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.example.myapplication.entities.Schedule;
import com.example.myapplication.entities.User;
import com.example.myapplication.managers.ScheduleManager;
import com.example.myapplication.services.ConnectionBD;

import java.util.HashMap;

import androidx.annotation.Nullable;


public class DataBaseHelper extends SQLiteOpenHelper {

    //URL OF SERVER
    public static final String URL_SERVER = "https://maison-aurore-api.herokuapp.com";
    // TABLES NAMES
    public static final String SCHEDULE_TABLE_NAME = "schedule";
    public static final String ROLE_TABLE_NAME = "role";
    public static final String USER_TABLE_NAME = "user";
    public static final String LOGIN_TABLE_NAME = "login";
    public static final String INCONSISTENCY_TABLE_NAME = "inconsistency";
    public static final String EVALUATION_TABLE_NAME = "evalutation";
    public static final String EVALUATION_CLOSED_QUESTIONS_TABLE_NAME = "evalutation_closed_questions";
    public static final String EVALUATION_OPEN_QUESTIONS_TABLE_NAME = "evalutation_open_questions";
    public static final String CLASSROOM_TABLE_NAME = "classroom";
    // TABLES CREATES STATEMENTS
    private static final String CREATE_TABLE_USER = ("create table " + USER_TABLE_NAME + "(" + "id text primary key , id_role text, first_name text, last_name text, id_collaborater text, id_classroom text ,sex text, address text, birthday text ,img_url text)");
    private static final String CREATE_TABLE_ROLE = ("create table " + ROLE_TABLE_NAME + "(" + "id text primary key , title text)");
    private static final String CREATE_TABLE_LOGIN = ("create table " + LOGIN_TABLE_NAME + "(" + "id text primary key , id_user text, email text, password text)");
    private static final String CREATE_TABLE_CLASSROOM = ("create table " + CLASSROOM_TABLE_NAME + "(" + "id text primary key , title text, phone text, seat integer)");
    private static final String CREATE_TABLE_SCHEDULE = ("create table " + SCHEDULE_TABLE_NAME + "(" + "id text primary key , id_user text, id_classroom text, date text, is_absent integer, comment text)");
    private static final String CREATE_TABLE_INCONSISTENCY = ("create table " + INCONSISTENCY_TABLE_NAME + "(" + "id text primary key , id_schedule text, id_child text, id_collaborator text)");
    private static final String CREATE_TABLE_EVALUATION = ("create table " + EVALUATION_TABLE_NAME + "(" + "id text primary key , id_schedule text)");
    private static final String CREATE_TABLE_EVALUATION_CLOSED_QUESTIONS = ("create table " + EVALUATION_CLOSED_QUESTIONS_TABLE_NAME + "(" + "id text primary key , id_evaluation text, title text, answer text)");
    private static final String CREATE_TABLE_EVALUATION_OPEN_QUESTIONS = ("create table " + EVALUATION_OPEN_QUESTIONS_TABLE_NAME + "(" + "id text primary key , id_evaluation text, title text, answer text)");
    public DataBaseHelper(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
    }
    @Override
    public void onCreate(SQLiteDatabase db) {
        // Creation
        db.execSQL(CREATE_TABLE_ROLE);
        db.execSQL(CREATE_TABLE_USER);
        db.execSQL(CREATE_TABLE_LOGIN);
        db.execSQL(CREATE_TABLE_SCHEDULE);
        db.execSQL(CREATE_TABLE_CLASSROOM);
        db.execSQL(CREATE_TABLE_INCONSISTENCY);
        db.execSQL(CREATE_TABLE_EVALUATION);
        db.execSQL(CREATE_TABLE_EVALUATION_CLOSED_QUESTIONS);
        db.execSQL(CREATE_TABLE_EVALUATION_OPEN_QUESTIONS);

   //ScheduleHelper.getFromAPI(db,"");
    }
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // Suppressions
        db.execSQL("DROP TABLE IF EXISTS " + ROLE_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + USER_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + LOGIN_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + SCHEDULE_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + CLASSROOM_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + INCONSISTENCY_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + EVALUATION_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + EVALUATION_CLOSED_QUESTIONS_TABLE_NAME);
        db.execSQL("DROP TABLE IF EXISTS " + EVALUATION_OPEN_QUESTIONS_TABLE_NAME);
        // Creation
        onCreate(db);


    }



}
