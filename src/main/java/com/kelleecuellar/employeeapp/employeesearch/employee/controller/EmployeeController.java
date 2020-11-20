package com.kelleecuellar.employeeapp.employeesearch.employee.controller;

import com.kelleecuellar.employeeapp.employeesearch.employee.service.EmployeeService;
import com.kelleecuellar.employeeapp.employeesearch.employee.model.Employee;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

//import java.sql.Date;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // Create
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeService.createEmployee(employee);
    }

    // Read by Id
    @GetMapping("/employees/{id}")
    public Optional<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    // Read All or By Keyword
//    @GetMapping("/employees")
//    public List<Employee> getAllEmployees(@RequestParam(required = false) String keyword) {
//        if (keyword == null) {
//            return employeeService.getEmployees();
//        } else {
//            return employeeService.getEmployeesByName(keyword);
//        }
//    }

    // Read All By Name, Start and End Date
    //@GetMapping("/employees/{name}")
    @GetMapping("/employees")
    public List<Employee> getEmployeeByName(@RequestParam(required = false) String keyword, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date start, @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date end) {
        if (keyword == null) {
            return employeeService.getEmployees();
        } else {
            return employeeService.getEmployeesByNameStartEndDate(keyword, start, end);
        }
    }

    // Update
    @PutMapping("/employees/{id}")
    public Employee updateEmployee(@PathVariable Long id, @RequestBody Employee employee) {
        return employeeService.updateEmployee(employee);
    }

    // Delete
    @DeleteMapping("employees/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeService.deleteProduct(id);
    }
}
