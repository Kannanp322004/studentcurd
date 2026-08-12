package com.example.studentcrud.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {
                "student_id",
                "department"
            }
        )
    }
)
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long databaseId;

    private Long studentId;

    private String name;

    private String department;

    private int age;

    private String gender;

    // Default Constructor
    public Student() {
    }

    // Parameter Constructor
    public Student(
            Long databaseId,
            Long studentId,
            String name,
            String department,
            int age,
            String gender) {

        this.databaseId = databaseId;
        this.studentId = studentId;
        this.name = name;
        this.department = department;
        this.age = age;
        this.gender = gender;
    }

    // Database ID
    public Long getDatabaseId() {
        return databaseId;
    }

    public void setDatabaseId(Long databaseId) {
        this.databaseId = databaseId;
    }

    // Student ID
    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    // Name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Department
    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    // Age
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    // Gender
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}