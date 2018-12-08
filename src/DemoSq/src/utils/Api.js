import { checkNetworkConnection } from "./utils";

const baseURL = "http://52.14.89.103:3000/api/";


//Post API
//ogin.json



export function postAPI(method,data) {

console.log("url--"+baseURL+method);
  return checkNetworkConnection().then(
    networkStatus => {
      if (networkStatus) {
        return fetch(baseURL+method, {
          method: "POST",
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          timeout: 5000, 
          body: JSON.stringify(data)//formBody
        })
          .then(response => {
            var param=JSON.parse(response._bodyText);
            
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


export function signUp2(data,method) {
  console.log(data);
  return fetch(baseURL+method, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((user) => {
      console.log(user);
      return  user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}


export function patchApi(data,method) {
  console.log(data);
  return fetch(baseURL+method, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((user) => {
      console.log(user);
      return  user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}



export function signUp(data,method) {
  console.log(data);
  return fetch(baseURL+method, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((user) => {
      console.log(user);
      return  user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function socialLogin(data) {
  console.log(data);
  return fetch(baseURL+'social_login.json', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((user) => {
      console.log(user);
      return  user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}


export function logIn(data) {
  console.log(data);
  return fetch(baseURL+'login.json', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((user) => {
      console.log(user);
      return  user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function forgotPwd(data) {
  console.log(data);
  return fetch(baseURL+'forgot_password.json', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((user) => {
     // console.log(user.json());
      return  user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function privacyPolicy(data) {
  console.log(data);
  return fetch(baseURL+'getCmsContents.json', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((user) => {
      console.log(user);
      return  user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function contactUs(data) {
  console.log(data);
  return fetch(baseURL+'contact_us.json', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((user) => {
      console.log(user);
      return  user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getProfile(data) {
  console.log(data);
  return fetch(baseURL+'getUserProfile.json', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((user) => {
      console.log(user);
      return  user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function updateProfile(data) {
  console.log(data);
  return fetch(baseURL+'update_profile.json', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((user) => {
      console.log(user);
      return  user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function changePwd(data) {
  console.log(data);
  return fetch(baseURL+'change_password.json', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((user) => {
      console.log(user);
      return  user.json();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function imagePostAPI(method,data) {
  console.log("URL--------++++++++"+baseURL+method);
  console.log("Request parameter"+JSON.stringify(data));
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
        return fetch(baseURL+method, {
          method: "POST",
          headers: {
            'Content-Type': 'multipart/form-data'
        },
          body: formBody
        })
          .then(response => {
            var param=JSON.parse(response._bodyText);
            
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

//GET API

export function getAPI(endpoint) {
  
  return checkNetworkConnection().then(
    networkStatus => {
      if (networkStatus) {
        return fetch(baseURL + endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
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
      console.log("reject: " + reject);
    }
  );
}


export function getDestination(address) {
  
  return checkNetworkConnection().then(
    networkStatus => {
      if (networkStatus) {
        return fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyBhbi7g9ToKONHuiwQvGiUyKcOFZfFkhT8', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
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
      console.log("reject: " + reject);
    }
  );
}



export function instaUser(endpoint) {
  
  return checkNetworkConnection().then(
    networkStatus => {
      if (networkStatus) {
        return fetch('https://api.instagram.com/v1/users/self/?access_token=' + endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
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
      console.log("reject: " + reject);
    }
  );
}


export function facebookUser(endpoint) {
  
  return checkNetworkConnection().then(
    networkStatus => {
      if (networkStatus) {
        return fetch('https://graph.facebook.com/v2.5/me?fields=email,picture,name,first_name,last_name,friends&access_token=' + endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json())
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
      console.log("reject: " + reject);
    }
  );
}

