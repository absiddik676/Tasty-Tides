/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext(null)
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser] = useState({});

    const createUser = (email,password) =>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateNameAndPhoto = (name ,photo ) =>{
        return updateProfile(auth.currentUser, {
            
            displayName: name, photoURL: photo
          })
    }

    const loginUser = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signInWithGoogle = () =>{
        return signInWithPopup(auth,googleProvider)
    }
    const signInWithGithub = () =>{
        return signInWithPopup(auth,githubProvider)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,loggedUser=>{
            setUser(loggedUser);
        })
        return ()=>{
            unSubscribe()
        }
    },[])

    const authInfo = {
        user,
        createUser,
        updateNameAndPhoto,
        loginUser,
        signInWithGoogle,
        signInWithGithub
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;