import React, { Component } from "react"
import { withRouter } from "react-router"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"

import "./Kennel.css"
import "bootstrap/dist/css/bootstrap.min.css"
class Kennel extends Component {
  getData = word => {
    console.log(word)
    const searchObj = {}
    fetch(`http://localhost:5002/locations?name_like=${word}`)
      .then(r => r.json())
      .then(location => (searchObj.locations = location))
      .then(() => fetch(`http://localhost:5002/animals?name_like=${word}`))
      .then(r => r.json())
      .then(animal => (searchObj.animals = animal))
      .then(() => fetch(`http://localhost:5002/employees?name_like=${word}`))
      .then(r => r.json())
      .then(employee => (searchObj.employees = employee))
      .then(() => fetch(`http://localhost:5002/owners?name_like=${word}`))
      .then(r => r.json())
      .then(owner => (searchObj.owners = owner))
      .then(() => this.setState(searchObj))
      .then(() => this.props.history.push("/search"))
  }

  handleKeyPress = event => {
    // if (event.key === "Enter") {
      console.log("enter press here!")
      let keyword = event.target.value
      console.log(keyword)
      this.getData(keyword)
    // }
  }

  render() {
    console.log("lack of state", this.state)
    if (this.state === null) {
      return (
        <React.Fragment>
          <NavBar press={this.handleKeyPress} />
          <ApplicationViews results={"bad"} />
        </React.Fragment>
      )
    } else {
      console.log(this.state)
      return (
        <React.Fragment>
          <NavBar press={this.handleKeyPress} />
          <ApplicationViews results={this.state} />
        </React.Fragment>
      )
    }
  }
}
export default withRouter(Kennel)
