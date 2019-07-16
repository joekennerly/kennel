import React, { Component } from "react";
import "./OwnerList.css";

export default class OwnerList extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="ownerButton">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/owners/new");
            }}
          >
            Admit Owner
          </button>
        </div>
        <section className="owners">
          {this.props.owners.map(owner => (
            <div key={owner.id} className="card">
              <div className="card-body">
                <div className="card-title">
                  <h5>{owner.name}</h5>
                  <button
                    onClick={() => this.props.deleteOwner(owner.id)}
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
