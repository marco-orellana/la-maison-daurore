package com.example.myapplication.entities;

public class Inconsistency {

    String _id;
    String id_schedule;
    String id_child;
    String id_collaborator;

    public Inconsistency() {
    }

    public Inconsistency(String _id, String id_schedule, String id_child, String id_collaborator) {
        this._id = _id;
        this.id_schedule = id_schedule;
        this.id_child = id_child;
        this.id_collaborator = id_collaborator;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getId_schedule() {
        return id_schedule;
    }

    public void setId_schedule(String id_schedule) {
        this.id_schedule = id_schedule;
    }

    public String getId_child() {
        return id_child;
    }

    public void setId_child(String id_child) {
        this.id_child = id_child;
    }

    public String getId_collaborator() {
        return id_collaborator;
    }

    public void setId_collaborator(String id_collaborator) {
        this.id_collaborator = id_collaborator;
    }
}
