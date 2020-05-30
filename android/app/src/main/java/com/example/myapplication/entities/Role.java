package com.example.myapplication.entities;

public class Role {

    String _id;
    String title;

    public Role() {
    }

    public Role(String _id, String title) {
        this._id = _id;
        this.title = title;
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
}
