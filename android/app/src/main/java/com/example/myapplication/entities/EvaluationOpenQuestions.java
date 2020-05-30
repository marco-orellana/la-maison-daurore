package com.example.myapplication.entities;

public class EvaluationOpenQuestions {

    private String _id;
    private String id_evaluation;
    private String question;
    private String response;
    public EvaluationOpenQuestions() {
    }
    public EvaluationOpenQuestions(String _id, String id_evaluation, String question, String response) {
        this._id = _id;
        this.id_evaluation = id_evaluation;
        this.question = question;
        this.response = response;
    }
    public String get_id() {
        return _id;
    }
    public void set_id(String _id) {
        this._id = _id;
    }
    public String getId_evaluation() {
        return id_evaluation;
    }
    public void setId_evaluation(String id_evaluation) {
        this.id_evaluation = id_evaluation;
    }
    public String getQuestion() {
        return question;
    }
    public void setQuestion(String question) {
        this.question = question;
    }
    public String getResponse() {
        return response;
    }
    public void setResponse(String response) {
        this.response = response;
    }
}
