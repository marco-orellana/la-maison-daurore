package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.myapplication.helpers.ClassroomHelper;
import com.example.myapplication.helpers.EvaluationHelper;
import com.example.myapplication.helpers.RoleHelper;
import com.example.myapplication.helpers.ScheduleHelper;
import com.example.myapplication.helpers.UserHelper;
import com.example.myapplication.managers.ScheduleManager;
import com.example.myapplication.services.ConnectionBD;
import com.example.myapplication.services.Preferences;

import java.util.ArrayList;


public class StartActivity extends AppCompatActivity {

    private final int SPLASH_DISPLAY_LENGTH = 3000;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_start);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                try{
                    /* Create an Intent that will start the Main-Activity. */
                    RoleHelper.getFromAPI(ConnectionBD.getBd(StartActivity.this), Preferences.getToken(StartActivity.this));
                    UserHelper.getFromAPI(ConnectionBD.getBd(StartActivity.this), Preferences.getToken(StartActivity.this));
                    ClassroomHelper.getFromAPI(ConnectionBD.getBd(StartActivity.this), Preferences.getToken(StartActivity.this));
//        EvaluationHelper.getFromAPI(ConnectionBD.getBd(StartActivity.this), Preferences.getToken(StartActivity.this));
                    ScheduleHelper.getFromAPI(ConnectionBD.getBd(StartActivity.this), Preferences.getToken(StartActivity.this));
                    Intent intent = new Intent(getApplicationContext(), Main2Activity.class);
                    startActivity(intent);
                    finish();
                }catch(Exception e){
                    Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
                    intent.putExtra("error","Login Failed!");
                    startActivity(intent);
                    Log.d("JsonErrorLogin", e.getMessage());
                    finish();
                }

            }
        }, SPLASH_DISPLAY_LENGTH);
    }
}
