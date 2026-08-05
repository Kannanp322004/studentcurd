package com.example.studentcrud.dto;


public class LoginRequest {


    private String departmentName;

    private String password;


    public LoginRequest() {

    }


    public LoginRequest(String departmentName, String password) {

        this.departmentName = departmentName;

        this.password = password;

    }


    public String getDepartmentName() {

        return departmentName;

    }


    public void setDepartmentName(String departmentName) {

        this.departmentName = departmentName;

    }


    public String getPassword() {

        return password;

    }


    public void setPassword(String password) {

        this.password = password;

    }

}