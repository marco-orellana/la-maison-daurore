package com.example.myapplication.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.CalendarView;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.myapplication.ProfilEnfantActivity;
import com.example.myapplication.R;
import com.example.myapplication.adapters.EnfantAdapter;
import com.example.myapplication.entities.Classroom;
import com.example.myapplication.entities.Role;
import com.example.myapplication.entities.Schedule;
import com.example.myapplication.entities.User;
import com.example.myapplication.managers.ClassroomManager;
import com.example.myapplication.managers.RoleManager;
import com.example.myapplication.managers.ScheduleManager;
import com.example.myapplication.managers.UserManager;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;


public class Historiques extends Fragment {

    Spinner spinner_salle;
    Spinner spinner_date;
    ListView listView;
    String dateString;
    EnfantAdapter enfantAdapter;
    ArrayList<User> users;
    ArrayList<Schedule> schedules;
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_historique, container, false);
//        today's date
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date = new Date(System.currentTimeMillis());
        dateString = formatter.format(date);
        //dates to display
        ArrayList<String> dateToDisplay = ScheduleManager.getUniquesDates(getContext(), dateString);
        // load childrens from bd
        ArrayList<Classroom> classrooms = ClassroomManager.getAll(getContext());
        users = new ArrayList<>();
        schedules = new ArrayList<>();
        listView = view.findViewById(R.id.list_enfant_par_salle);
        for (Classroom c : classrooms) {
            if (!dateToDisplay.isEmpty()) {
                ArrayList<Schedule> schedulesToInsert = ScheduleManager.getByDateAndIdClassroomandIsAbsent(getContext(), dateToDisplay.get(0), c.get_id());
                if (schedulesToInsert != null) {
                    schedules.addAll(schedulesToInsert);
                }
            }
            for (Schedule s : schedules) {
                User u = UserManager.getById(getContext(), s.getId_user());
                if (u != null) {
                    Log.d("Json", "name " + u.getFirst_name() + " date " + s.getDate() + " classroom " + s.getId_classroom());
                    users.add(u);
                }
            }
            enfantAdapter = new EnfantAdapter(getContext(), R.layout.collaborateur_listview, users);
            listView.setAdapter(enfantAdapter);
            //spinner date
            ArrayAdapter<String> arrayAdapterdate = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_item, dateToDisplay);
            arrayAdapterdate.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
            spinner_date = view.findViewById(R.id.spinner_date);
            spinner_date.setAdapter(arrayAdapterdate);
        }
        //spinner salle
        ArrayList<String> listClassroom = new ArrayList<>();
        listClassroom.add("Tous");
        for (Classroom c : classrooms) {
            listClassroom.add(c.getTitle());
        }
        spinner_salle = view.findViewById(R.id.spinner_salle);
        ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>(getContext(), android.R.layout.simple_spinner_item, listClassroom);
        arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner_salle.setAdapter(arrayAdapter);
        //spinner date event
        spinner_date.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if (!dateToDisplay.isEmpty()) {
                    String selectedDate = parent.getItemAtPosition(position).toString();
                    String selectedClassroom = spinner_salle.getSelectedItem().toString();
                    users = new ArrayList<>();
                    schedules = new ArrayList<>();
                    if (!selectedClassroom.equals("Tous")) {
                        Classroom classroom = ClassroomManager.getByTitle(getContext(), selectedClassroom);
                        schedules = ScheduleManager.getByDateAndIdClassroomandIsAbsent(getContext(), selectedDate, classroom.get_id());
                        if (schedules != null) {
                            for (Schedule s : schedules) {
                                User u = UserManager.getById(getContext(), s.getId_user());
                                if (u != null) {
                                    users.add(u);
                                }
                            }
                        }
                    } else {
                        ArrayList<Classroom> classrooms = ClassroomManager.getAll(getContext());
                        for (Classroom c : classrooms) {
                            ArrayList<Schedule> schedulesToInsert = ScheduleManager.getByDateAndIdClassroomandIsAbsent(getContext(), selectedDate, c.get_id());
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
                    enfantAdapter.clear();
                    enfantAdapter.addAll(users);
                    listView.setAdapter(enfantAdapter);
                    enfantAdapter.notifyDataSetChanged();
                }
            }
            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });
        //spinner salle event
        spinner_salle.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if (!dateToDisplay.isEmpty()) {
                    users = new ArrayList<>();
                    schedules = new ArrayList<>();
                    String classroomName = parent.getItemAtPosition(position).toString();
                    String selectedDate = spinner_date.getSelectedItem().toString();
                    if (!classroomName.equals("Tous")) {
                        Classroom classroom = ClassroomManager.getByTitle(getContext(), classroomName);
                        schedules = ScheduleManager.getByDateAndIdClassroomandIsAbsent(getContext(), selectedDate, classroom.get_id());
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
                            ArrayList<Schedule> schedulesToInsert = ScheduleManager.getByDateAndIdClassroomandIsAbsent(getContext(), selectedDate, c.get_id());
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
                    enfantAdapter.clear();
                    enfantAdapter.addAll(users);
                    listView.setAdapter(enfantAdapter);
                    enfantAdapter.notifyDataSetChanged();
                }
            }
            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });
        // listview onclick event
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // User u = UserManager.getById(getContext(), finalUsers.get(position).getId_collaborater());
                //  Log.d("Json", "onItemClick: " + u.getFirst_name());
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
                Intent intent = new Intent(getActivity(), ProfilEnfantActivity.class);
                intent.putExtra("bundle", bundle);
                startActivity(intent);
            }
        });
        return view;
    }
    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Historiques ");
    }
}
