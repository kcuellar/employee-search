import React, {Component} from "react";
import EmployeeDataService from "../../service/EmployeeDataService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class ListEmployeesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            searchKeyword: "",
            error: null,
            isLoaded: false,
            message: null,
            startDate: new Date(),
            endDate: new Date()
        };
        this.refreshEmployees = this.refreshEmployees.bind(this);
        this.searchEmployee = this.searchEmployee.bind(this);
        this.onChangeSearchKeyword = this.onChangeSearchKeyword.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.refreshEmployees = this.refreshEmployees.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewEmployeeClicked = this.viewEmployeeClicked.bind(this);
        this.addEmployeeClicked = this.addEmployeeClicked.bind(this);
    };

    componentDidMount() {
        window.scrollTo(0,0);
        this.refreshEmployees();
    }

    refreshEmployees() {
        EmployeeDataService.retrieveAllEmployees()
            .then(
                response => {
                    this.setState( {
                        employees: response.data,
                        isLoaded: true
                    });
                    console.log(response);
                },
                error => {
                    this.setState( {
                        isLoaded: true,
                        error
                    });
                    console.log(error);
                }
            );
    }

    searchEmployee() {
        console.log(this.state.searchKeyword, this.state.startDate, this.state.endDate);
        EmployeeDataService.retrieveEmployeeByName(this.state.searchKeyword, new Date(this.state.startDate), new Date(this.state.endDate))
            .then(
                response => {
                    this.setState({
                        employees: response.data,
                    });
                    console.log(this.state.searchKeyword);
                    console.log(this.state.startDate);
                    console.log(this.state.endDate);
                    console.log(response);
                })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeSearchKeyword(e) {
        let searchKeyword = e.target.value;

        console.log(searchKeyword);

        this.setState({
            searchKeyword: searchKeyword
        });
    }

    handleStartDateChange(startDate) {
        console.log(startDate);
        this.setState({
            startDate: startDate
        })
    }

    handleEndDateChange(endDate) {
        console.log(endDate);
        this.setState({
            endDate: endDate
        })
    }

    addEmployeeClicked() {
        console.log('add new employee');
        this.props.history.push(`/add-employee`);
    }

    viewEmployeeClicked(id) {
        console.log('view' + id);
        this.props.history.push(`/employee/${id}`);
    }

    deleteEmployee(id, employeeName) {
        EmployeeDataService.deleteEmployee(id)
            .then(
                response => {
                    this.setState({message: `Successfully deleted ${employeeName}`});
                    this.refreshEmployees();
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                    console.log(error);
                }
            );
    }

    render() {
        console.log("render");
        const {message, error, isLoaded, employees, searchKeyword, startDate, endDate} = this.state;

        if (error) {
            // return <div>Error: {error.message}</div>;
            return (
                <div className="d-flex vh-100 justify-content-center align-items-center">
                    <div>Error: {error.message}</div>
                </div>
            )
        } else if (!isLoaded) {
            // return <div>Loading...</div>;
            return (
                <div className="d-flex vh-100 justify-content-center align-items-center">
                    <FontAwesomeIcon icon="spinner" size="3x" spin/>;
                </div>
            )
        } else {
            return (
                <div className="ListEmployeesComponent">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1>Employees</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group mr-2">
                                <button className="btn btn-success" onClick={this.addEmployeeClicked}>
                                    <FontAwesomeIcon icon="plus"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    {message && <div className="alert alert-success">{message}</div>}

                    <div className="container-fluid">
                        <div className="row form-group">
                            <div className="col-md-6">
                                <input
                                    className="form-control w-100"
                                    type="text"
                                    placeholder="Search"
                                    value={searchKeyword}
                                    onChange={this.onChangeSearchKeyword}

                                />
                            </div>
                            <div className="col-md-2">
                                <DatePicker
                                    className="form-control w-100"
                                    selected={startDate}
                                    onChange={this.handleStartDateChange}
                                    startDate={startDate}
                                />
                            </div>
                            <div className="col-md-2">
                                <DatePicker
                                    className="form-control w-100"
                                    selected={endDate}
                                    onChange={this.handleEndDateChange}
                                    endDate={endDate}
                                    minDate={startDate}
                                    maxDate={new Date()}
                                />
                            </div>
                            <div className="col-md-1 btn-group mr-auto">
                                <button className="btn btn-outline-info" type="button" onClick={this.searchEmployee}>
                                    <FontAwesomeIcon icon="search"/>
                                </button>
                                <button className="btn btn-outline-danger" type="button" onClick={this.refreshEmployees}>
                                    <FontAwesomeIcon icon="undo"/>
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="table-responsive">
                        <table className="table table-sm">
                            <thead className="thead-dark">
                            <tr>
                                <th>Employee Name</th>
                                <th>Department</th>
                                <th>Job Title</th>
                                <th>Age</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>View</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td className="text-truncate">{employee.name}</td>
                                            <td className="text-truncate">{employee.department}</td>
                                            <td className="text-truncate">{employee.jobTitle}</td>
                                            <td className="text-truncate">{employee.age}</td>
                                            {/*<td className="text-truncate">{new Date(employee.startDate).toLocaleDateString()}</td>*/}
                                            {/*<td className="text-truncate">{new Date(employee.endDate).toLocaleDateString()}</td>*/}
                                            <td className="text-truncate">{employee.startDate}</td>
                                            <td className="text-truncate">{employee.endDate}</td>
                                            <td className="text-truncate">
                                                <button className="btn btn-info" onClick={() => this.viewEmployeeClicked(employee.id)}>
                                                    <FontAwesomeIcon icon="info-circle" size="sm"/>
                                                </button>
                                            </td>
                                            {/*<td className="text-truncate">*/}
                                            {/*    <button className="btn btn-warning" onClick={() => this.updateEmployee(employee.id)}>*/}
                                            {/*        <FontAwesomeIcon icon="edit" size="sm"/>*/}
                                            {/*    </button>*/}
                                            {/*</td>*/}
                                            <td className="text-truncate">
                                                <button className="btn btn-danger" onClick={() => this.deleteEmployee(employee.id, employee.name)}>
                                                    <FontAwesomeIcon icon="trash" size="sm"/>
                                                </button>
                                            </td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

export default ListEmployeesComponent;