/* Copyright 2023 Google LLC. This software is provided as-is, without warranty
 or representation for any use or purpose. Your use of it is subject to your
 agreement with Google. */
 /*This code is not production ready */

import React, {useContext, useState} from 'react';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';
import PropTypes from 'prop-types';
import styles from './compLogin.module.css';
import { Button } from 'react-bootstrap';


const CompLogin = () => {
  // const [user,setUser] = useContext(AuthContext);
  const [user,setUser] = useState(null);

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      setUser(result.user)
      alert(result.user.displayName);
      let path = '/dashboard'; 
      window.location.href = path;
    }
    catch(error) {
      console.error(error);
    }
  }

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      setUser(null);
    }
    catch(error){
      console.error(error);
    }
  }

  return(
    <div className={styles.CompLogin}>
      {
        user ? (
          <>
            {/* <p>Welcome, {user.displayName}! </p> */}
            <Button onClick={handleSignOut} className='mb-2' size='lg' variant="warning">SignOut</Button>{' '}
          </>
        ) : (
          <>
            {/* <p>Please Sign In: </p> */}
            <Button onClick={handleSignIn} className='mb-2' size='lg' variant="warning">Sign In with Google</Button>{' '}
          </>
        )
      }
    </div>
  )
};

CompLogin.propTypes = {};

CompLogin.defaultProps = {};

export default CompLogin;
