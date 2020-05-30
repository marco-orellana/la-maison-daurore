package com.example.myapplication.services;

import android.content.Context;
import android.content.res.AssetManager;
import android.database.sqlite.SQLiteDatabase;

import com.example.myapplication.helpers.DataBaseHelper;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;


public class ConnectionBD {

    private static SQLiteDatabase bd;
    private static String nomBd = "maisonaurore";
    public static SQLiteDatabase getBd(Context ctx) {
        DataBaseHelper dataBaseHelper = new DataBaseHelper(ctx, nomBd, null, Preferences.getVersion(ctx));
        bd = dataBaseHelper.getWritableDatabase();
        return bd;
    }
    public static void close() {
        bd.close();
    }
    public static void copyBdFromAssets(Context context) {
        File bdApp = context.getDatabasePath(nomBd);
        if (!bdApp.exists()) getBd(context);
        AssetManager assetManager = context.getAssets();
        try {
            InputStream in = assetManager.open("bd/maisonaurore.db");
            FileOutputStream out = new FileOutputStream(bdApp);
            byte[] buffer = new byte[256];
            while (in.read(buffer) != -1) {
                out.write(buffer);
                buffer = new byte[256];
            }
            in.close();
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
