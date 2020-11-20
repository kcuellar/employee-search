package com.kelleecuellar.employeeapp.employeesearch.employee.service;

import com.kelleecuellar.employeeapp.employeesearch.employee.model.Employee;

//import java.sql.Date;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EmployeeService {

    // Create
    Employee createEmployee(Employee employee);

    // Read by Id
    Optional<Employee> getEmployeeById(Long id);

    // Read All
    List<Employee> getEmployees();

    // Read By Name
    List<Employee> getEmployeesByName(String string);

    // Read All By Name, Start and End Date
    List<Employee> getEmployeesByNameStartEndDate(String string, Date start, Date end);

    // Update
    Employee updateEmployee(Employee employee);

    // Delete
    void deleteProduct(Long id);

}
