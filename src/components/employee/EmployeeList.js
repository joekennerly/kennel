import React, { Component } from "react";
import "./Employee.css";
import { Link } from "react-router-dom";

export default class EmployeeList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="employeeButton">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/employees/new");
            }}
          >
            Admit Employee
          </button>
        </div>
        <section className="employees">
          {this.props.employees.map(employee => (
            <div key={employee.id} className="card">
              <div className="card-body">
                <div className="card-title">
                  <h5>{employee.name}</h5>
                  <Link className="nav-link" to={`/employees/${employee.id}`}>
                    Details
                  </Link>
                  <button
                    onClick={() => this.props.deleteEmployee(employee.id)}
                    className="card-link"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </React.Fragment>
    );
  }
}
