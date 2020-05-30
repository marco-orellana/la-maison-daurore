package com.example.myapplication.managers;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;
import android.widget.ArrayAdapter;

import com.example.myapplication.entities.Schedule;
import com.example.myapplication.helpers.DataBaseHelper;
import com.example.myapplication.services.ConnectionBD;
import com.example.myapplication.services.DeleteJson;
import com.example.myapplication.services.PostJson;
import com.example.myapplication.services.PutJson;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;


public class ScheduleManager {

    /**
     * Schedule TABLE FIELDS
     */
    private static final String ID = "id";
    private static final String ID_USER = "id_user";
    private static final String ID_CLASSROOM = "id_classroom";
    private static final String DATE = "date";
    private static final String IS_ABSENT = "is_absent";
    private static final String COMMENT = "comment";
    private static final String queryGetAll = "select * from " + DataBaseHelper.SCHEDULE_TABLE_NAME;
    private static final String queryGetById = "select * from " + DataBaseHelper.SCHEDULE_TABLE_NAME + " where id like ?";
    private static final String queryGetByIdUser = "select * from " + DataBaseHelper.SCHEDULE_TABLE_NAME + " where id_user like ?";
    private static final String queryGetByIdClassroom = "select * from " + DataBaseHelper.SCHEDULE_TABLE_NAME + " where id_classroom like ?";
    private static final String queryGetByDate = "select * from " + DataBaseHelper.SCHEDULE_TABLE_NAME + " where date like ?";
    private static final String queryGetByDateAndIdClassroomAndIsAbsent = "select * from " + DataBaseHelper.SCHEDULE_TABLE_NAME + " where date like ? and id_classroom like ? and is_absent = 0";
    private static final String queryGetByDateAndIdClassroom = "select * from " + DataBaseHelper.SCHEDULE_TABLE_NAME + " where date like ? and id_classroom like ? ";
    private static final String queryGetDistinctDates = "SELECT DISTINCT date FROM " + DataBaseHelper.SCHEDULE_TABLE_NAME + " where date <= ? " + " order by date DESC";
    private static final String queryGetByIdUserAndDate = "select * from " + DataBaseHelper.SCHEDULE_TABLE_NAME + " where id_user like ? and date like ?";
    /**
     * getAll return all Schedule from DataBase
     *
     * @param context
     * @return ArrayList<Schedule>
     */
    public static ArrayList<Schedule> getAll(Context context) {
        ArrayList<Schedule> schedules = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetAll, null);
        while (cursor.moveToNext()) {
            boolean is_absent = false;
            if (cursor.getInt(4) == 1) {
                is_absent = true;
            }
            schedules.add(new Schedule(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    is_absent,
                    cursor.getString(5))
            );
        }
        ConnectionBD.close();
        return schedules;
    }
    /**
     * getById return a Schedule by id from DataBase
     *
     * @param context
     * @return Schedule
     */
    public static Schedule getById(Context context, String id) {
        Schedule schedule = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetById, new String[]{"" + id});
        while (cursor.moveToNext()) {
            boolean is_absent = false;
            if (cursor.getInt(4) == 1) {
                is_absent = true;
            }
            schedule = new Schedule(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    is_absent,
                    cursor.getString(5)
            );
        }
        ConnectionBD.close();
        return schedule;
    }
    public static ArrayList<Schedule> setAll(Context context) {
        ArrayList<Schedule> schedules = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        String sql = "INSERT INTO " + DataBaseHelper.SCHEDULE_TABLE_NAME + " VALUES (" + ID + "," + ID_USER + "," + ID_CLASSROOM + "," + DATE + "," + IS_ABSENT + "," + COMMENT + ")";
        Cursor cursor = bd.rawQuery(sql, null);
        while (cursor.moveToNext()) {
            boolean is_absent = false;
            if (cursor.getInt(4) == 1) {
                is_absent = true;
            }
            schedules.add(new Schedule(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    is_absent,
                    cursor.getString(5))
            );
        }
        ConnectionBD.close();
        return schedules;
    }
    public static void insertAbscent(Context context, boolean absent) {
        ContentValues contentValues = new ContentValues();
        contentValues.put(IS_ABSENT, String.valueOf(absent));
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.update(DataBaseHelper.SCHEDULE_TABLE_NAME, contentValues, IS_ABSENT + "=?", new String[]{});
    }
    /**
     * getById return all Schedule by id_user from DataBase
     *
     * @param context
     * @param id_user
     * @return ArrayList<Schedule>
     */
    public static ArrayList<Schedule> getByIdUserAndDate(Context context, String id_user) {
        ArrayList<Schedule> schedules = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByIdUser, new String[]{id_user});
        while (cursor.moveToNext()) {
            boolean is_absent = false;
            if (cursor.getInt(4) == 1) {
                is_absent = true;
            }
            schedules.add(new Schedule(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    is_absent,
                    cursor.getString(5))
            );
        }
        ConnectionBD.close();
        return schedules;
    }
    /**
     * getById return all Schedule by id_classroom from DataBase
     *
     * @param context
     * @param id_classroom
     * @return ArrayList<Schedule>
     */
    public static ArrayList<Schedule> getByIdClassroom(Context context, String id_classroom) {
        ArrayList<Schedule> schedules = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByIdClassroom, new String[]{id_classroom});
        while (cursor.moveToNext()) {
            boolean is_absent = false;
            if (cursor.getInt(4) == 1) {
                is_absent = true;
            }
            schedules.add(new Schedule(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    is_absent,
                    cursor.getString(5))
            );
        }
        ConnectionBD.close();
        return schedules;
    }
    /**
     * getById return all Schedule by date from DataBase
     *
     * @param context
     * @param date
     * @return ArrayList<Schedule>
     */
    public static ArrayList<Schedule> getByDate(Context context, String date) {
        ArrayList<Schedule> schedules = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByDate, new String[]{date});
        while (cursor.moveToNext()) {
            boolean is_absent = false;
            if (cursor.getInt(4) == 1) {
                is_absent = true;
            }
            schedules.add(new Schedule(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    is_absent,
                    cursor.getString(5))
            );
        }
        ConnectionBD.close();
        return schedules;
    }
    public static ArrayList<Schedule> getByDateAndIdClassroom(Context context, String date, String idClassroom) {
        ArrayList<Schedule> schedules = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByDateAndIdClassroom, new String[]{date, idClassroom});
        while (cursor.moveToNext()) {
            boolean is_absent = false;
            if (cursor.getInt(4) == 1) {
                is_absent = true;
            }
            schedules.add(new Schedule(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    is_absent,
                    cursor.getString(5))
            );
        }
        ConnectionBD.close();
        return schedules;
    } public static ArrayList<Schedule> getByDateAndIdClassroomandIsAbsent(Context context, String date, String idClassroom) {
        ArrayList<Schedule> schedules = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByDateAndIdClassroomAndIsAbsent, new String[]{date, idClassroom});
        while (cursor.moveToNext()) {
            boolean is_absent = false;
            if (cursor.getInt(4) == 1) {
                is_absent = true;
            }
            schedules.add(new Schedule(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    is_absent,
                    cursor.getString(5))
            );
        }
        ConnectionBD.close();
        return schedules;
    }
    public static ArrayList<String> getUniquesDates(Context context, String date) {
        ArrayList<String> dates = new ArrayList<>();
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetDistinctDates, new String[]{date});
        while (cursor.moveToNext()) {
            dates.add(cursor.getString(0));
        }
        ConnectionBD.close();
        return dates;
    }
    public static Schedule getByIdUserAndDate(Context context, String id_user, String date) {
        Schedule schedule = null;
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        Cursor cursor = bd.rawQuery(queryGetByIdUserAndDate, new String[]{id_user, date});
        while (cursor.moveToNext()) {
            boolean is_absent = false;
            if (cursor.getInt(4) == 1) {
                is_absent = true;
            }
            schedule = new Schedule(
                    cursor.getString(0),
                    cursor.getString(1),
                    cursor.getString(2),
                    cursor.getString(3),
                    is_absent,
                    cursor.getString(5)
            );
        }
        ConnectionBD.close();
        return schedule;
    }
    /**
     * Delete Schedule from DataBase
     *
     * @param context
     * @param id
     */
    public static void delete(Context context, String id) {
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.delete(DataBaseHelper.SCHEDULE_TABLE_NAME, "id = ?", new String[]{"" + id});
        ConnectionBD.close();
    }
    /**
     * Insert Schedule in DataBase
     *
     * @param context
     * @param schedule
     */
    public static void insert(Context context, Schedule schedule) {
        int is_absent = 0;
        if (schedule.getIs_absent()) {
            is_absent = 1;
        }
        ContentValues contentValues = new ContentValues();
        contentValues.put(ID, schedule.get_id());
        contentValues.put(ID_USER, schedule.getId_user());
        contentValues.put(ID_CLASSROOM, schedule.getId_classroom());
        contentValues.put(DATE, schedule.getDate());
        contentValues.put(IS_ABSENT, is_absent);
        contentValues.put(COMMENT, schedule.getComment());
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.insert(DataBaseHelper.SCHEDULE_TABLE_NAME, null, contentValues);
    }
    /**
     * Update Schedule in Database
     *
     * @param context
     * @param schedule
     */
    public static void update(Context context, Schedule schedule) {
        int is_absent = 0;
        if (schedule.getIs_absent()) {
            is_absent = 1;
        }
        ContentValues contentValues = new ContentValues();
        contentValues.put(IS_ABSENT, is_absent);
        SQLiteDatabase bd = ConnectionBD.getBd(context);
        bd.update(DataBaseHelper.SCHEDULE_TABLE_NAME, contentValues, ID + " like " + "\"" + schedule.get_id() + "\"", null);
    }
    public static void postToAPI(Context context, Schedule schedule, String token) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(schedule);
        String jsonFromApi = PostJson.post(jsonToSemd, "/schedules", token);
        Schedule scheduleFromApi = gson.fromJson(jsonFromApi, Schedule.class);
        ScheduleManager.insert(context, scheduleFromApi);
    }
    public static void putToAPI(Context context, Schedule schedule, String token) {
        Gson gson = new Gson();
        Schedule scheduleToSend = new Schedule(schedule.get_id(), schedule.getIs_absent());
        String jsonToSemd = gson.toJson(scheduleToSend);
        String jsonFromApi = PutJson.put(jsonToSemd, "/schedules/" + scheduleToSend.get_id(), token);
        Log.d("Json", "putToAPI: " + jsonFromApi);
        ScheduleManager.update(context, schedule);
    }
    public static void deleteToAPI(Context context, String id, String token) {
        Gson gson = new Gson();
        String jsonToSemd = gson.toJson(id);
        String jsonFromApi = DeleteJson.delete("/schedules/" + id, token);
        ScheduleManager.delete(context, id);
    }
}
