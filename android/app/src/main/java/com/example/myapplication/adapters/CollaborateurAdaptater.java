package com.example.myapplication.adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bumptech.glide.Glide;
import com.example.myapplication.R;
import com.example.myapplication.entities.User;

import java.util.List;


public class CollaborateurAdaptater extends ArrayAdapter<User> {

    int idLayout;
    public CollaborateurAdaptater(@NonNull Context context, int resource, @NonNull List<User> objects) {
        super(context, resource, objects);
        idLayout = resource;
    }
    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        final User user = getItem(position);
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(idLayout, null);
            ImageView img = (ImageView) convertView.findViewById(R.id.img_listView);
            Glide.with(getContext()).load(user.getImg_url()).into(img);
            TextView tv_nom = (TextView) convertView.findViewById(R.id.lv_nom);
            TextView tv_prenom = (TextView) convertView.findViewById(R.id.lv_prenom);
            tv_nom.setText(user.getLast_name());
            tv_prenom.setText(user.getFirst_name());
        }
        return convertView;
    }
}
