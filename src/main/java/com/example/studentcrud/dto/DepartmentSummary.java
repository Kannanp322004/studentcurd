package com.example.studentcrud.dto;

public class DepartmentSummary {

    private Long id;
    private String departmentName;
    private long studentCount;

    public DepartmentSummary() {
    }

    public DepartmentSummary(Long id, String departmentName, long studentCount) {
        this.id = id;
        this.departmentName = departmentName;
        this.studentCount = studentCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public long getStudentCount() {
        return studentCount;
    }

    public void setStudentCount(long studentCount) {
        this.studentCount = studentCount;
    }
}