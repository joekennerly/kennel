const remoteURL = "http://localhost:5002";

export default Object.create(null, {
  get: {
    value: function(resource, id) {
  /*
      Since the purpose of this module is to be used by all of the more specialized one, then the string of `animals` should not be hard coded here.
  */
      return fetch(`${remoteURL}/${resource}/${id}`).then(e => e.json());
    }
  },
  all: {
    value: function(resource) {
      return fetch(`${remoteURL}/${resource}`).then(e => e.json());
    }
  }
});
