package com.example.myapplication;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.Preference;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.myapplication.fragments.Acceuil;
import com.example.myapplication.fragments.Historiques;
import com.example.myapplication.fragments.ListesCollaborateurs;
import com.example.myapplication.fragments.ListesEnfants;
import com.example.myapplication.fragments.Logout;
import com.example.myapplication.fragments.Presence;
import com.example.myapplication.managers.LoginManager;
import com.example.myapplication.managers.ScheduleManager;
import com.example.myapplication.services.Preferences;
import com.google.android.material.navigation.NavigationView;

import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import java.util.ArrayList;

import static java.security.AccessController.getContext;


public class Main2Activity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();
        NavigationView navigationView = findViewById(R.id.nav_view);
        View menu = navigationView.getHeaderView(0);
        TextView tv_name = menu.findViewById(R.id.name_drawer);
        tv_name.setText(Preferences.getUserFirstName(this) + " " + Preferences.getUserLastName(this));
        TextView tv_email = menu.findViewById(R.id.email_drawer);
        tv_email.setText(Preferences.getUserEmail(this));
        navigationView.setNavigationItemSelectedListener(this);
        //Add this line of code here to open the default selected menu on app start time.
        ShowFragment(R.id.nav_acceuil);
    }
    @Override
    public void onBackPressed() {
        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }
    //    @Override
//    public boolean onCreateOptionsMenu(Menu menu) {
//        // Inflate the menu; this adds items to the action bar if it is present.
//        getMenuInflater().inflate(R.menu.main2, menu);
//        return true;
//    }
//    @Override
//    public boolean onOptionsItemSelected(MenuItem item) {
//        // Handle action bar item clicks here. The action bar will
//        // automatically handle clicks on the Home/Up button, so long
//        // as you specify a parent activity in AndroidManifest.xml.
//        int id = item.getItemId();
//        //noinspection SimplifiableIfStatement
//        if (id == R.id.action_settings) {
//            return true;
//        }
//        return super.onOptionsItemSelected(item);
//    }
    private void ShowFragment(int itemId) {
        Fragment fragment = null;
        switch (itemId) {
            case R.id.nav_deconnexion:
                LoginManager.logout();
                Preferences.clearUserFromPreferences(this);
                Intent intent = new Intent(this, LoginActivity.class);
                intent.putExtra("logout", "You have been logged out !");
                startActivity(intent);
                this.finish();
                break;
            case R.id.nav_collaborateur:
                fragment = new ListesCollaborateurs();
                break;
            case R.id.nav_acceuil:
                fragment = new Acceuil();
                break;
            case R.id.nav_historique:
                fragment = new Historiques();
                break;
            case R.id.nav_presence:
                fragment = new Presence();
                break;
            case R.id.nav_enfant:
                fragment = new ListesEnfants();
                break;
        }
        if (fragment != null) {
            FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
            fragmentTransaction.replace(R.id.frame_layout, fragment).commit();
        }
        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
    }
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        //Calling the ShowFragment() method here to show the our created menu as default menus.
        ShowFragment(item.getItemId());
        return true;
    }
}
