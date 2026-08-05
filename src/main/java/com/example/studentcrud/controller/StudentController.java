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
@CrossOrigin(origins = "*")
public class StudentController {


    @Autowired
    private StudentService studentService;



    // Add Student
    @PostMapping
    public Student createStudent(
            @RequestBody Student student) {

        return studentService.saveStudent(student);

    }



    // Get All Students
    @GetMapping
    public List<Student> getAllStudents() {

        return studentService.getAllStudents();

    }



    // Get Students By Department
    @GetMapping("/department/{departmentName}")
    public List<Student> getStudentsByDepartment(
            @PathVariable String departmentName) {


        return studentService
                .getStudentsByDepartment(departmentName);

    }



    // Get Student By ID
    @GetMapping("/{id}")
    public Optional<Student> getStudentById(
            @PathVariable Long id) {


        return studentService.getStudentById(id);

    }



    // Update Student
    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {


        return studentService.updateStudent(id, student);

    }



    // Delete Student
    @DeleteMapping("/{id}")
    public String deleteStudent(
            @PathVariable Long id) {


        return studentService.deleteStudent(id);

    }

}