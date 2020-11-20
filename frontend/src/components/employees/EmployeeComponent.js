import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EmployeeDataService from "../../service/EmployeeDataService";

class EmployeeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            department: '',
            jobTitle: '',
            age: '',
            startDate: '',
            endDate: '',
        };

        this.onBack= this.onBack.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        console.log(this.state.id);

        EmployeeDataService.retrieveEmployee(this.state.id)
            .then(
                response => {
                    this.setState({
                        name: response.data.name,
                        department: response.data.department,
                        jobTitle: response.data.jobTitle,
                        age: response.data.age,
                        startDate: response.data.startDate,
                        endDate: response.data.endDate
                    });
                }
            );
    }

    onBack = () => {
        this.props.history.push(`/`);
    };

    render() {
        let {
            name,
            department,
            jobTitle,
            age,
            startDate,
            endDate,
        } = this.state;

        return (
            <div className="EmployeeComponent">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1>Employee Details</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                            <button className="btn btn-primary m-1 pl-3 pr-3" type="button" onClick={() => this.onBack()}>
                                <FontAwesomeIcon icon="arrow-left"/>
                            </button>
                        </div>
                    </div>
                </div>
                <h5 className="pt-2 pb-3 mb-3 border-bottom">General Information</h5>
                <div className="container-fluid">
                    <table className="table table-bordered table-striped">
                        <tbody>
                        <tr>
                            <th>Employee Name</th>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <th>Department</th>
                            <td>{department}</td>
                        </tr>
                        <tr>
                            <th>Job Title</th>
                            <td>{jobTitle}</td>
                        </tr>
                        <tr>
                            <th>Age</th>
                            <td>{age}</td>
                        </tr>
                        <tr>
                            <th>Start Date</th>
                            <td>{startDate}</td>
                        </tr>
                        <tr>
                            <th>End Date</th>
                            <td>{endDate}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default EmployeeComponent;