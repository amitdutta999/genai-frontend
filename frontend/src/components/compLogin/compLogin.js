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
import {auth, provider} from '../../FirestoneConfig';
import { signInWithPopup } from 'firebase/auth';
import AuthContext from '../../contexts/Auth-context';

const CompLogin = () => {
  const { activeUser } = useContext(AuthContext)
  
  const handleSignIn = () => {
    signInWithPopup(auth,provider).then((result) => {
      const response = result.user; 
      let path = '/dashboard'; 
      window.location.href = path;
    }).catch((err) => {
      console.log(err)
    })
  }

  return(
    <div className={styles.CompLogin}>
      <Button onClick={handleSignIn} className='mb-2' size='lg' variant="warning" style={{width: '100%'}}>Login</Button>
    </div>
  )
};

CompLogin.propTypes = {};

CompLogin.defaultProps = {};

export default CompLogin;
