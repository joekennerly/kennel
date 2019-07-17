import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import Login from "./authentication/Login";
import LocationList from "./location/LocationList";
import LocationDetail from "./location/LocationDetail";
import AnimalList from "./animal/AnimalList";
import AnimalForm from "./animal/AnimalForm";
import AnimalDetail from "./animal/AnimalDetail";
import EmployeeList from "./employee/EmployeeList";
import EmployeeForm from "./employee/EmployeeForm";
import EmployeeDetail from "./employee/EmployeeDetail";
import OwnerList from "./owner/OwnerList";
import OwnerForm from "./owner/OwnerForm";
import APIManager from "../modules/APIManager";

class ApplicationViews extends Component {
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
      .then(() => APIManager.all("animalOwners"))
      .then(animalOwners => (newState.animalOwners = animalOwners))
      .then(() => this.setState(newState));
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null

  deleteAnimal = id => {
    return APIManager.delete("animals", id)
      .then(() => APIManager.all("animals"))
      .then(animals => {
        this.props.history.push("/animals");
        this.setState({ animals: animals });
      });
  };

  addAnimal = animal =>
    APIManager.post("animals", animal)
      .then(() => APIManager.all("animals"))
      .then(animals =>
        this.setState({
          animals: animals
        })
      );

  addEmployee = employee =>
    APIManager.post("employees", employee)
      .then(() => APIManager.all("employees"))
      .then(employees =>
        this.setState({
          employees: employees
        })
      );

  addOwner = owner =>
    APIManager.post("owners", owner)
      .then(() => APIManager.all("owners"))
      .then(owners =>
        this.setState({
          owners: owners
        })
      );

  deleteEmployee = id => {
    return APIManager.delete("employees", id)
      .then(() => APIManager.all("employees"))
      .then(employees => {
        this.props.history.push("/employees");
        this.setState({ employees: employees });
      });
  };
  deleteLocation = id => {
    return APIManager.delete("locations", id)
      .then(() => APIManager.all("locations"))
      .then(locations => {
        this.props.history.push("/");
        this.setState({ locations: locations });
      });
  };

  deleteOwner = id => {
    return APIManager.removeAndList("owners", id).then(owners =>
      this.setState({
        owners
      })
    );
  };

  render() {
    // console.log(this.state)
    return (
      <React.Fragment>
        <Route path="/login" component={Login} />

        <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <LocationList
                  deleteLocation={this.deleteLocation}
                  locations={this.state.locations}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          path="/:locationId(\d+)"
          render={props => {
            let location = this.state.locations.find(
              location =>
                location.id === parseInt(props.match.params.locationId)
            );

            if (!location) {
              location = { id: 404, name: "404", breed: "Location not found" };
            }

            return (
              <LocationDetail
                location={location}
                deleteLocation={this.deleteLocation}
              />
            );
          }}
        />

        {/* Make sure you add the `exact` attribute here */}
        <Route
          exact
          path="/animals"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <AnimalList
                  owners={this.state.owners}
                  animalOwners={this.state.animalOwners}
                  deleteAnimal={this.deleteAnimal}
                  animals={this.state.animals}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          path="/animals/new"
          render={props => {
            return (
              <AnimalForm
                {...props}
                addAnimal={this.addAnimal}
                employees={this.state.employees}
              />
            );
          }}
        />

        <Route
          path="/animals/:animalId(\d+)"
          render={props => {
            // Find the animal with the id of the route parameter
            let animal = this.state.animals.find(
              animal => animal.id === parseInt(props.match.params.animalId)
            );

            // If the animal wasn't found, create a default one
            if (!animal) {
              animal = { id: 404, name: "404", breed: "Dog not found" };
            }

            return (
              <AnimalDetail
                animal={animal}
                animalOwners={this.animalOwners}
                deleteAnimal={this.deleteAnimal}
              />
            );
          }}
        />
        <Route
          exact
          path="/employees"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <EmployeeList
                  deleteEmployee={this.deleteEmployee}
                  employees={this.state.employees}
                />
              );
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />

        <Route
          path="/employees/new"
          render={props => {
            return (
              <EmployeeForm
                {...props}
                addEmployee={this.addEmployee}
                employees={this.state.employees}
              />
            );
          }}
        />

        <Route
          path="/employees/:employeeId(\d+)"
          render={props => {
            let employee = this.state.employees.find(
              employee =>
                employee.id === parseInt(props.match.params.employeeId)
            );

            if (!employee) {
              employee = { id: 404, name: "404", breed: "Employee not found" };
            }

            return (
              <EmployeeDetail
                employee={employee}
                deleteEmployee={this.deleteEmployee}
              />
            );
          }}
        />

        <Route
          exact
          path="/owners"
          render={props => {
            return (
              <OwnerList
                {...props}
                deleteOwner={this.deleteOwner}
                owners={this.state.owners}
              />
            );
          }}
        />

        <Route
          path="/owners/new"
          render={props => {
            return (
              <OwnerForm
                {...props}
                addOwner={this.addOwner}
                employees={this.state.employees}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews);
