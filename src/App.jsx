import {useRef, useState,useEffect } from "react"
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Contact from "./pages/Contact.jsx";
import facade from "./apiFacade";
import Header from "./components/Header.jsx";
import SignUp from "./components/SignUp.jsx";
import Events from "./pages/Events.jsx";
import Admin from "./pages/Admin.jsx";

function App() {

  return (
      <>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
            integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
            crossOrigin="anonymous"
        />
        <Header/>
        <Routes>
          <Route path="" element={<Home />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/events" element={<Events />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="*" element={<h1>Page Not Found !!!!</h1>} />
        </Routes>
      </>
  );
}

export default App;





// function LogIn({ login }) {
//   const init = { username: "", password: "" };
//   const [loginCredentials, setLoginCredentials] = useState(init);
//
//   const performLogin = (evt) => {
//     evt.preventDefault();
//     login(loginCredentials.username, loginCredentials.password);
//   }
//   const onChange = (evt) => {
//     setLoginCredentials({ ...loginCredentials,[evt.target.id]: evt.target.value })
//   }
//
//   return (
//     <div>
//       <h2>Login</h2>
//       <form onChange={onChange} >
//         <input placeholder="User Name" id="username" />
//         <input placeholder="Password" id="password" />
//         <button onClick={performLogin}>Login</button>
//         <button onClick=>Sign up</button>
//       </form>
//     </div>
//   )
//
// }
// function LoggedIn() {
//   const [dataFromServer, setDataFromServer] = useState("Loading...")
//
//   useEffect(() => {
//     facade.fetchData().then(data=> setDataFromServer(data.msg));
//   }, [])
//
//   return (
//     <div>
//       <h2>Data Received from server</h2>
//       <h3>{dataFromServer}</h3>
//     </div>
//   )
//
// }
//
// function App() {
//   const [loggedIn, setLoggedIn] = useState(false)
//
//   const logout = () => {
//     facade.logout()
//     setLoggedIn(false)
//   }
//   const login = (user, pass) => {
//     facade.login(user, pass)
//           .then(res => setLoggedIn(true))
//   }
//
//   return (
//     <div>
//       {!loggedIn ? (<LogIn login={login} />) :
//         (<div>
//           <LoggedIn />
//           <button onClick={logout}>Logout</button>
//         </div>)}
//     </div>
//   )
//
// }
// export default App;
