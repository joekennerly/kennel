import React, { Component } from "react";
import dog from "./DogIcon.svg";
import "./Animal.css";
import { Link } from "react-router-dom";


export default class AnimalList extends Component {
  render() {
    let owners = this.props.owners
    console.log(owners)
    return (
      <React.Fragment>
        <div className="animalButton">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {this.props.history.push("/animals/new")}}
          >
            Admit Animal
          </button>
        </div>
        <section className="animals">
          {this.props.animals.map(animal => (
            <div key={animal.id} className="card">
              <div className="card-body">
                <div className="card-title">
                  <img src={dog} className="icon--dog" alt="dog" />
                  <h5>{animal.name}</h5>

                  {this.props.animalOwners.filter(animalOwner =>
                    animalOwner.animal_Id === animal.id
                  ).map(dogOwner => {
                    return (<div key={dogOwner.owner_Id}>{this.props.owners.find(trueOwner => trueOwner.id === dogOwner.owner_Id).name}</div>)
                  })}

                  <Link className="nav-link" to={`/animals/${animal.id}`}>
                    Details
                  </Link>
                  <button
                    onClick={() => this.props.deleteAnimal(animal.id)}
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
