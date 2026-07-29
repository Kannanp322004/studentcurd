package com.example.studentcrud.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.studentcrud.entity.Student;
import com.example.studentcrud.repository.StudentRepository;



@Service
public class StudentService {


    @Autowired
    private StudentRepository studentRepository;



    // Add Student

    public Student saveStudent(Student student){

        return studentRepository.save(student);

    }



    // Get All Students

    public List<Student> getAllStudents(){

        return studentRepository.findAll();

    }



    // Get Student By ID

    public Optional<Student> getStudentById(Long id){

        return studentRepository.findById(id);

    }



    // Update Student

    public Student updateStudent(Long id, Student student){


        Student existingStudent = studentRepository
                .findById(id)
                .orElseThrow(() -> 
                new RuntimeException("Student not found"));



        existingStudent.setName(student.getName());

        existingStudent.setAge(student.getAge());

        existingStudent.setGender(student.getGender());

        existingStudent.setDepartment(student.getDepartment());



        return studentRepository.save(existingStudent);

    }



    // Delete Student

    public String deleteStudent(Long id){


        studentRepository.deleteById(id);


        return "Student Deleted Successfully";

    }


}