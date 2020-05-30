package com.example.myapplication;

import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.TypedValue;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RatingBar;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;


public class SuiviQuotidienActivity extends AppCompatActivity {

    private ImageView img_smile1;
    private ImageView img_smile2;
    private ImageView img_smile3;
    private ImageView img_smile4;
    private ImageView img_smile5;
    private ImageView image_neutral1;
    private ImageView image_neutral2;
    private ImageView image_neutral3;
    private ImageView image_neutral4;
    private ImageView image_neutral5;
    private ImageView image_sad1;
    private ImageView image_sad2;
    private ImageView image_sad3;
    private ImageView image_sad4;
    private ImageView image_sad5;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_suivi_quotidien);
        img_smile1 = findViewById(R.id.image_smile1);
        img_smile2 = findViewById(R.id.image_smile2);
        img_smile3 = findViewById(R.id.image_smile3);
        img_smile4 = findViewById(R.id.image_smile4);
        img_smile5 = findViewById(R.id.image_smile5);
        image_neutral1 = findViewById(R.id.image_neutral1);
        image_neutral2 = findViewById(R.id.image_neutral2);
        image_neutral3 = findViewById(R.id.image_neutral3);
        image_neutral4 = findViewById(R.id.image_neutral4);
        image_neutral5 = findViewById(R.id.image_neutral5);
        image_sad1 = findViewById(R.id.image_sad1);
        image_sad2 = findViewById(R.id.image_sad2);
        image_sad3 = findViewById(R.id.image_sad3);
        image_sad4 = findViewById(R.id.image_sad4);
        image_sad5 = findViewById(R.id.image_sad5);
//        parcourir chaque cellule et et mettre l'image a setvisible quand on clique dans la cellule
        LinearLayout linearLayout1 = findViewById(R.id.layoutImage1);
        linearLayout1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(img_smile1);
            }
        });
        LinearLayout linearLayout11 = findViewById(R.id.layoutImage11);
        linearLayout11.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(img_smile2);
            }
        });
        LinearLayout linearLayout21 = findViewById(R.id.layoutImage21);
        linearLayout21.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(img_smile3);
            }
        });
        LinearLayout linearLayout31 = findViewById(R.id.layoutImage31);
        linearLayout31.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(img_smile4);
            }
        });
        LinearLayout linearLayout41 = findViewById(R.id.layoutImage41);
        linearLayout41.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(img_smile5);
            }
        });
        LinearLayout linearLayout2 = findViewById(R.id.layoutImage2);
        linearLayout2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(image_neutral1);
            }
        });
        LinearLayout linearLayout12 = findViewById(R.id.layoutImage12);
        linearLayout12.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(image_neutral2);
            }
        });
        LinearLayout linearLayout22 = findViewById(R.id.layoutImage22);
        linearLayout22.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(image_neutral3);
            }
        });
        LinearLayout linearLayout32 = findViewById(R.id.layoutImage32);
        linearLayout32.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(image_neutral4);
            }
        });
        LinearLayout linearLayout42 = findViewById(R.id.layoutImage42);
        linearLayout42.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(image_neutral5);
            }
        });
        LinearLayout linearLayout3 = findViewById(R.id.layoutImage3);
        linearLayout3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(image_sad1);
            }
        });
        LinearLayout linearLayout13 = findViewById(R.id.layoutImage13);
        linearLayout13.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(image_sad2);
            }
        });
        LinearLayout linearLayout23 = findViewById(R.id.layoutImage23);
        linearLayout23.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(image_sad3);
            }
        });
        LinearLayout linearLayout33 = findViewById(R.id.layoutImage33);
        linearLayout33.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(image_sad4);
            }
        });
        LinearLayout linearLayout43 = findViewById(R.id.layoutImage43);
        linearLayout43.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showImage(image_sad5);
            }
        });
        img_smile1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ImageView imageView = (ImageView) view;
                showImage(imageView);
            }
        });
        image_neutral1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ImageView imageView = (ImageView) view;
                showImage(imageView);
            }
        });
        image_sad1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ImageView imageView = (ImageView) view;
                showImage(imageView);
            }
        });
    }
    //function that hide and show image
    private void showImage(ImageView imageView) {
        if (imageView.getVisibility() == View.INVISIBLE) {
            imageView.setVisibility(View.VISIBLE);
        } else {
            imageView.setVisibility(View.INVISIBLE);
        }
    }
}


