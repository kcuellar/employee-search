import React, {Component} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import EmployeeDataService from "../../service/EmployeeDataService";
import { DatePicker } from 'react-formik-ui';
import * as yup from "yup";

export const employeeValidationSchema = yup.object().shape({
    name: yup.string()
        .max(50, 'Name must be 50 characters or less')
        .required('Name is required'),
    department: yup.string()
        .max(50, 'Department name must be 50 characters or less')
        .required('Department is required'),
    jobTitle: yup.string()
        .max(50, 'Job title must be 50 characters or less')
        .required('Job Title is required'),
    age: yup.number()
        .positive('Age must be positive')
        .integer('Age must be an integer')
        .required('Age is required'),
    startDate: yup.date()
        .required('Start Date is required'),
    endDate: yup.date(),
});


class CreateEmployeeComponent extends Component {

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

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onCancel = () => {
        this.props.history.push(`/employees`);
    };

    handleSubmit = (values, { props = this.props, setSubmitting }) => {
        let employee = {
            name: values.name,
            department: values.department,
            jobTitle: values.jobTitle,
            age: values.age,
            startDate: values.startDate,
            endDate: values.endDate
        };

        EmployeeDataService.createEmployee(employee)
            .then(() => this.props.history.push('/employees'));

        this.setState({message: 'Successfully added employee'});

        // setTimeout(() => {
        // alert(JSON.stringify(values, null, 2));
        // alert(this.state.message);
        // }, 400);

        // done submitting, set submitting to false
        setSubmitting(false);

        console.log(values);
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
            <div className="CreateEmployeeComponent">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1>Add Employee</h1>
                </div>

                <Formik
                    initialValues={{
                        name,
                        department,
                        jobTitle,
                        age,
                        startDate,
                        endDate,
                    }}
                    onSubmit={this.handleSubmit}
                    validationSchema={employeeValidationSchema}
                    validateOnChange={false}
                    validateOnBlur={true}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <h5 className="pt-2 pb-3 mb-3 border-bottom">General Information</h5>
                            <ErrorMessage name="name" component="div" className="alert alert-danger"/>
                            <ErrorMessage name="department" component="div" className="alert alert-danger"/>
                            <ErrorMessage name="jobTitle" component="div" className="alert alert-danger"/>
                            <ErrorMessage name="age" component="div" className="alert alert-danger"/>
                            <ErrorMessage name="startDate" component="div" className="alert alert-danger"/>
                            <ErrorMessage name="endDate" component="div" className="alert alert-danger"/>
                            <div className="row">
                                <div className="col">
                                    <fieldset className="form-group row">
                                        <label className="col-sm-4 col-form-label">Name</label>
                                        <Field className="col form-control" type="text" name="name" placeholder={name}/>
                                    </fieldset>
                                    <fieldset className="form-group row">
                                        <label className="col-sm-4 col-form-label">Department</label>
                                        <Field className="col form-control" type="text" name="department" placeholder={department}/>
                                    </fieldset>
                                    <fieldset className="form-group row">
                                        <label className="col-sm-4 col-form-label">Job Title</label>
                                        <Field className="col form-control" type="text" name="jobTitle" placeholder={jobTitle}/>
                                    </fieldset>
                                    <fieldset className="form-group row">
                                        <label className="col-sm-4 col-form-label">Age</label>
                                        <Field className="col form-control" type="number" name="age" placeholder={age}/>
                                    </fieldset>
                                    <fieldset className="form-group row">
                                        <label className="col-sm-4 col-form-label">Start Date</label>
                                        <DatePicker className="col form-control" name="startDate" placeholder={startDate}/>
                                    </fieldset>
                                    <fieldset className="form-group row">
                                        <label className="col-sm-4 col-form-label">End Date</label>
                                        <DatePicker className="col form-control" name="endDate" placeholder={endDate}/>
                                    </fieldset>
                                </div>
                            </div>
                            <button className="btn btn-success m-1" type="submit" disabled={isSubmitting}>Save</button>
                            <button className="btn btn-primary m-1" type="button" disabled={isSubmitting} onClick={() => this.onCancel()}>Cancel</button>
                        </Form>
                    )
                    }
                </Formik>
            </div>
        )
    }
}

export default CreateEmployeeComponent;