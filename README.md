## How to run the web application:

### General prerequisites:
1. Make sure you have access to the GCP project - genai-poc-398814
2. Enable the Cloud Storage API and Vertex AI API.
3. Create an App on [Vertex AI Search & Conversation](https://pantheon.corp.google.com/gen-app-builder/engines/create?project=genai-poc-398814), provide source as your GCS bucket and connect an available datastore or create one. This will import the documents from the GCS bucket and store the embeddings into the datatore. Update the config.py file with the datastore_id, datastore_location and datastore_namespace.

### Backend prerequisites:
1. Update the backend/config.py with the project parameters. Add any other parameters(s) if required.
2. Navigate to /backend directory and run 'python3 cooper_endpoint.py' file for initially running and exposing the backend application to an endpoint. Make sure to keep this running for the UI to return correct results.
3. Visit the webpage exposed, initially you will see 'Internal Server Error' as there is not query received from UI. 

### Frontend prerequisites:
1. Make sure your email-id has access to the GCP project. 
2. Navigate to /frontend directory and run 'npm start'. If you face error that says "npm not found" then run 'npm  install'.
3. This will start the UI on your localhost.
4. If you are using localhost you need to authorize the domain in Firebase server. Follow Step 2 in Firebase configuration.
5. Write a query and hit 'Ask' or press 'enter' key, you will receive a response and link to the reference documents.

#### Firebase configuration :

STEP 1: Registering the web app
1. Login to Firebase console with the email-id that has access to the GCP project.Choose the GCP project and create a web-app. Register the app and copy the Firebase SDK credentials you get after registering. Now go to the "FirestoneConfig.js" file in the "frontend" folder and add those credentials there. Now your frontend would be making a call to the Firebase server.

STEP 2: Adding your domain to the authorized domains
2. Go to Firebase console.Navigate to Settings and then to Authorized Domains and add the domain of the app there.
3. Now you should be able to able to authenticate via Firebase server.