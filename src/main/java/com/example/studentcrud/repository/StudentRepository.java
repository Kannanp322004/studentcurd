package com.example.studentcrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.studentcrud.entity.Student;


public interface StudentRepository extends JpaRepository<Student, Long> {

}