/* Copyright 2023 Google LLC. This software is provided as-is, without warranty
 or representation for any use or purpose. Your use of it is subject to your
 agreement with Google. */
 /*This code is not production ready */

import React from 'react';
import PropTypes from 'prop-types';
import { 
   Container, 
   Row, 
   Col, 
   Nav, 
   Navbar,
   Button
 } from 'react-bootstrap'; 
import data from '../../Configuration/config.json';
import CompLogin from '../compLogin/compLogin';
import bg from './bg.jpeg';
import bg_1 from './bg_1.jpeg';
import './compWelcome.module.css';

 const handleOnClickEvent = () => {
   let path = '/dashboard'; 
   window.location.href = path;
}

const CompWelcome = () => (
  
  
   <Container fluid>
    
    <Navbar className="bg-body-tertiary" >
      {/* <Container> */}
          <Navbar.Brand href="/" className="ms-5" style={{width: '100%', marginLeft: '0', marginRight: '0' }}>
            <Row>
              <Col><img
                alt=""
                src={data["LogoPath"]}
                height="60"
                className="d-inline-block align-middle"
                />{' '}</Col>
            </Row>
          </Navbar.Brand>
    </Navbar>

    <Row className='align-items-center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Col xs={12} sm={14} md={6} lg={6}>
        <div style={{
          margin: '20% 0% 0% 0%',
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
          maxWidth: '95%', 
          height: 'auto',
        }}>
            <hr />
            <h2 style={{fontWeight: 'Roboto', fontSize: 'calc(1em + 1.5vw)', color: '#333333', textAlign:'center'}}>{data["Welcome"]}</h2>
            <br />
            {/* <p style={{fontWeight: 'bold', fontSize: 'calc(0.5em + 0.7vw)', color: '#333333' }}>{data["CompanyInformation"]}</p> */}
            <br />
            <br />
            <Row className='align-items-center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CompLogin/>
            </Row>
            <br />
        </div>
    </Col>
</Row>
  </Container>   
);

CompWelcome.propTypes = {};

CompWelcome.defaultProps = {};

export default CompWelcome;
