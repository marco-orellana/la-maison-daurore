package com.example.myapplication.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.myapplication.LoginActivity;
import com.example.myapplication.R;
import com.example.myapplication.entities.User;
import com.example.myapplication.managers.LoginManager;
import com.example.myapplication.services.Preferences;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;


public class Logout extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        //returning our layout file
        //change R.layout.yourlayoutfilename for each of your fragments
        View view = inflater.inflate(R.layout.fragment_logout, container, false);
//        LoginManager.logout();
//        Preferences.clearUserFromPreferences(getContext());
//        Intent intent = new Intent(getContext(), LoginActivity.class);
//        intent.putExtra("logout", "You have been logged out !");
//        startActivity(intent);
//        getActivity().finish();
        return view;
    }
    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        //you can set the title for your toolbar here for different fragments different titles
        getActivity().setTitle("Logout");
    }
}
