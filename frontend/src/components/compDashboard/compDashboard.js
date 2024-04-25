/* Copyright 2023 Google LLC. This software is provided as-is, without warranty
 or representation for any use or purpose. Your use of it is subject to your
 agreement with Google. */
 /*This code is not production ready */

import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import {Container, Row} from 'react-bootstrap'
import CompNavBar from '../compNavBar/compNavBar';
import data from '../../Configuration/config.json';
import CompChatBody from '../compChatBody/compChatBody';
import { signInWithPopup } from 'firebase/auth';
import AuthContext from '../../contexts/Auth-context';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

const CompDashboard = () => {
   const { activeUser } = useContext(AuthContext)

   const email = activeUser != null? activeUser.email : '';
 
   const displayName = activeUser != null? activeUser.displayName : '';

   const [show, setShow] = useState(true);

   const handleClose = () => {
      setShow(false)
      let path = '/';
      window.location.href = path;
   };
   const handleShow = () => setShow(true);


   return (
   
   activeUser != null? 
   <Container>
      <Row>
         <CompNavBar />
      </Row>
      <Row > 
         <CompChatBody />
      </Row>
   </Container> : 
   <>
   <Modal show={show} onHide={handleClose}>
         <Modal.Header closeButton>
         <Modal.Title>Oops! Something went wrong.</Modal.Title>
         </Modal.Header>
         <Modal.Body><p>Looks like something is not right. Can you please login again?</p></Modal.Body>
         <Modal.Footer>
         <Button variant="secondary" onClick={handleClose}>
            Close
         </Button>
         </Modal.Footer>
      </Modal></>
   )};

CompDashboard.propTypes = {};

CompDashboard.defaultProps = {};

export default CompDashboard;
