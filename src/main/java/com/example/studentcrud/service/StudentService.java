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


    // ==========================
    // CREATE STUDENT
    // ==========================

    public Student saveStudent(Student student) {

        Student lastStudent =
                studentRepository
                        .findTopByDepartmentOrderByStudentIdDesc(
                                student.getDepartment());

        Long nextStudentId;

        if (lastStudent == null) {

            nextStudentId = 1L;

        } else {

            nextStudentId =
                    lastStudent.getStudentId() + 1;
        }

        student.setStudentId(nextStudentId);

        return studentRepository.save(student);
    }


    // ==========================
    // READ ALL
    // ==========================

    public List<Student> getAllStudents() {

        return studentRepository.findAll();
    }


    // ==========================
    // TOTAL STUDENTS
    // ==========================

    public long getTotalStudents() {

        return studentRepository.count();
    }


    // ==========================
    // GET BY DATABASE ID
    // ==========================

    public Optional<Student> getStudentById(Long id) {

        return studentRepository.findById(id);
    }


    // ==========================
    // GET BY DEPARTMENT
    // ==========================

    public List<Student> getStudentsByDepartment(
            String department) {

        return studentRepository
                .findByDepartment(department);
    }


    // ==========================
    // UPDATE STUDENT
    // ==========================

    public Student updateStudent(
            Long databaseId,
            Student student) {

        Student existingStudent =
                studentRepository
                        .findById(databaseId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Student Not Found")
                        );

        // Keep original department-wise student ID
        existingStudent.setStudentId(
                existingStudent.getStudentId()
        );

        existingStudent.setName(
                student.getName()
        );

        existingStudent.setAge(
                student.getAge()
        );

        existingStudent.setGender(
                student.getGender()
        );

        existingStudent.setDepartment(
                student.getDepartment()
        );

        return studentRepository.save(
                existingStudent
        );
    }


    // ==========================
    // DELETE STUDENT
    // ==========================

    public String deleteStudent(Long id) {

        studentRepository.deleteById(id);

        return "Student Deleted Successfully";
    }
}