//    package com.example.myapplication.adapters;
//
//    import android.content.Context;
//    import android.database.Cursor;
//    import android.provider.ContactsContract;
//    import android.view.LayoutInflater;
//    import android.view.View;
//    import android.view.ViewGroup;
//    import android.widget.CheckBox;
//    import android.widget.CursorAdapter;
//    import android.widget.TextView;
//
//    import com.example.myapplication.R;
//    import com.example.myapplication.entities.Schedule;
//    import com.example.myapplication.entities.User;
//    import com.example.myapplication.helpers.ScheduleHelper;
//    import com.example.myapplication.managers.ScheduleManager;
//    import com.example.myapplication.managers.UserManager;
//
//    import java.util.HashMap;
//
//    public class checkboxAdapter extends CursorAdapter {
//        private LayoutInflater inflater;
//        private HashMap<Integer, User> userHashMap;
//        private HashMap<Integer,Schedule>scheduleHashMap;
//        public checkboxAdapter(Context context,Cursor c) {
//            super(context,c);
//            inflater=LayoutInflater.from(context);
//            userHashMap=new HashMap<Integer, User>(c.getCount());
//            scheduleHashMap=new HashMap<Integer, Schedule>(c.getCount());
//        }
//
//        @Override
//        public View newView(Context context, Cursor cursor, ViewGroup parent) {
//            View v=inflater.inflate(R.layout.fragment_presence,parent,false);
//
//
//            return v;
//        }
//
//        @Override
//        public void bindView(View view, Context context, Cursor cursor) {
//
//
//            User user=new User();
//
//            TextView fname=(TextView)view.findViewById(R.id.textView1);
//            TextView lname=(TextView)view.findViewById(R.id.textView2);
//            String str_fname =cursor.getString(cursor.getColumnIndex(user.getFirst_name()));
//    String str_lname =cursor.getString(cursor.getColumnIndex(user.getLast_name()));
//    fname.setText(str_fname);
//    lname.setText(str_lname);
//
//    boolean isFilled=userHashMap.containsKey(cursor.getPosition());
//    cb.setChecked(isFilled);
//
//    cb.setOnClickListener(new View.OnClickListener() {
//        @Override
//        public void onClick(View v) {
//    if(cb.isChecked()){
//        userHashMap.put(cursor.getPosition(),new User(str_fname,str_lname));
//        scheduleHashMap.put(cursor.getPosition(),new Schedule(isFilled));
//    }
//        }
//    });
//
//
//        }
//
//        public HashMap<Integer, Schedule> getScheduleHashMap() {
//            return scheduleHashMap;
//        }
//
//        public HashMap<Integer, User> getUserHashMap() {
//            return userHashMap;
//        }
//
//
//
//    }
