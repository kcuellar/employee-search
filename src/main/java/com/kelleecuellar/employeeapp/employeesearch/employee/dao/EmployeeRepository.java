package com.kelleecuellar.employeeapp.employeesearch.employee.dao;

import com.kelleecuellar.employeeapp.employeesearch.employee.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

//import java.sql.Date;
import java.util.Date;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
//    Doesn't Include Employees Still Employed
//    List<Employee> findByNameContainingIgnoreCaseAndStartDateAfterAndEndDateBefore(String string, Date start, Date end);

//    Case Sensitive
//    @Query("SELECT e FROM Employee e WHERE (e.name like %?1%) and (e.startDate >= ?2) and (e.endDate is null or e.endDate <= ?3)")

//    Case In-sensitive
    @Query("SELECT e FROM Employee e WHERE (upper(e.name) like upper(concat('%',?1,'%'))) and (e.startDate >= ?2) and (e.endDate is null or e.endDate <= ?3)")
    List<Employee> findByNameContainingIgnoreCaseAndStartDateGreaterThanEqualAndEndDateLessThanEqual(String string, Date start, Date end);
    List<Employee> findByNameContainingIgnoreCase(String string);
    Employee findByName(String string);
}