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



    // CREATE
    public Student saveStudent(Student student){

        return studentRepository.save(student);

    }



    // READ ALL
    public List<Student> getAllStudents(){

        return studentRepository.findAll();

    }

    // Get Total Students
    public long getTotalStudents() {

        return studentRepository.count();

    }


    // READ BY ID
    public Optional<Student> getStudentById(Long id){

        return studentRepository.findById(id);

    }



    // READ BY DEPARTMENT
    public List<Student> getStudentsByDepartment(String department){

        return studentRepository.findByDepartment(department);

    }




    // UPDATE
    public Student updateStudent(Long id, Student student){


        Student existingStudent =
                studentRepository.findById(id)
                .orElseThrow(
                () -> new RuntimeException("Student Not Found")
                );


        existingStudent.setName(student.getName());

        existingStudent.setDepartment(student.getDepartment());

        existingStudent.setAge(student.getAge());

        existingStudent.setGender(student.getGender());


        return studentRepository.save(existingStudent);

    }




    // DELETE
    public String deleteStudent(Long id){

        studentRepository.deleteById(id);

        return "Student Deleted Successfully";

    }


}