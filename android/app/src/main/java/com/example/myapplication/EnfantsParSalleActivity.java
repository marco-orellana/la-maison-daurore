package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;

import com.example.myapplication.adapters.EnfantAdapter;
import com.example.myapplication.entities.User;
import com.example.myapplication.managers.UserManager;

import java.util.ArrayList;


public class EnfantsParSalleActivity extends AppCompatActivity {

    ListView listView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_enfants_par_salle);
        EnfantAdapter enfantAdapter;
        Intent intent = getIntent();
        String id_classroom =  intent.getStringExtra("id_classroom");
        ArrayList<User> users = UserManager.getByIdClassroom(this,id_classroom);
        listView = findViewById(R.id.list_enfant_par_salle);
        enfantAdapter = new EnfantAdapter(this, R.layout.collaborateur_listview, users);
        listView.setAdapter(enfantAdapter);
        enfantAdapter.notifyDataSetChanged();
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                String first_name = users.get(position).getFirst_name();
                String last_name = users.get(position).getLast_name();
                String birthday = users.get(position).getBirthday();
                String sexe = users.get(position).getSex();
                String address = users.get(position).getAddress();
                String image = users.get(position).getImg_url();
                Bundle bundle = new Bundle();
                bundle.putString("user_firstname", first_name);
                bundle.putString("user_lastname", last_name);
                bundle.putString("user_birthday", birthday);
                bundle.putString("user_sex", sexe);
                bundle.putString("user_address", address);
                bundle.putString("user_image", image);
                Intent intent = new Intent(EnfantsParSalleActivity.this, ProfilCollabActivity.class);
                intent.putExtra("bundle", bundle);
                startActivity(intent);
            }
        });
    }
}

