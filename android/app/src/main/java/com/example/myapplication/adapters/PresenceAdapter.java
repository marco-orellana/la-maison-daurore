package com.example.myapplication.adapters;

import android.app.Activity;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.myapplication.R;
import com.example.myapplication.entities.Classroom;
import com.example.myapplication.entities.Schedule;
import com.example.myapplication.entities.User;
import com.example.myapplication.helpers.DataBaseHelper;
import com.example.myapplication.managers.ClassroomManager;
import com.example.myapplication.managers.ScheduleManager;
import com.example.myapplication.managers.UserManager;
import com.example.myapplication.services.ConnectionBD;

import java.util.ArrayList;
import java.util.List;


public class PresenceAdapter extends ArrayAdapter<User> {

    int idLayout;
    ArrayList<Schedule> schedules;
    String date;
    public PresenceAdapter(Context context, int resource, List<User> objects) {
        super(context, resource, objects);
        idLayout = resource;
        schedules = new ArrayList<>();
    }
    public View getView(int position, View convertView, ViewGroup parent) {
        final User user = getItem(position);
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(idLayout, null);
            Button btn = convertView.findViewById(R.id.button_presence);
            TextView Fname = convertView.findViewById(R.id.textView1);
            TextView Lname = convertView.findViewById(R.id.textView2);
            RadioGroup radioGroup = convertView.findViewById(R.id.radioPresence);
            ImageView img = convertView.findViewById(R.id.imageView3);
            Fname.setText(user.getFirst_name());
            Lname.setText(user.getLast_name());
            Glide.with(getContext()).load(user.getImg_url()).into(img);
            int rbId = radioGroup.getCheckedRadioButtonId();
            RadioButton rb = convertView.findViewById(rbId);
            String rbValue = rb.getText().toString();
            boolean is_absent = false;
            if (rbValue.equals("Absent")) {
                is_absent = true;
            }
            Schedule schedule = ScheduleManager.getByIdUserAndDate(getContext(), user.get_id(), date);
            if (schedule != null) {
                schedule.setIs_absent(is_absent);
                schedules.add(schedule);
            }
            View finalConvertView = convertView;
            radioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
                @Override
                public void onCheckedChanged(RadioGroup group, int checkedId) {
                    RadioButton rb = finalConvertView.findViewById(checkedId);
                    String rbValue = rb.getText().toString();
                    boolean is_absent = false;
                    if (rbValue.equals("Absent")) {
                        is_absent = true;
                    }
                    Schedule schedule = ScheduleManager.getByIdUserAndDate(getContext(), user.get_id(), date);
                    if (schedule != null) {
                        schedule.setIs_absent(is_absent);
                        schedules.add(schedule);
                    }
                }
            });
//            cb.setChecked(isFilled);
//            cb.setOnClickListener(new View.OnClickListener() {
//                @Override
//                public void onClick(View v) {
//                    Schedule schedule = ScheduleManager.getByIdUserAndDate(getContext(), user.get_id(), date);
//                    if (schedule != null) {
//                        schedule.setIs_absent(cb.isChecked());
//                        schedules.add(schedule);
//                    }
//                }
//            });
        }
        return convertView;
    }
    public ArrayList<Schedule> getSchedules() {
        return schedules;
    }
    public void setDate(String date) {
        this.date = date;
    }
}