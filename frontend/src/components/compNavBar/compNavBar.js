/* Copyright 2023 Google LLC. This software is provided as-is, without warranty
 or representation for any use or purpose. Your use of it is subject to your
 agreement with Google. */
 /*This code is not production ready */

import React, { useEffect, useLayoutEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../../contexts/Auth-context';
import PropTypes from 'prop-types';
import {Nav, Navbar,Container, Row, Col} from 'react-bootstrap';
import data from '../../Configuration/config.json';
import {auth, provider} from '../../FirestoneConfig';



const CompNavBar = () => {

  const { activeUser } = useContext(AuthContext)

  const getToken = async () => {
    var token = await activeUser.getIdToken();
    console.log(token);
  }

  const email = activeUser != null? activeUser.email : '';

  const displayName = activeUser != null? activeUser.displayName : '';

  useEffect(() =>{
    
  },[])

   return(
   <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <Row>
            <Col><img
               alt=""
               src={data["LogoPath"]}
               height="30"
               className="d-inline-block align-middle"
               />{' '}</Col>
          </Row>
          
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Welcome {displayName} | {email}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

CompNavBar.propTypes = {};

CompNavBar.defaultProps = {};

export default CompNavBar;
