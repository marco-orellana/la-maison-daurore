package com.example.myapplication;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;


public class ProfilEnfantActivity extends AppCompatActivity {

    TextView tv_birthday, tv_nom, tv_prenom, tv_sexe, tv_adress, tv_telephone;
    ImageView image_enfant;
    Button btn_suivi;
    Uri imageUri;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.profil_enfant);
        tv_nom = findViewById(R.id.tv_nom);
        tv_prenom = findViewById(R.id.tv_prenom);
        tv_birthday = findViewById(R.id.tv_birthday);
        tv_telephone = findViewById(R.id.tv_tepehone);
        tv_sexe = findViewById(R.id.tv_gender);
        tv_adress = findViewById(R.id.tv_address);
        image_enfant = findViewById(R.id.img_enfant);
//        btn_suivi = findViewById(R.id.btn_suivi);
        Intent i = getIntent();
        Bundle b = i.getBundleExtra("bundle");
        String fisrtName = b.getString("user_firstname");
        String lastName = b.getString("user_lastname");
        String birthday = b.getString("user_birthday");
        String address = b.getString("user_address");
        String sexe = b.getString("user_sex");
        String image = b.getString("user_image");
        tv_nom.setText(fisrtName);
        tv_prenom.setText(lastName);
        tv_birthday.setText(birthday.substring(0, birthday.indexOf("T")));
        tv_adress.setText(address);
        tv_sexe.setText(sexe);
        Glide.with(getApplicationContext()).load(image).into(image_enfant);
//        image_collaborateur.setImageResource();
//        image_enfant.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                selectImage();
//            }
//        });
//        btn_suivi.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Intent intent = new Intent(getApplicationContext(), SuiviQuotidienActivity.class);
//                startActivity(intent);
//            }
//        });
    }
//    private void selectImage() {
//        final CharSequence[] options = {"Take Photo", "Choose from Gallery", "Cancel"};
//        AlertDialog.Builder builder = new AlertDialog.Builder(ProfilEnfantActivity.this);
//        builder.setTitle("Add Photo!");
//        builder.setItems(options, new DialogInterface.OnClickListener() {
//            @Override
//            public void onClick(DialogInterface dialog, int item) {
//                if (options[item].equals("Take Photo")) {
//                    Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
//                    if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
//                        startActivityForResult(takePictureIntent, 1);
//                    }
//                } else if (options[item].equals("Choose from Gallery")) {
//                    Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.INTERNAL_CONTENT_URI);
//                    startActivityForResult(intent, 2);
//                } else if (options[item].equals("Cancel")) {
//                    dialog.dismiss();
//                }
//            }
//        });
//        builder.show();
//    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK) {
            if (requestCode == 1) {
                Bundle extras = data.getExtras();
                Bitmap imageBitmap = (Bitmap) extras.get("data");
                Glide.with(getApplicationContext()).load(imageBitmap).centerCrop().apply(RequestOptions.circleCropTransform()).into(image_enfant);
            } else if (requestCode == 2) {
                imageUri = data.getData();
                Glide.with(getApplicationContext()).load(imageUri).centerCrop().apply(RequestOptions.circleCropTransform()).into(image_enfant);
            }
        }
    }
    private void uploadphotoToserver() {
    }
}

