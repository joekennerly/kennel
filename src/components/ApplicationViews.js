import { Route } from "react-router-dom";
import React, { Component } from "react";
import AnimalList from "./animal/AnimalList";
import LocationList from "./location/LocationList";
import EmployeeList from "./employee/EmployeeList";
import OwnerList from "./owner/OwnerList";
import APIManager from "../modules/APIManager"

export default class ApplicationViews extends Component {
  state = {
    owners: [],
    employees: [],
    locations: [],
    animals: [],
    animalOwners: []
  };

  componentDidMount() {
    const newState = {};

    APIManager.all("animals")
      .then(animals => (newState.animals = animals))
      .then(() => APIManager.all("employees"))
      .then(employees => (newState.employees = employees))
      .then(() => APIManager.all("locations"))
      .then(locations => (newState.locations = locations))
      .then(() => APIManager.all("owners"))
      .then(owners => (newState.owners = owners))
      .then(() => this.setState(newState));
  }

  deleteAnimal = (id) => {
    return APIManager.removeAndList("animals", id)
    .then(animals => this.setState({
        animals
      })
    )
  }

  deleteEmployee = (id) => {
    return APIManager.removeAndList("employees", id)
    .then(employees => this.setState({
        employees
      })
    )
  }

  deleteOwner = (id) => {
    return APIManager.removeAndList("owners", id)
    .then(owners => this.setState({
        owners
      })
    )
  }

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <LocationList locations={this.state.locations} />;
          }}
        />
        <Route
          exact
          path="/animals"
          render={props => {
            return (
              <AnimalList
                deleteAnimal={this.deleteAnimal}
                animals={this.state.animals}
              />
            );
          }}
        />
        <Route
          path="/employees"
          render={props => {
            return(
              <EmployeeList
                deleteEmployee={this.deleteEmployee}
                employees={this.state.employees}
            />
          )
          }}
        />
        <Route
          path="/owners"
          render={props => {
            return <OwnerList
              deleteOwner={this.deleteOwner}
              owners={this.state.owners} />;
          }}
        />
      </React.Fragment>
    );
  }
}
