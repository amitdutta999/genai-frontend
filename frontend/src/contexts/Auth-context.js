/* Copyright 2023 Google LLC. This software is provided as-is, without warranty
 or representation for any use or purpose. Your use of it is subject to your
 agreement with Google. */
 /*This code is not production ready */

import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { createContext, useState } from "react";
import { auth } from "../FirestoneConfig";

const AuthContext = createContext({});

export const AuthProvider = (props) => {
    //const [user , setUser] = useState({}); 

    const [activeUser, setActiveUser] = useState({})

    onAuthStateChanged(auth, (user) => {
        if(user){
            setActiveUser(user)
        }else{
            setActiveUser(null)
        }
    })

    return(
        <AuthContext.Provider value={{ activeUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;