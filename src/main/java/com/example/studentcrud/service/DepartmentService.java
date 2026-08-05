package com.example.studentcrud.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.studentcrud.entity.Department;
import com.example.studentcrud.repository.DepartmentRepository;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

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

    // Update Department
    public Department updateDepartment(Long id, Department department) {

        Department existingDepartment = departmentRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Department Not Found"));

        existingDepartment.setDepartmentName(department.getDepartmentName());
        existingDepartment.setPassword(department.getPassword());

        return departmentRepository.save(existingDepartment);
    }

    // Delete Department
    public String deleteDepartment(Long id) {

        departmentRepository.deleteById(id);

        return "Department Deleted Successfully";
    }

}