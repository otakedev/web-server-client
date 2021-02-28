# Projet Web : Server and Client Side

This is a web interface to get information about Covid in France. 
The project uses ReactJs for the client part and NestJs for the server part. 

# Requirement

To launch the project in its entirety you will need :  

 - [NodeJS and NPM](https://nodejs.org/fr/download/)
 - [ReactJS](https://fr.reactjs.org/)
 - [NestJS](https://nestjs.com/)
 - [Docker](https://www.docker.com/)
 - [Postman](https://www.postman.com/)
 - **[Optional]** [Compass](https://www.mongodb.com/products/compass)

# Launch the Client Side

Go to folder "/client/web-client/ " and run the following commands :

 1. **npm install**
 2. **npm start**

# Launch the Server Side

Go to folder "/server/nestjs-server/ " and run the following commands :

 1. **npm install**
 2. **npm run database**
 3. **npm start**

# Add Data

[ Download Data ](https://www.data.gouv.fr/fr/datasets/r/ad09241e-52fa-4be8-8298-e5760b43cae2)

- Launch Postman and create a new **POST** query on the URL : http://localhost:3000/incidences
In the Body section , check form-data  and add a key named "**file**". 
**Don't forget to specify that the key takes file type data**
- Add the csv of the previously downloaded data and launch the query.

You can check that everything went well on Compass
