package com.example.studentcrud.controller;


import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import com.example.studentcrud.entity.Student;
import com.example.studentcrud.service.StudentService;



@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*")
public class StudentController {


    @Autowired
    private StudentService studentService;



    // POST

    @PostMapping
    public Student createStudent(
            @RequestBody Student student){

        return studentService.saveStudent(student);
    }




    // GET ALL

    @GetMapping
    public List<Student> getAllStudents(){

        return studentService.getAllStudents();
    }





    // GET BY ID

    @GetMapping("/{id}")
    public Optional<Student> getStudentById(
            @PathVariable Long id){

        return studentService.getStudentById(id);
    }






    // UPDATE

    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student){

        return studentService.updateStudent(id, student);
    }






    // DELETE

    @DeleteMapping("/{id}")
    public String deleteStudent(
            @PathVariable Long id){

        return studentService.deleteStudent(id);
    }

}