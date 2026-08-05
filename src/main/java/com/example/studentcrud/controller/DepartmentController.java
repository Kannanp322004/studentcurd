package com.example.studentcrud.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.studentcrud.dto.DepartmentSummary;
import com.example.studentcrud.dto.LoginRequest;
import com.example.studentcrud.entity.Department;
import com.example.studentcrud.service.DepartmentService;

@RestController
@RequestMapping("/departments")
@CrossOrigin(origins = "*")
public class DepartmentController {


    @Autowired
    private DepartmentService departmentService;


    // Add Department
    @PostMapping
    public Department addDepartment(
            @RequestBody Department department) {

        return departmentService.addDepartment(department);
    }



    // Get All Departments
    @GetMapping
    public List<Department> getAllDepartments() {

        return departmentService.getAllDepartments();
    }



    // Get Department Summary
    @GetMapping("/summary")
    public List<DepartmentSummary> getDepartmentSummary() {

        return departmentService.getDepartmentSummary();

    }



    // Get Department By ID
    @GetMapping("/{id}")
    public Optional<Department> getDepartmentById(
            @PathVariable Long id) {

        return departmentService.getDepartmentById(id);

    }



    // Department Login
    @PostMapping("/login")
    public boolean login(
            @RequestBody LoginRequest loginRequest) {


        Department department =
                departmentService
                .getDepartmentByName(
                        loginRequest.getDepartmentName()
                );


        return department.getPassword()
                .equals(loginRequest.getPassword());

    }



    // Update Department
    @PutMapping("/{id}")
    public Department updateDepartment(
            @PathVariable Long id,
            @RequestBody Department department) {


        return departmentService.updateDepartment(id, department);

    }



    // Delete Department
    @DeleteMapping("/{id}")
    public String deleteDepartment(
            @PathVariable Long id) {


        return departmentService.deleteDepartment(id);

    }

}