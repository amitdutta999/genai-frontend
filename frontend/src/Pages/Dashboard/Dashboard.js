/* Copyright 2023 Google LLC. This software is provided as-is, without warranty
 or representation for any use or purpose. Your use of it is subject to your
 agreement with Google. */
 /*This code is not production ready */

import React from 'react';
import { Container, Row } from 'react-bootstrap';
import CompDashboard from '../../components/compDashboard/compDashboard';



const HomePage = () => {
    return (
        <div style={{position: 'fixed', top: '0', bottom: '0', left: '0', right: '0', background: 'white'}}>
            <Container fluid style={{ height: '100%', width: '100%' }}>
                <Row style={{ height: '100%', width: '100%' }}>
                    <CompDashboard />
                </Row>
            </Container>
        </div>
    );
}

export default HomePage