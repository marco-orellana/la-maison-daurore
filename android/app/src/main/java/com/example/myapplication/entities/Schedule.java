package com.example.myapplication.entities;

public class Schedule {

    String _id;
    String id_user;
    String id_classroom;
    String date;
    Boolean is_absent;
    String comment;
    public Schedule() {
    }
    public Schedule(String _id, String id_user, String id_classroom, String date, Boolean is_absent, String comment) {
        this._id = _id;
        this.id_user = id_user;
        this.id_classroom = id_classroom;
        this.date = date;
        this.is_absent = is_absent;
        this.comment = comment;
    }
    public Schedule(String _id, Boolean is_absent) {
        this._id = _id;
        this.is_absent = is_absent;
    }
    public Schedule(Boolean cb_str) {
        this.is_absent = cb_str;
    }
    public String get_id() {
        return _id;
    }
    public void set_id(String _id) {
        this._id = _id;
    }
    public String getId_user() {
        return id_user;
    }
    public void setId_user(String id_user) {
        this.id_user = id_user;
    }
    public String getId_classroom() {
        return id_classroom;
    }
    public void setId_classroom(String id_classroom) {
        this.id_classroom = id_classroom;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public boolean getIs_absent() {
        return is_absent;
    }
    public void setIs_absent(Boolean is_absent) {
        this.is_absent = is_absent;
    }
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
}
