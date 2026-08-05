package com.example.studentcrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.studentcrud.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

}