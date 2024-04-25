/* Copyright 2023 Google LLC. This software is provided as-is, without warranty
 or representation for any use or purpose. Your use of it is subject to your
 agreement with Google. */
 /*This code is not production ready */

import React from 'react';
import { Container, Row, Table, Form, Button } from 'react-bootstrap';
import CompDashboard from '../../components/compDashboard/compDashboard';
import CompNavBar from '../../components/compNavBar/compNavBar';
import data from '../../Configuration/config.json';
import AuthContext from '../../contexts/Auth-context';
import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';


const HandleOnClickEvent = () => {
    alert('Now saving to file')
}



const Admin = () => {
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
        <div style={{background: 'white'}}>
            <Container>
                <Row>
                    <CompNavBar />
                </Row>
                <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>LogoPath</td>
                        <td> <Form.Control type="text" id="companyLogo" defaultValue={data["LogoPath"]}  /></td>
                        </tr>
                        <tr>
                        <td>CompanyName</td>
                        <td> <Form.Control type="text" id="companyName" defaultValue={data["CompanyName"]}  /></td>
                        </tr>
                        <tr>
                        <td>CompanyInformation</td>
                        <td> <Form.Control type="textarea" rows={3} multiple={true} id="companyInformation" defaultValue={data["CompanyInformation"]}  /></td>
                        </tr>
                        <tr>
                        <td>BackgroundImage</td>
                        <td> <Form.Control type="text" id="companyBackgroundImage" defaultValue={data["BackgroundImage"]}  /></td>
                        </tr>
                    </tbody>
                </Table>
                </Row>
                <Row>
                    <Button variant='warning' size='lg' onClick={HandleOnClickEvent}>Save</Button>
                </Row>
            </Container>
        </div>
        :
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
    );
}

export default Admin