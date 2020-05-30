package com.example.myapplication.entities;

import java.util.ArrayList;


public class Evaluation {

    String _id;
    String id_schedule;
    ArrayList<EvaluationClosedQuestions> evaluations;
    ArrayList<EvaluationOpenQuestions> questions;
    public Evaluation() {
    }
    public Evaluation(String id_schedule) {
        this.id_schedule = id_schedule;
    }
    public Evaluation(String _id, String id_schedule) {
        this._id = _id;
        this.id_schedule = id_schedule;
    }
    public Evaluation(String _id, String id_schedule, ArrayList<EvaluationClosedQuestions> evaluations, ArrayList<EvaluationOpenQuestions> questions) {
        this._id = _id;
        this.id_schedule = id_schedule;
        this.evaluations = evaluations;
        this.questions = questions;
    }
    public String get_id() {
        return _id;
    }
    public void set_id(String _id) {
        this._id = _id;
    }
    public String getId_schedule() {
        return id_schedule;
    }
    public void setId_schedule(String id_schedule) {
        this.id_schedule = id_schedule;
    }
    public ArrayList<EvaluationClosedQuestions> getEvaluations() {
        return evaluations;
    }
    public void setEvaluations(ArrayList<EvaluationClosedQuestions> evaluations) {
        this.evaluations = evaluations;
    }
    public ArrayList<EvaluationOpenQuestions> getQuestions() {
        return questions;
    }
    public void setQuestions(ArrayList<EvaluationOpenQuestions> questions) {
        this.questions = questions;
    }
}
