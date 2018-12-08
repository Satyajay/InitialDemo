



export function setLoginState(data) {
    const action = {
      type:'LOGIN',
      userData:data,
    }
    return action;
  }