package com.kelleecuellar.employeeapp.employeesearch;

import com.kelleecuellar.employeeapp.employeesearch.employee.model.Employee;
import com.kelleecuellar.employeeapp.employeesearch.employee.dao.EmployeeRepository;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.test.annotation.Rollback;

//import java.util.Date;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

// Initial Data Seeded with data.sql (5 inserts)
@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class EmployeeTests {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    @Rollback(false)
    @Order(1)
    public void testCreateEmployee() {
        Date start = new Date(112,10,15);
        Date end = new Date(118,12,1);
        Employee employee = new Employee("Mary Rose", "Sales", "Sales Manager", 25, start, end);

        Employee savedEmployee = employeeRepository.save(employee);

        System.out.println(employee);

        assertNotNull(savedEmployee);
    }

    @Test
    @Order(2)
    public void testFindEmployeeName() {
        String name = "Mary Rose";
        Employee employee = employeeRepository.findByName(name);

        System.out.println(employee);

        assertThat(employee.getName()).isEqualTo(name);
    }

    @Test
    @Rollback(false)
    @Order(3)
    public void testFindEmployeeByNameIgnoringCaseSensitive() {
        Employee emp = new Employee("Mary Larry", "Sales", "Sales Manager", 25, new Date(115,10,15), new Date(118,12,1));
        employeeRepository.save(emp);

        System.out.println(emp);

        String name = "mary";
        List<Employee> employees = employeeRepository.findByNameContainingIgnoreCase(name);

        for(Employee employee : employees ) {
            System.out.println(employee);
        }

        assertThat(employees).size().isEqualTo(2);
    }

    @Test
    @Rollback(false)
    @Order(4)
    public void testFindByNameStartDateAndEndDate() {
        String name = "john";
        Date start = new Date(110,01,01);
        Date end = new Date(120,12,30);
        List <Employee> employees = employeeRepository.findByNameContainingIgnoreCaseAndStartDateGreaterThanEqualAndEndDateLessThanEqual(name, start, end);

        for(Employee e : employees ) {
            System.out.println(e);
        }

        assertThat(employees).size().isEqualTo(2);
    }

    @Test
    @Rollback(false)
    @Order(5)
    public void testUpdateEmployee() {
        int tmp = 7;
        Long longTmp = Long.valueOf(tmp);
        Optional<Employee> e = employeeRepository.findById(longTmp);

        System.out.println(e);

        String name = "Blake McAdams";
        String department = "Blake McAdams";
        String jobTitle = "Blake McAdams";
        Integer age = 40;
        Date startDate = new Date(101, 12,5);
        Date endDate = new Date(115, 1, 20);
        Employee employee = new Employee(name, department, jobTitle, age, startDate, endDate);
        employee.setId(Long.valueOf(7));

        employeeRepository.save(employee);

        System.out.println(employee);

        Employee updatedEmployee = employeeRepository.save(employee);

        assertThat(updatedEmployee.getName()).isEqualTo(name);
    }

    @Test
    @Rollback(false)
    @Order(6)
    public void testFindAllEmployees() {
        List <Employee> employees = employeeRepository.findAll();

        for(Employee e : employees ) {
            System.out.println(e);
        }
        assertThat(employees).size().isEqualTo(7);
    }

    @Test
    @Rollback(false)
    @Order(7)
    public void testDeleteProduct() {
        int tmp = 7;
        Long longTmp = Long.valueOf(tmp);

        boolean isExistBeforeDelete = employeeRepository.findById(longTmp).isPresent();

        employeeRepository.deleteById(longTmp);

        boolean isExistAfterDelete = employeeRepository.findById(longTmp).isPresent();

        List <Employee> employees = employeeRepository.findAll();

        for(Employee e : employees ) {
            System.out.println(e);
        }

        assertTrue(isExistBeforeDelete);
        assertFalse(isExistAfterDelete);
    }
}
