/* Copyright 2023 Google LLC. This software is provided as-is, without warranty
 or representation for any use or purpose. Your use of it is subject to your
 agreement with Google. */
 /*This code is not production ready */

import React from 'react';
import PropTypes from 'prop-types';
import data from '../../Configuration/config.json';
import { Container, Row, Col, Image } from 'react-bootstrap';
import CompChatForm from '../../components/compChatForm/compChatForm';

const CompChatBody = () => (
   <div >
        {/* Setting the background image */}
        <div
          style={{
            backgroundImage: "url('" + data["BackgroundImage"] + "')", 
            backgroundsize: 'cover',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '10vh',
            height: '100vh',
            width: '100%',
            position: 'relative',
          }}
        >
          <Container>
            <Row>
              <Col>
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: '20px',
                    borderRadius: '20px',
                    marginTop: '100px', 
                  }}
                >
                  <CompChatForm />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    </div>
);

CompChatBody.propTypes = {};

CompChatBody.defaultProps = {};

export default CompChatBody;
