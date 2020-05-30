package com.example.myapplication.entities;

public class User {

    private String _id;
    private String id_role;
    private String first_name;
    private String last_name;
    private String sex;
    private String address;
    private String birthday;
    private String img_url;
    private String id_collaborater;
    private String id_classroom;
    public User() {
    }
    public User(String _id, String id_role, String first_name, String last_name, String id_collaborater, String id_classroom, String sex, String address, String birthday, String img_url) {
        this._id = _id;
        this.id_role = id_role;
        this.first_name = first_name;
        this.last_name = last_name;
        this.sex = sex;
        this.address = address;
        this.birthday = birthday;
        this.img_url = img_url;
        this.id_collaborater = id_collaborater;
        this.id_classroom = id_classroom;
    }

    public User(String str_fname, String str_lname) {
        this.first_name=str_fname;
        this.last_name=str_lname;
    }

    public String get_id() {
        return _id;
    }
    public void set_id(String _id) {
        this._id = _id;
    }
    public String getId_role() {
        return id_role;
    }
    public void setId_role(String id_role) {
        this.id_role = id_role;
    }
    public String getFirst_name() {
        return first_name;
    }
    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }
    public String getLast_name() {
        return last_name;
    }
    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }
    public String getSex() {
        return sex;
    }
    public void setSex(String sex) {
        this.sex = sex;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public String getBirthday() {
        return birthday;
    }
    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }
    public String getImg_url() {
        return img_url;
    }
    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }
    public String getId_collaborater() {
        return id_collaborater;
    }
    public void setId_collaborater(String id_collaborater) {
        this.id_collaborater = id_collaborater;
    }
    public String getId_classroom() {
        return id_classroom;
    }
    public void setId_classroom(String id_classroom) {
        this.id_classroom = id_classroom;
    }
}
