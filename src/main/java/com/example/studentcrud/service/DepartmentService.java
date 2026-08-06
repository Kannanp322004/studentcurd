package com.example.studentcrud.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.studentcrud.dto.DepartmentSummary;
import com.example.studentcrud.entity.Department;
import com.example.studentcrud.repository.DepartmentRepository;
import com.example.studentcrud.repository.StudentRepository;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final StudentRepository studentRepository;

    public DepartmentService(DepartmentRepository departmentRepository,
                             StudentRepository studentRepository) {

        this.departmentRepository = departmentRepository;
        this.studentRepository = studentRepository;
    }

    // Add Department
    public Department addDepartment(Department department) {

        return departmentRepository.save(department);

    }

    // Get All Departments
    public List<Department> getAllDepartments() {

        return departmentRepository.findAll();

    }

    // Get Department By ID
    public Optional<Department> getDepartmentById(Long id) {

        return departmentRepository.findById(id);

    }

    // Get Department By Name
    public Department getDepartmentByName(String departmentName) {

        return departmentRepository.findByDepartmentName(departmentName);

    }

    // Update Department
    public Department updateDepartment(Long id, Department department) {

        Department existingDepartment =
                departmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Department Not Found"));

        existingDepartment.setDepartmentName(
                department.getDepartmentName());

        existingDepartment.setPassword(
                department.getPassword());

        return departmentRepository.save(existingDepartment);

    }

    // Delete Department
    public String deleteDepartment(Long id) {

        departmentRepository.deleteById(id);

        return "Department Deleted Successfully";

    }

    // Department Summary
    public List<DepartmentSummary> getDepartmentSummary() {

        List<Department> departments =
                departmentRepository.findAll();

        List<DepartmentSummary> result =
                new ArrayList<>();

        for (Department d : departments) {

            long count =
                    studentRepository.countByDepartment(
                            d.getDepartmentName());

            result.add(
                    new DepartmentSummary(
                            d.getId(),
                            d.getDepartmentName(),
                            count));

        }

        return result;

    }

}