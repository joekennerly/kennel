import { Route } from "react-router-dom";
import React, { Component } from "react";
import AnimalList from "./animal/AnimalList";
import AnimalDetail from "./animal/AnimalDetail";
import LocationList from "./location/LocationList";
import EmployeeList from "./employee/EmployeeList";
import OwnerList from "./owner/OwnerList";
import APIManager from "../modules/APIManager";
import { withRouter } from 'react-router'

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
      .then(() => this.setState(newState));
  }

  deleteAnimal = id => {
    // console.log(this.props)
    return APIManager.delete("animals", id)
    .then(()=> APIManager.all("animals"))
      .then(animals => {
      console.log(animals)
        this.props.history.push("/animals")
        this.setState({ animals: animals })
    })
}
  deleteEmployee = id => {
    return APIManager.removeAndList("employees", id).then(employees =>
      this.setState({
        employees
      })
    );
  };

  deleteOwner = id => {
    return APIManager.removeAndList("owners", id).then(owners =>
      this.setState({
        owners
      })
    );
  };

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
    return <LocationList locations={this.state.locations} />
}} />

{/* Make sure you add the `exact` attribute here */}
<Route exact path="/animals" render={(props) => {
    return <AnimalList deleteAnimal={ this.deleteAnimal } animals={this.state.animals} />
}} />

{/*
    This is a new route to handle a URL with the following pattern:
        http://localhost:3000/animals/1

    It will not handle the following URL because the `(\d+)`
    matches only numbers after the final slash in the URL
        http://localhost:3000/animals/jack
*/}
<Route path="/animals/:animalId(\d+)" render={(props) => {
    // Find the animal with the id of the route parameter
    let animal = this.state.animals.find(animal =>
        animal.id === parseInt(props.match.params.animalId)
    )

    // If the animal wasn't found, create a default one
    if (!animal) {
        animal = {id:404, name:"404", breed: "Dog not found"}
    }

    return <AnimalDetail animal={ animal }
                deleteAnimal={ this.deleteAnimal } />
}} />
        <Route
          path="/employees"
          render={props => {
            return (
              <EmployeeList
                deleteEmployee={this.deleteEmployee}
                employees={this.state.employees}
              />
            );
          }}
        />
        <Route
          path="/owners"
          render={props => {
            return (
              <OwnerList
                deleteOwner={this.deleteOwner}
                owners={this.state.owners}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(ApplicationViews)