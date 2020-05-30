package com.example.myapplication.fragments;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.icu.text.Transliterator;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.myapplication.R;
import com.example.myapplication.adapters.PresenceAdapter;
//import com.example.myapplication.adapters.checkboxAdapter;
import com.example.myapplication.entities.Classroom;
import com.example.myapplication.entities.Login;
import com.example.myapplication.entities.Role;
import com.example.myapplication.entities.Schedule;
import com.example.myapplication.entities.User;
import com.example.myapplication.helpers.DataBaseHelper;
import com.example.myapplication.helpers.ScheduleHelper;
import com.example.myapplication.managers.ClassroomManager;
import com.example.myapplication.managers.LoginManager;
import com.example.myapplication.managers.RoleManager;
import com.example.myapplication.managers.ScheduleManager;
import com.example.myapplication.managers.UserManager;
import com.example.myapplication.services.ConnectionBD;
import com.example.myapplication.services.Preferences;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;


public class Presence extends Fragment {

    ListView listView;
    CheckBox checkBox;
    Button saveButton;
    String dateString;
    ArrayList<User> users;
    ArrayList<Schedule> schedules;
    PresenceAdapter presenceAdapter;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_presence, container, false);
        //today's date
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date(System.currentTimeMillis());
        dateString = formatter.format(date);

        //load schedules and users
        listView = view.findViewById(R.id.list_presence);
        users = new ArrayList<>();
        schedules = new ArrayList<>();
        schedules = ScheduleManager.getByDate(getContext(), dateString);
        if (schedules != null) {
            for (Schedule s : schedules) {
                User u = UserManager.getById(getContext(), s.getId_user());
                users.add(u);
            }
            presenceAdapter = new PresenceAdapter(getContext(), R.layout.fragment_presence_row, users);
            presenceAdapter.setDate(dateString);
            listView.setAdapter(presenceAdapter);
            presenceAdapter.notifyDataSetChanged();
        }
        //spinner classroom set up
        Spinner spinner = view.findViewById(R.id.spinner_presence);
        ArrayList<Classroom> classrooms = ClassroomManager.getAll(getContext());
        ArrayList<String> listClassroom = new ArrayList<>();
        listClassroom.add("Tous");
        for (Classroom c : classrooms) {
            listClassroom.add(c.getTitle());
        }
        ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_item, listClassroom);
        arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(arrayAdapter);
        //Save btn event
        saveButton = view.findViewById(R.id.button_presence);
        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ArrayList<Schedule> schedulesToPut = presenceAdapter.getSchedules();
                for (Schedule s : schedulesToPut) {
                    ScheduleManager.putToAPI(getContext(), s, Preferences.getToken(getContext()));
                    Log.d("Json", "onClick: "+ s.getIs_absent());
                }
                Toast.makeText(getContext(), "Done!", Toast.LENGTH_SHORT).show();

            }
        });
        //spinner classroom event
        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                users = new ArrayList<>();
                schedules = new ArrayList<>();
                String classroomName = parent.getItemAtPosition(position).toString();
                if (!classroomName.equals("Tous")) {
                    Classroom classroom = ClassroomManager.getByTitle(getContext(), classroomName);
                    schedules = ScheduleManager.getByDateAndIdClassroom(getContext(), dateString, classroom.get_id());
                    if (schedules != null) {
                        for (Schedule s : schedules) {
                            String userId = s.getId_user();
                            User u = UserManager.getById(getContext(), s.getId_user());
                            if (u != null) {
                                users.add(u);
                            }
                        }
                    }
                } else {
                    ArrayList<Classroom> classrooms = ClassroomManager.getAll(getContext());
                    for (Classroom c : classrooms) {
                        ArrayList<Schedule> schedulesToInsert = ScheduleManager.getByDateAndIdClassroom(getContext(), dateString, c.get_id());
                        if (schedulesToInsert != null) {
                            schedules.addAll(schedulesToInsert);
                        }
                    }
                    if (schedules != null) {
                        for (Schedule s : schedules) {
                            User u = UserManager.getById(getContext(), s.getId_user());
                            if (u != null) {
                                users.add(u);
                            }
                        }
                    }
                }
                presenceAdapter.clear();
                presenceAdapter.addAll(users);
                listView.setAdapter(presenceAdapter);
                presenceAdapter.notifyDataSetChanged();
            }
            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });
        return view;
    }
    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Presence");
    }
}

