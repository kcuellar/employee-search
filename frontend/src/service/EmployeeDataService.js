import axios from 'axios';

const EMPLOYEE_APP_API_URL = 'http://localhost:8080/api';

class EmployeeDataService {
    // Create
    createEmployee(employee) {
        return axios.post(`${EMPLOYEE_APP_API_URL}/employees`, employee);
    }

    // Read
    retrieveAllEmployees() {
        return axios.get(`${EMPLOYEE_APP_API_URL}/employees`);
    }

    // Read By Id
    retrieveEmployee(id) {
        return axios.get(`${EMPLOYEE_APP_API_URL}/employees/${id}`);
    }

    // Read By Name
    retrieveEmployeeByName(keyword, start, end) {
        // return axios.get(`${EMPLOYEE_APP_API_URL}/employees?keyword=${keyword}`);
        // return axios.get(`${EMPLOYEE_APP_API_URL}/employees`, {params: {keyword: keyword}});
        return axios.get(`${EMPLOYEE_APP_API_URL}/employees`, {params: {keyword: keyword, start: start, end: end}});
    }

    // Update
    updateEmployee(id, employee) {
        return axios.post(`${EMPLOYEE_APP_API_URL}/employees/${id}`, employee);
    }

    // Delete
    deleteEmployee(id) {
        return axios.delete(`${EMPLOYEE_APP_API_URL}/employees/${id}`);
    }
}

export default new EmployeeDataService()