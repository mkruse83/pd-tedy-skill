// load AWS SDK module, which is always included in the runtime environment
const AWS = require("aws-sdk");

// define our target API as a "service"
const svc = new AWS.Service({
  // the API base URL
  endpoint: "https://np6m7ztazk.execute-api.eu-central-1.amazonaws.com/dev/",

  // don't parse API responses
  // (this is optional if you want to define shapes of all your endpoint responses)
  convertResponseTypes: false,

  // and now, our API endpoints
  apiConfig: {
    metadata: {
      protocol: "rest-json" // we assume our API is JSON-based
    },
    operations: {
      // get a record by id
      SetLightState: {
        http: {
          method: "POST",
          // note the placeholder in the URI
          requestUri: "/light/{name}/state/{state}"
        },
        input: {
          type: "structure",
          required: ["name", "state"],
          members: {
            name: {
              // all kinds of validators are available
              type: "string",
              // include it in the call URI
              location: "uri",
              // this is the name of the placeholder in the URI
              locationName: "name"
            },
            state: {
              // all kinds of validators are available
              type: "string",
              // include it in the call URI
              location: "uri",
              // this is the name of the placeholder in the URI
              locationName: "state"
            }
          }
        }
      }
    }
  }
});

// disable AWS region related login in the SDK
svc.isGlobalEndpoint = true;

module.exports = {
  setLightState: (name, state) =>
    new Promise((resolve, reject) => {
      svc.setLightState({ name, state }, (err, data) => {
        if (err) {
          console.error("error occured: ", err);
          reject(err);
        }
        console.log(JSON.stringify(data));
        resolve(data);
      });
    })
};
