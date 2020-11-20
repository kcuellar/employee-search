package com.kelleecuellar.employeeapp.employeesearch.employee.service;

import com.kelleecuellar.employeeapp.employeesearch.employee.dao.EmployeeRepository;
import com.kelleecuellar.employeeapp.employeesearch.employee.model.Employee;
import org.springframework.stereotype.Service;

//import java.sql.Date;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // Create
    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Read by Id
    @Override
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    // Read All
    @Override
    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    // Read By Name
    @Override
    public List<Employee> getEmployeesByName(String string) {
        return employeeRepository.findByNameContainingIgnoreCase(string);
    }

    // Read All By Name, Start and End Date
    @Override
    public List<Employee> getEmployeesByNameStartEndDate(String string, Date start,  Date end) {

//      Search for employees that are still employed with start date and during the date range
        return employeeRepository.findByNameContainingIgnoreCaseAndStartDateGreaterThanEqualAndEndDateLessThanEqual(string, start, end);
    }

    // Update
    @Override
    public Employee updateEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    // Delete
    @Override
    public void deleteProduct(Long id){
        employeeRepository.deleteById(id);
    }
}
