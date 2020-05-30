package com.example.myapplication;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;

import net.gotev.uploadservice.MultipartUploadRequest;
import net.gotev.uploadservice.UploadNotificationConfig;

import java.io.IOException;
import java.util.UUID;


public class ProfilCollabActivity extends AppCompatActivity {

    TextView tv_birthday, tv_nom, tv_prenom, tv_sexe, tv_adress, tv_telephone;
    ImageView image_collaborateur;
    Uri filePath;
    Bitmap bitmap;
    private int TAKE_PICTURE_FROM_CAMERA = 1;
    private int PICK_IMAGE_REQUEST = 2;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.profil_collaborateur);
        tv_nom = findViewById(R.id.tv_nom);
        tv_prenom = findViewById(R.id.tv_prenom);
        tv_birthday = findViewById(R.id.tv_birthday);
        tv_telephone = findViewById(R.id.tv_tepehone);
        tv_sexe = findViewById(R.id.tv_gender);
        tv_adress = findViewById(R.id.tv_address);
        image_collaborateur = findViewById(R.id.img_collab);
//        Button upload_image = findViewById(R.id.upload_img);
        Intent i = getIntent();
        Bundle b = i.getBundleExtra("bundle");
        String id_user = b.getString("id_user");
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
        Glide.with(getApplicationContext()).load(image).into(image_collaborateur);
//        image_collaborateur.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                selectImage();
//            }
//        });
//        upload_image.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                // uploadMultipart();
//            }
//        });
//    }
//    private void selectImage() {
//        final CharSequence[] options = {"Take Photo", "Choose from Gallery", "Cancel"};
//        AlertDialog.Builder builder = new AlertDialog.Builder(ProfilCollabActivity.this);
//        builder.setTitle("Add Photo!");
//        builder.setItems(options, new DialogInterface.OnClickListener() {
//            @Override
//            public void onClick(DialogInterface dialog, int item) {
//                if (options[item].equals("Take Photo")) {
//                    Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
//                    if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
//                        startActivityForResult(takePictureIntent, TAKE_PICTURE_FROM_CAMERA);
//                    }
//                } else if (options[item].equals("Choose from Gallery")) {
//                    showFileChooser();
//                } else if (options[item].equals("Cancel")) {
//                    dialog.dismiss();
//                }
//            }
//        });
//        builder.show();
//    }
//    @Override
//    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
//        super.onActivityResult(requestCode, resultCode, data);
//        if (resultCode == RESULT_OK) {
//            if (requestCode == TAKE_PICTURE_FROM_CAMERA) {
//                filePath = data.getData();
//                try {
//                    bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), filePath);
//                    Glide.with(getApplicationContext()).load(bitmap).centerCrop().apply(RequestOptions.circleCropTransform()).into(image_collaborateur);
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            } else if (requestCode == PICK_IMAGE_REQUEST) {
//                filePath = data.getData();
//                try {
//                    bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), filePath);
//                    Glide.with(getApplicationContext()).load(bitmap).centerCrop().apply(RequestOptions.circleCropTransform()).into(image_collaborateur);
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//        }
//    }
        /* get image from path file*/
    /*private String getPath(Uri uri) {
        Cursor cursor = getContentResolver().query(uri, null, null, null, null);
        cursor.moveToFirst();
        String document_id = cursor.getString(0);
        document_id = document_id.substring(document_id.lastIndexOf(":") + 1);
        cursor.close();
        cursor = getContentResolver().query(
                android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI,
                null, MediaStore.Images.Media._ID + " = ? ", new String[]{document_id}, null);
        cursor.moveToFirst();
        String path = cursor.getString(cursor.getColumnIndex(MediaStore.Images.Media.DATA));
        cursor.close();
        return path;
    }*/
//    private void showFileChooser() {
//        Intent intent = new Intent();
//        intent.setType("image/*");
//        intent.setAction(Intent.ACTION_GET_CONTENT);
//        startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_IMAGE_REQUEST);
//    }
   /* public void uploadMultipart() {
        //getting the actual path of the image
        String path = getPath(filePath);
        //Uploading code
        try {
            String uploadId = UUID.randomUUID().toString();
            //Creating a multi part request
            new MultipartUploadRequest(this, uploadId, UPLOAD_URL)
                    .addFileToUpload(path, "image") //Adding file
                    .setNotificationConfig(new UploadNotificationConfig())
                    .setMaxRetries(2)
                    .startUpload(); //Starting the upload
        } catch (Exception exc) {
            Toast.makeText(this, exc.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }*/
    }
}

