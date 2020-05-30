package com.example.myapplication.entities;

public class Classroom {

    String _id;
    String title;
    String phone;
    int seat;

    public Classroom() {
    }

    public Classroom(String _id, String title, String phone, int seat) {
        this._id = _id;
        this.title = title;
        this.phone = phone;
        this.seat = seat;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getSeat() {
        return seat;
    }

    public void setSeat(int seat) {
        this.seat = seat;
    }
}
