package com.example.studentcrud.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.studentcrud.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByDepartment(String department);

    long countByDepartment(String department);

}