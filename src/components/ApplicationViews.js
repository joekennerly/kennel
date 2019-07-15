import { Route } from "react-router-dom";
import React, { Component } from "react";
import AnimalList from "./animal/AnimalList";
import LocationList from "./location/LocationList";
import EmployeeList from "./employee/EmployeeList";
import OwnerList from "./owner/OwnerList";

export default class ApplicationViews extends Component {
  employeesFromAPI = [
    { id: 1, name: "Jessica Younker" },
    { id: 2, name: "Jordan Nelson" },
    { id: 3, name: "Zoe LeBlanc" },
    { id: 4, name: "Blaise Roberts" }
  ];

  locationsFromAPI = [
    { id: 1, name: "Nashville North", address: "500 Circle Way" },
    { id: 2, name: "Nashville South", address: "10101 Binary Court" }
  ];

  animalsFromAPI = [
    { id: 1, name: "Doodles" },
    { id: 2, name: "Jack" },
    { id: 3, name: "Angus" },
    { id: 4, name: "Henley" },
    { id: 5, name: "Derkins" },
    { id: 6, name: "Checkers" }
  ];

  ownersFromAPI = [
    { id: 1, name: "Ryan Tanay", phoneNumber: "555-555-5555" },
    { id: 2, name: "Emma Beaton", phoneNumber: "555-555-5555" },
    { id: 3, name: "Dani Adkins", phoneNumber: "555-555-5555" },
    { id: 4, name: "Adam Oswalt", phoneNumber: "555-555-5555" },
    { id: 5, name: "Fletcher Bangs", phoneNumber: "555-555-5555" },
    { id: 6, name: "Angela Lee", phoneNumber: "555-555-5555" }
  ]

  animalOwners = [
    { id: 1, animal_Id: 1, owner_Id: 1},
    { id: 2, animal_Id: 1, owner_Id: 2},
    { id: 3, animal_Id: 2, owner_Id: 3},
    { id: 4, animal_Id: 3, owner_Id: 1},
    { id: 5, animal_Id: 3, owner_Id: 2},
    { id: 6, animal_Id: 4, owner_Id: 4},
    { id: 7, animal_Id: 5, owner_Id: 4},
    { id: 8, animal_Id: 5, owner_Id: 5},
    { id: 9, animal_Id: 6, owner_Id: 6}
  ]

  state = {
    owners: this.ownersFromAPI,
    employees: this.employeesFromAPI,
    locations: this.locationsFromAPI,
    animals: this.animalsFromAPI,
    animalOwners: this.animalOwners
  };

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
          path="/animals"
          render={props => {
            return <AnimalList animals={this.state.animals} />;
          }}
        />
        <Route
          path="/employees"
          render={props => {
            return <EmployeeList employees={this.state.employees} />;
          }}
        />
        <Route
          path="/owners"
          render={props => {
            return <OwnerList owners={this.state.owners} />;
          }}
        />
      </React.Fragment>
    );
  }
}
