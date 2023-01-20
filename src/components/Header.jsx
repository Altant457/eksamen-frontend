import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import Login from "./Login.jsx";
import LoggedIn from "./LoggedIn.jsx";
import "../styles/header.css";
import facade from "../apiFacade.js";


function Header({setErrorMsg}) {


  return (
      <nav className="topnav">

        <div className="topnavLeft">
          <NavLink to="/"><i className="fa fa-fw fa-home"></i> Home</NavLink>
        </div>

        <div className="topnavMid">
          {facade.isLoggedIn() ? (
              <>
                <NavLink to="/events"><i className="fa fa-fw fa-envelope"></i> Events</NavLink>
                {facade.hasUserAccess("admin") ? (
                    <>
                      <NavLink to="/admin"><i className="fa fa-fw fa-envelope"></i> Admin</NavLink>
                    </>
                ) : (<></>)}
              </>
          ) : (<></>)}
        </div>

        <div className="topnavRight">
          {!facade.isLoggedIn() ?
              (
                  <>
                    <Login setErrorMsg={setErrorMsg}/>
                    <NavLink to="/signup">
                      <button className="signUp">Sign up</button>
                    </NavLink>
                  </>
              ) :
              (<div>
                <LoggedIn />
              </div>)}

        </div>

      </nav>
  );
}

export default Header;
