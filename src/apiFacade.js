import BASE_URL from "./settings.js";
import {useNavigate} from "react-router-dom";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() })
  }
  return res.json();
}

const handleErrors = (err, setErrorMessage) => {
  if(err.status) {
    err.fullError.then(e => {
      console.error(e.message)
      if (setErrorMessage) {
        setErrorMessage(err.code + ": " + err.message)
      }
    })
  } else {
    console.log("Network Error")
    console.error(err)
  }
}

function apiFacade() {

  const login = async (user, password) => {
    const opts = makeOptions("POST", true, {username: user, password: password})
    try {
      const res = await fetch(BASE_URL + "/login", opts)
      const data = await handleHttpErrors(res)
      setToken(data.token)
      window.location.reload()
    } catch(err) {
      handleErrors(err)
    }
  }

  const createUser = (user, password, rPassword) => {
    const opts = makeOptions("POST", false, {userName: user, userPass: password})
    return fetch(BASE_URL + "/info/signup", opts)
        .then(handleHttpErrors)
  }

  const fetchData = async (endpoint, updateAction, method, body, setErrorMessage) => {
    const opts = makeOptions(method, true, body)
    try {
      const res = await fetch(BASE_URL + endpoint, opts)
      const data = await handleHttpErrors(res)
      if(updateAction) {
        return updateAction(data)
      } else return data;
    } catch(err) {
      handleErrors(err, setErrorMessage)
    }
  }

  const setToken = (token) => {
    sessionStorage.setItem('jwtToken', token)
  }
  const getToken = () => {
    return sessionStorage.getItem('jwtToken')
  }
  const isLoggedIn = () => {
    return getToken() != null;
  }
  const logout = () => {
    sessionStorage.removeItem("jwtToken");
    window.location.reload()
  }

  const getName = () => {
    if (isLoggedIn()) {
      return JSON.parse(window.atob(getToken().split(".")[1])).username
    }
  }

  const getUserRoles = () => {
    const token = getToken()
    if(token != null) {
      const payloadBase64 = getToken().split('.')[1]
      const decodedClaims = JSON.parse(window.atob(payloadBase64))
      return decodedClaims.roles
    } else return ""
  }

  const hasUserAccess = (neededRole) => {
    const roles = getUserRoles().split(",")
    return isLoggedIn() && roles.includes(neededRole)
  }

  const makeOptions= (method, addToken, body) => {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
      }
    }
    if (addToken && isLoggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }
  return {
    makeOptions,
    setToken,
    getToken,
    isLoggedIn,
    login,
    logout,
    getName,
    hasUserAccess,
    createUser,
    fetchData
  }
}
const facade = apiFacade();
export default facade;
