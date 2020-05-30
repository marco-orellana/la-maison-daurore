package com.example.myapplication.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.myapplication.ProfilCollabActivity;
import com.example.myapplication.R;
import com.example.myapplication.adapters.CollaborateurAdaptater;
import com.example.myapplication.entities.Role;
import com.example.myapplication.entities.User;
import com.example.myapplication.managers.RoleManager;
import com.example.myapplication.managers.UserManager;
import com.example.myapplication.services.ConnectionBD;

import java.util.ArrayList;


public class ListesCollaborateurs extends Fragment {

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        CollaborateurAdaptater collaborateurAdaptater;
        ArrayList<User> users = new ArrayList<>();
        ArrayList<Role> roles = RoleManager.getAll(getContext());
        for (Role r : roles) {
            if (r.getTitle().equals("collaborater")) {
                users = UserManager.getByRole(getContext(), r.get_id());
            }
        }
        if (users != null) {
            Log.d("Tag", "successs");
        }
        View view = inflater.inflate(R.layout.fragment_listes_collaborateurs, container, false);
        ListView listView = (ListView) view.findViewById(R.id.list_collab);
        collaborateurAdaptater = new CollaborateurAdaptater(getContext(), R.layout.collaborateur_listview, users);
        listView.setAdapter(collaborateurAdaptater);
        collaborateurAdaptater.notifyDataSetChanged();
        ArrayList<User> finalUsers = users;
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                String id_user = finalUsers.get(position).get_id();
                String first_name = finalUsers.get(position).getFirst_name();
                String last_name = finalUsers.get(position).getLast_name();
                String birthday = finalUsers.get(position).getBirthday();
                String sexe = finalUsers.get(position).getSex();
                String address = finalUsers.get(position).getAddress();
                String image = finalUsers.get(position).getImg_url();
                Bundle bundle = new Bundle();
                bundle.putString("id_user", id_user);
                bundle.putString("user_firstname", first_name);
                bundle.putString("user_lastname", last_name);
                bundle.putString("user_birthday", birthday);
                bundle.putString("user_sex", sexe);
                bundle.putString("user_address", address);
                bundle.putString("user_image", image);
                Intent intent = new Intent(getActivity(), ProfilCollabActivity.class);
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
        getActivity().setTitle("Listes des collaborateurs  ");
    }
}
