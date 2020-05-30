package com.example.myapplication.entities;

public class Login {
    String _id;
    String id_user;
    String email;
    String password;


    public Login() {
    }

    public Login(String _id, String id_user, String email, String password) {
        this._id = _id;
        this.id_user = id_user;
        this.email = email;
        this.password = password;
    }
    public Login(String email, String password) {
        this.email = email;
        this.password = password;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
