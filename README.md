# Dependecies:

npm i -f

npm install @material-ui/core --save -f

npm install -f @mui/material @emotion/react @emotion/styled

npm install -f express mysql body-parser

npm install -f cors

npm install -f axios

npm install -f bcrypt

npm i react-router-dom --save

### Using:

Vscode

MySQL Workbench

MySQL Server 'Typical': https://dev.mysql.com/downloads/MysSQL

Install `NLIDBDump20231023.sql` using MySQL Workbench
GETTING THE REACT FRONTEND RUNNING (As of 10/23/2023):
Install Material-UI (MUI): `npm install -f @mui/material @emotion/react @emotion/styled` (Do not forget the -f)

GETTING DB INTEGRATION WORKING
Install body-parser middleware: `npm install -f express mysql body-parser` (note: I am unsure if I ever actually used this)
Install cors middleware: `npm install -f cors`
Make http requests: `npm install -f axios`
Hash passwords: `npm install -f bcrypt`
Assuming you have the database configured correctly, you are now able to start the servers

RUN SERVERS:
backend express.js server (for DB interaction): `node index.js`
Frontend React server: `npm.start`

## MySQL Workbench

//stat by choosing the database. Note sys is my Database.

//Also note that you will need to change the database configuration / in index.js server and dump files before starting the server

USE sys;

//type to view the USERs database for: role, email, firstname, lastname, and hashed password

select \* from user;

//Note when adding a new DB or dump file make sure to

DROP DATABASE IF EXISTS sys;

CREATE DATABASE IF NOT EXISTS sys;

USE sys;

//then can start the server with the following command:

node index.js

## To Start the project:

In the project directory, you can run:

cd NextLevel-Intramurals/nextlevel

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
