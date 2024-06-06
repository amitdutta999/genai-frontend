/* Copyright 2023 Google LLC. This software is provided as-is, without warranty
 or representation for any use or purpose. Your use of it is subject to your
 agreement with Google. */
/*This code is not production ready */

import React, { useState, useEffect } from 'react';
import {
   Form,
   Container,
   Row,
   Col,
   Button
} from 'react-bootstrap';


const CompChatForm = () => {
   const [query, setQuery] = useState('');
   const [accessToken, setAccessToken] = useState('');

   const [summary, setSummary] = useState('');
   const [content, setContent] = useState('');

   const [results, setResults] = useState([]);
   const [references, setReferences] = useState([]);

   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const getAccessToken = async () => {
         const url = 'http://35.247.27.221:3000/getAccessToken';
         try {
            const response = await fetch(url);
            if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
            }
            const token = await response.text();
            setAccessToken(token);
         } catch (error) {
            console.error('Error:', error);
         }
      };
      getAccessToken();
   }, []);

   useEffect(() => {
      fillReferences();
   }, [results]);



   const getResponseFromAPI = async () => {


      const url1 = 'https://discoveryengine.googleapis.com/v1alpha/projects/549733735963/locations/global/collections/default_collection/dataStores/doit-search-ocr-native/servingConfigs/default_search:search';

      const url2 = 'https://us-central1-aiplatform.googleapis.com/v1/projects/doit-poc-421417/locations/us-central1/publishers/google/models/medlm-large:predict'

      const requestBody1 = {
         query: query,
         pageSize: 5,
         queryExpansionSpec: { condition: "AUTO" },
         spellCorrectionSpec: { mode: "AUTO" },
         contentSearchSpec: {
            summarySpec: {
               summaryResultCount: 5,
               modelSpec: { version: "text-bison@002/answer_gen/v1" },
               ignoreAdversarialQuery: true,
               includeCitations: true,
            },
            snippetSpec: { returnSnippet: true },
            extractiveContentSpec: { maxExtractiveAnswerCount: 1 },
         },
      };

      const requestBody2 = {
         instances: [{ content: query }],
         parameters: {
            candidateCount: 1,
            maxOutputTokens: 500,
            temperature: 0.2,
            topP: 0.8,
            topK: 40,
         },
      };

      try {
         setLoading(true);
         const response = await fetch(url1, {
            method: "POST",
            headers: {
               "Authorization": `Bearer ${accessToken}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody1),
         });

         const dataResponse = await response.json();
         setSummary(dataResponse.summary.summaryText);
         setResults(dataResponse.results);
      } catch (error) {
         console.error('Error:', error);
         alert('Token might have expired. Please refresh the page to get a new token.')
      } finally {
         setLoading(false);
      }

      try {
         setLoading(true);
         const response = await fetch(url2, {
            method: "POST",
            headers: {
               Authorization: `Bearer ${accessToken}`,
               "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody2),
         });

         const dataResponse = await response.json();
         setContent(dataResponse.predictions[0].content);
         console.log('Data response', dataResponse);
      } catch (error) {
         console.error('Error:', error);
         alert('Token might have expired. Please refresh the page to get a new token.')
      } finally {
         setLoading(false);
      }

   };

   const fillReferences = () => {
      setReferences(prevReferences => [
         ...prevReferences,
         ...results.map(result => {
            return {
               title: result.document.derivedStructData.title,
               link: result.document.derivedStructData.link,
               snippet: result.document.derivedStructData.extractive_answers[0].content,
               pageNumber: result.document.derivedStructData.extractive_answers[0].pageNumber
            }
         })
      ]);
   }

   const getFormattedResponse1 = () => {
      if (!summary) {
         return ''
      }
      const answer = summary ? `${summary}\n` : '';
      return `${answer}`;
   };

   const getFormattedResponse2 = () => {
      if (!content) {
         return ''
      }
      const answer = content ? `${content}\n` : '';
      return `${answer}`;
   };

   const handleReset = () => {
      setQuery('');
      setSummary('');
      setContent('');
      setResults([]);
      setReferences([]);
   };

   const handleEnter = (e) => {
      if (e.key === 'Enter') {
         e.preventDefault()
         getResponseFromAPI();
         setQuery(e.target.value);
      }
   }

   if (loading) {
      return <div>Loading...</div>;
   }

   return (
      <div style={{ height: '75vh', overflowY: 'scroll' }}>
         <Container fluid style={{ height: '100%', overflowY: 'scroll' }}>
            <Row style={{ height: '100%' }}>
               <Form style={{ width: '100%' }}>
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
                     <Form.Label>Response from Vertex AI Search:</Form.Label>
                     <Form.Control as="textarea"
                        rows={Math.min(Math.max(getFormattedResponse1().length / 50, 4), 20)}
                        placeholder={""}
                        value={getFormattedResponse1()}
                        readOnly
                     />
                     <Form.Label>Response from MedLM:</Form.Label>
                     <Form.Control as="textarea"
                        rows={Math.min(Math.max(getFormattedResponse2().length / 50, 4), 20)}
                        placeholder={""}
                        value={getFormattedResponse2()}
                        readOnly
                     />
                     <div style={{ overflowY: 'scroll' }}>
                        <p>References from Vertex AI Search:</p>
                        {
                           references.map((doc, index) => {
                              const removedPrefix = doc.link.replace("gs://", "");
                              const prefixedLink = "https://storage.cloud.google.com/" + removedPrefix;
                              const authLink = prefixedLink.replace(/ /g, "%20");
                              return (
                                 <div key={index}>
                                    <h5>{doc.title}</h5>
                                    <a href={authLink} target="_blank" rel="noreferrer">
                                       {doc.link}
                                    </a>
                                    <p>{doc.snippet}</p>
                                    <h6>Page - {doc.pageNumber}</h6>
                                    <br />
                                 </div>
                              )
                           })
                        }
                     </div>
                  </Form.Group>
               </Form>
               <Row>
                  <Col>
                     <Button variant='warning' onClick={getResponseFromAPI} style={{ width: '100%' }}>
                        Ask
                     </Button>
                  </Col>
                  <Col>
                     <Button variant='warning' onClick={handleReset} style={{ width: '100%' }}>
                        Reset
                     </Button>
                  </Col>
               </Row>
            </Row>
         </Container>
      </div >
   );
};

export default CompChatForm;
