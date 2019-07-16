import APIManager from "./APIManager"

const remoteURL = "http://localhost:5002"

  /*
    Remember that the first argument for Object.create() is the
    object that will be in this object's prototype chain.
*/

/*
if desired, one could add properties specific to a certain resource using the properties inherited from APIManager
*/
export default Object.create(APIManager, {

  get(id) {
    return fetch(`${remoteURL}/animals/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${remoteURL}/animals`).then(e => e.json())
  }
})