package com.example.studentcrud.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.studentcrud.entity.Student;
import com.example.studentcrud.service.StudentService;

@RestController
@RequestMapping("/students")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService studentService;

    // CREATE STUDENT
    @PostMapping
    public Student addStudent(
            @RequestBody Student student) {

        return studentService.saveStudent(student);
    }

    // GET ALL STUDENTS
    @GetMapping
    public List<Student> getStudents() {

        return studentService.getAllStudents();
    }

    // GET TOTAL STUDENTS
    @GetMapping("/count")
    public long getTotalStudents() {

        return studentService.getTotalStudents();
    }

    // GET STUDENT BY DATABASE ID
    @GetMapping("/{id:[0-9]+}")
    public Optional<Student> getStudentById(
            @PathVariable Long id) {

        return studentService.getStudentById(id);
    }

    // GET STUDENTS BY DEPARTMENT
    @GetMapping("/department/{department}")
    public List<Student> getByDepartment(
            @PathVariable String department) {

        return studentService
                .getStudentsByDepartment(department);
    }

    // UPDATE STUDENT
    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        return studentService
                .updateStudent(id, student);
    }

    // DELETE STUDENT
    @DeleteMapping("/{id}")
    public String deleteStudent(
            @PathVariable Long id) {

        return studentService.deleteStudent(id);
    }
}