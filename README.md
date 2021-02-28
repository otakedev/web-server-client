# Projet Web : Server and Client Side

This is a web interface to get information about Covid in France.
The project uses ReactJs for the client part and NestJs for the server part.

# Team members

 *David Bisegna* : david.bisegna@etu.univ-cotedazur.fr

 *Yan Conigliaro* : yan.conigliaro@etu.univ-cotedazur.fr

 *Ruben Houri* : ruben.houri@etu.univ-cotedazur.fr

 *Jason Haenlin* : jason.haenlin@etu.univ-cotedazur.fr

# Requirement

To launch the project in its entirety you will need :

 - [NodeJS and NPM](https://nodejs.org/fr/download/)
 - [Docker](https://www.docker.com/)
 - [Postman](https://www.postman.com/)
 - **[Optional]** [ReactJS](https://fr.reactjs.org/)
 - **[Optional]** [NestJS](https://nestjs.com/)
 - **[Optional]** [Compass](https://www.mongodb.com/products/compass)

# Launch the Client Side

Go to the folder **/client/web-client/** and run the following commands :

To run localy, you need to create en **.env.development** file in the directory **/client/web-client/env**. You can duplicate the **.env.development.example**

```sh
npm install
npm start
```

# Launch the Server Side

Go to the folder **/server/nestjs-server/** and run the following commands :

Make sure to have an **.env** file following the **.env.example**
If you need to launch the application, you can send us a private message on Slack or by mail

```sh
cd /server/nestjs-server/
npm install
# use the next command to start a docker container with MongoDB
# otherwise, you can install or use MongoDB from your computer
npm run database
npm start
```

# Launch with Docker

If you have docker and docker-compose on your machine, you can directly run

Make sure to have an **.env** file following the **.env.example** in the same directory has the *docker-compose.yml*

If you need to run the docker-compose, you can send us a private message on Slack or by mail

```sh
# build and start the containers
sh docker-deploy.sh
# stop and remove the containers
sh docker-stop.sh
```

# Access online

The app is deployed on a VPS, you can access the application on
[OTAKE!](http://site1.otakedev.com)
# Add Data

## Using Newman CLI

You can seed the database with the following command

```sh
# to run from /server/nestjs-server/
# the command will post a file on the server containing covid-19 data from data.gouv
npm run seed
```
## Using Postman GUI

[ Download Data ](https://www.data.gouv.fr/fr/datasets/r/ad09241e-52fa-4be8-8298-e5760b43cae2)

- Launch Postman and create a new **POST** query on the URL : http://localhost:3000/incidences
In the Body section , check form-data  and add a key named "**file**".
**Don't forget to specify that the key takes file type data**
- Add the csv of the previously downloaded data and launch the query.

You can check that everything went well on Compass

# TASKS

## Ruben Houri

| id  | tasks                                                                              |
| --- | ---------------------------------------------------------------------------------- |
| #1  | Initialization of NestJs with Mongoose for MongoDB                                 |
| #14 | Display the number of people hospitalized live via an API ( Refresh Rate : 1 min ) |
| #15 | Filter via user geolocation                                                        |

## David Bisegna

| id  | tasks                                                                    |
| --- | ------------------------------------------------------------------------ |
| #2  | Added datamodel in backend + route to fill database from a CSV file      |
| #10 | Created table in the UI to see datas in a grid                           |
| #13 | Added ability to choose color themes and activate or not black theme     |
| #26 | Create authentication so that user can't access website if not connected |

## Yan Canigliaro

| id  | tasks                                                            |
| --- | ---------------------------------------------------------------- |
| #7  | See the incidence rate of the epidemic (backend part)            |
| #12 | Data filters by age group, start date and end date               |
| #19 | Contact form with e-mail sending                                 |
| #38 | A bug fix where the graph displayed several times the same dates |
## Jason Haenlin

| id       | tasks                                                                   |
| -------- | ----------------------------------------------------------------------- |
| #3       | Add OpenApi3 (swagger) to generate the doc                              |
| #4       | Initialization of the React project                                     |
| #5       | Add OpenApi3 on React to generate the REST contract from the backend    |
| #11      | Implement a heatmap of incidence rate by department                     |
| #17      | Add circular spinner when data is loading on the requests               |
| #25      | Make the website more responsive (appbar for mobile and better graphes) |
| #20, #35 | Add a CI (Jenkins) and Docker to build and deploy the applications      |
