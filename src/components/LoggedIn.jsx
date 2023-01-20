import React, {useEffect, useState} from "react";
import facade from "../apiFacade.js";
import {useNavigate} from "react-router-dom";

export default function LoggedIn() {

    const navi = useNavigate()

    const logout = () => {
        navi("/")
        facade.logout()
    }

    return (
        <div className="login-container">
            <button onClick={logout}>Logout</button>
        </div>
    )

}
