import { checkNetworkConnection } from "./utils";

const baseURL = "https://www.aussiedigital.io/";

export function postAPI(method, data) {
  console.log("URL--------" + baseURL + method);
  console.log("Request parameter" + JSON.stringify(data));
  let formBody = [];
  for (let property in data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return checkNetworkConnection().then(
    networkStatus => {
      if (networkStatus) {
        return fetch(baseURL + method, {
          method: "POST",
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'x-ibm-client-id': 'default', 'x-ibm-client-secret': 'SECRET' },
          body: JSON.stringify(data)
        })
          .then(response => {
            var param = JSON.parse(response._bodyText);
            // console.log("++++++++++++" + JSON.stringify(param));
            return param;
          })
          .then(responseJson => {
            return new Promise((resolve, reject) => {
              resolve(responseJson);
            });
          });
      } else {
        return new Promise((resolve, reject) => {
          reject({
            message:
              "Network unavailable. Please connect to a Wi-Fi or cellular network."
          });
        });
      }
    },
    reject => {
      alert("reject: " + reject);
    }
  );
}


export function signIn(data, method) {
  console.log(data);
  return fetch(baseURL + method, {
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then((user) => {
      console.log(user);
      return user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

