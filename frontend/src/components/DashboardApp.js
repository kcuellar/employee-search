import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ListEmployeesComponent from "./employees/ListEmployeesComponent";
import EmployeeComponent from "./employees/EmployeeComponent";
import CreateEmployeeComponent from "./employees/CreateEmployeeComponent";

function DashboardApp() {
    return (
        <Switch>
            <Route name="home" exact path={["/","=/employee-list"]} component={ListEmployeesComponent}/>
            <Route name="employeeDetails" exact path="/employee/:id" component={EmployeeComponent}/>
            <Route name="createEmployee" exact path="/add-employee" component={CreateEmployeeComponent}/>
            {/*<Route name="editEmployee" exact path="employee/:id" component={EditEmployeeComponent}/>*/}
        <Redirect to="/"/>
        </Switch>
    );
}

export default DashboardApp