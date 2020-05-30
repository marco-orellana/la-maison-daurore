package com.example.myapplication.services;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import com.example.myapplication.entities.User;


public class Preferences {

    public static String TOKEN = "TOKEN";
    public static String CONNEXION_VERSION = "VERSION";
    public static String USER_FIRSTNAME = "USER_FIRSTNAME";
    public static String USER_LASTNAME = "USER_LASTNAME";
    public static String USER_EMAIL = "USER_EMAIL";
    public static String USER_IMG_URL = "USER_IMG_URL";
    public static void incrementVersion(Context ctx) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putInt(CONNEXION_VERSION, (sharedPref.getInt(CONNEXION_VERSION, -1)) + 1);
        editor.commit();
    }
    public static int getVersion(Context ctx) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        int version = sharedPref.getInt(CONNEXION_VERSION, -1);
        return version;
    }
    public static void setVersion(Context ctx, int version) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putInt(CONNEXION_VERSION, version);
        editor.commit();
    }
    public static void setToken(Context ctx, String token) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(TOKEN, token);
        editor.commit();
    }
    public static String getToken(Context ctx) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        String token = sharedPref.getString(TOKEN, "");
        return token;
    }
    public static void setUserInfos(Context ctx, User user, String email) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(USER_FIRSTNAME, user.getFirst_name());
        editor.putString(USER_LASTNAME, user.getLast_name());
        editor.putString(USER_EMAIL, email);
        editor.putString(USER_IMG_URL, user.getImg_url());
        editor.commit();
    }
    public static String getUserFirstName(Context ctx) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        String userFirstName = sharedPref.getString(USER_FIRSTNAME, "");
        return userFirstName;
    }
    public static String getUserLastName(Context ctx) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        String userLastName = sharedPref.getString(USER_LASTNAME, "");
        return userLastName;
    }
    public static String getUserImgUrl(Context ctx) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        String imgUrl = sharedPref.getString(USER_IMG_URL, "");
        return imgUrl;
    }
    public static String getUserEmail(Context ctx) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        String email = sharedPref.getString(USER_EMAIL, "");
        return email;
    }
    public static void clearUserFromPreferences(Context ctx) {
        SharedPreferences sharedPref = PreferenceManager.getDefaultSharedPreferences(ctx);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString(USER_EMAIL, "");
        editor.putString(USER_LASTNAME, "");
        editor.putString(USER_FIRSTNAME, "");
        editor.putString(USER_IMG_URL, "");
        editor.putString(TOKEN, "");
    }
}
