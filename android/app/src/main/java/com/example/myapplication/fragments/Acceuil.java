package com.example.myapplication.fragments;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import com.example.myapplication.EnfantsParSalleActivity;
import com.example.myapplication.LoginActivity;
import com.example.myapplication.Main2Activity;
import com.example.myapplication.R;
import com.example.myapplication.entities.Classroom;
import com.example.myapplication.managers.ClassroomManager;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import java.util.ArrayList;


public class Acceuil extends Fragment {

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        //returning our layout file
        //change R.layout.yourlayoutfilename for each of your fragments
        ArrayList<Classroom> classrooms = ClassroomManager.getAll(getContext());
        View view = inflater.inflate(R.layout.fragment_acceuil, container, false);
        for (Classroom c : classrooms) {
            Button button = new Button(getContext());
            button.setText(c.getTitle().toLowerCase());
            button.setBackgroundResource(R.drawable.buttonshape);
            button.setTextAppearance(R.style.TextAppearance_AppCompat_Large);
            button.setTextSize(24);
            button.setTextColor(Color.parseColor("#019193"));
            button.setTypeface(Typeface.MONOSPACE);
            button.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    AlertDialog.Builder mybuilder = new AlertDialog.Builder(getContext());
                    View mavue = getLayoutInflater().inflate(R.layout.alert_dialog_info_salle, null);
                    mybuilder.setView(mavue);
                    final AlertDialog dialog = mybuilder.create();
                    dialog.show();
                    TextView tv_nom_salle = dialog.findViewById(R.id.tv_nom_classe);
                    TextView tv_nbPlace = dialog.findViewById(R.id.tv_seat);
                    TextView tv_telephone = dialog.findViewById(R.id.tv_phone);
                    Button btn_close = dialog.findViewById(R.id.btn_quitter);
                    tv_nom_salle.setText(c.getTitle());
                    tv_telephone.setText(c.getPhone());
                    tv_nbPlace.setText(String.valueOf(c.getSeat()));
                    btn_close.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            dialog.dismiss();
                        }
                    });
                }
            });
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT,
                    LinearLayout.LayoutParams.WRAP_CONTENT
            );
            params.setMargins(0, 30, 0, 0);
            button.setLayoutParams(params);
            button.setTextColor(Color.BLACK);
            LinearLayout ll_acceuil = view.findViewById(R.id.acceui_layout);
            ll_acceuil.addView(button);
        }
        return view;
    }
    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Acceuil");
    }
}