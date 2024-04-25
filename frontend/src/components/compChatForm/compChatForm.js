/* Copyright 2023 Google LLC. This software is provided as-is, without warranty
 or representation for any use or purpose. Your use of it is subject to your
 agreement with Google. */
 /*This code is not production ready */

import React, { useState , useEffect} from 'react';
import PropTypes from 'prop-types';
import {
   Form,
   Container,
   Row,
   Col,
   Button
} from 'react-bootstrap';

const CompChatForm = () => {

   const [data, setData] = useState([]);
   const [query, setQuery] = useState('');
   const getResponseFromAPI = async () => {
      const query = document.getElementById('genaiui-query').value;
      try {
         const response =  await fetch(`https://cooper-backend-9-tromxovfea-uc.a.run.app?query=${query}`, {
            method: 'GET',  
            headers: {
               'Content-Type': 'application/json',
            }
         });
         const responseData =  await response.json();
         setData(JSON.parse(responseData));
      } catch (error) {
         console.error('Error', error)
      }
      };
   const resetMemory = async () => {
      try {
         const response =  await fetch(`https://cooper-backend-9-tromxovfea-uc.a.run.app?reset=True&query=none`, {
            method: 'GET', 
            headers: {
               'Content-Type': 'application/json',
            }
         });
      } catch (error) {
         console.error('Error', error)
      } 
   };

const getFormattedResponse = () => {

   if ((!data['Reference_Documents'])) {
      return '' 
   }
 
   const answer = data['Answer'] ? `${data['Answer']}\n`: '';
   return `${answer}`;
};


function replaceString(url)
{ 
  const file_name =  String(url.split('#')[0].split('/').pop())
  const replace_file_name = String(file_name).replace(/%20/g,' ')
  return replace_file_name
}

const handleClear = () => {
   setQuery('');
   setData([ ]);
};

const handleReset = () => {
   setQuery('');
   setData([ ]);
   resetMemory();
};

const handleEnter = (e) => {
   if(e.key === 'Enter') {
      e.preventDefault()
      getResponseFromAPI();
      setQuery(e.target.value);
   }
 }

 const handleResponses = () => {
   const strings = ["I don't know", "I can't determine", "I cannot determine", "I can not determine", "I am an intelligent assistant", "I am doing well", "Thank you"];
   var flag = true
   strings.map(strr => {
      console.log('stringg', strr)
      if (data['Answer'].includes(strr)) {
         flag = false
      }
   })
   console.log('flag', flag)
   return flag
 }

 return (
   <Container fluid>
      <Row>
      <Form>
         <Form.Group className="mb-3" controlId="genaiui-query">
         <Form.Label> Question: </Form.Label>
         <Form.Control type="text" 
                        row={2}
                        placeholder={"Ask a question"}  
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleEnter}
                        />
         </Form.Group>
         <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Response:</Form.Label>
            <Form.Control as="textarea" 
                        rows={Math.min(Math.max(getFormattedResponse().length/50, 4), 20)} 
                        placeholder={""}  
                        value={getFormattedResponse()} 
                        readOnly
                        />
            <div>
               <p>References:</p>
               {data['Reference_Documents'] && (handleResponses()) &&
               String(data['Reference_Documents']).split('\n\n').map((url, index) => (
                  <p key={index}>
                     <a href={url} target="_blank" rel="noopener noreferrer">
                           {replaceString(url)}
                     </a>
                  </p>
               ))}
            </div>
         </Form.Group>
      </Form>
      <Row>
            <Col>
               <Button variant='warning' onClick={getResponseFromAPI} style={{width: '100%'}}>
               Ask
               </Button>
            </Col>
            <Col>
            <Button variant='warning' onClick={handleClear} style={{width: '100%'}}>
            Ask a follow-up question
            </Button>
            </Col>
            <Col>
            <Button variant='warning' onClick={handleReset} style={{width: '100%'}}>
            Ask a new question
            </Button>
            </Col>
      </Row>
      </Row>
   </Container>
   );
};

export default CompChatForm;
