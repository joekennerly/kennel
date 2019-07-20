import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

class LocationResults extends Component {

    render() {
        console.log("props", this.props)
        return (
            <div>
                {
                    this.props.locations.map(location =>
                        <div key={location.id} className="card">
                            <h4>{location.name}</h4>
                            <h5>{location.address}</h5>
                        </div>
                    )
                }
            </div>
        )
    }
}

class AnimalResults extends Component {

    render() {
        console.log("props", this.props)
        return (
            <div>
                {
                    this.props.animals.map(animal =>
                        <div key={animal.id} className="card">
                            <h4>{animal.name}</h4>
                        </div>
                    )
                }
            </div>
        )
    }
}

class EmployeeResults extends Component {

    render() {
        console.log("props", this.props)
        return (
            <div>
                {
                    this.props.employees.map(employee =>
                        <div key={employee.id} className="card">
                            <h4>{employee.name}</h4>
                        </div>
                    )
                }
            </div>
        )
    }
}

class OwnerResults extends Component {

    render() {
        console.log("props", this.props)
        return (
            <div>
                {
                    this.props.owners.map(owner =>
                        <div key={owner.id} className="card">
                            <h4>{owner.name}</h4>
                        </div>
                    )
                }
            </div>
        )
    }
}


export default class SearchResults extends Component {

    render() {
        console.log("hello", this.props)

        return (
            <React.Fragment>
                <LocationResults locations={this.props.results.locations} />
                <AnimalResults animals={this.props.results.animals} />
                <EmployeeResults employees={this.props.results.employees} />
                <OwnerResults owners={this.props.results.owners} />
            </React.Fragment>
        )
    }
}

// export {handleKeyPress}