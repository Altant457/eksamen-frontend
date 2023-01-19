import BASE_URL from "./settings.js";

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
  /* Insert utility-methods from a later step (d) here (REMEMBER to uncomment in the returned object when you do)*/
  const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
  const getToken = () => {
    return localStorage.getItem('jwtToken')
  }
  const loggedIn = () => {
    return getToken() != null;
  }
  const logout = () => {
    localStorage.removeItem("jwtToken");
    document.querySelector("#welcomeUser").innerHTML = `Welcome`
  }

  const findPokemon = (String) => {
    const opts = makeOptions("POST", true, {query: String})
    return fetch(BASE_URL + "/info/pokemon", opts)
      .then(handleHttpErrors)
      .catch(err => {
        if(err.status) {
            err.fullError.then(e => console.log(e.message))
        } else {
            console.log("Network Error")
        }
    })
  }

  const login = async (user, password) => {
    const opts = makeOptions("POST", true, {username: user, password: password})
    try {
      const res = await fetch(BASE_URL + "/login", opts)
      const data = await handleHttpErrors(res)
      document.querySelector("#welcomeUser").innerHTML = `Welcome, ${user}`
      setToken(data.token)
    } catch(err) {

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
      return updateAction(data)
    } catch(err) {
      handleErrors(err, setErrorMessage)
    }
  }

  const makeOptions= (method, addToken, body) => {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
      }
    }
    if (addToken && loggedIn()) {
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
    loggedIn,
    login,
    logout,
    createUser,
    fetchData,
    findPokemon
  }
}
const facade = apiFacade();
export default facade;
