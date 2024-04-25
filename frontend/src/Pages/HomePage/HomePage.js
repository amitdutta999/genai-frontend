/* Copyright 2023 Google LLC. This software is provided as-is, without warranty
 or representation for any use or purpose. Your use of it is subject to your
 agreement with Google. */
 /*This code is not production ready */

import React from 'react';
import './HomePage-Style.css';
import CompWelcome from '../../components/compWelcome/compWelcome';
import { Container, Row } from 'react-bootstrap';



const HomePage = () => {
    return (
    <Container fluid className='background'>
        <Row>
            <CompWelcome />

        </Row>
    </Container>
    );
}

export default HomePage