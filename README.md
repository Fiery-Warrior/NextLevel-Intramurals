
# Project Setup

This project uses a variety of dependencies to ensure smooth development and operation. Here's a brief overview of each one:

- `npm i -f`: This command forcefully installs the dependencies listed in your `package.json` file.
- `@material-ui/core`: A popular React UI framework for faster and easier web development.
- `keep-react`: Styling
- `@mui/material @emotion/react @emotion/styled`: MUI is a Material Design UI library for React, and Emotion is a performant and flexible CSS-in-JS library.
- `express mysql body-parser`: Express is a minimal and flexible Node.js web application framework. MySQL is a node.js driver for mysql. Body-parser extract the entire body portion of an incoming request stream and exposes it on `req.body`.
- `cors`: This package is used to enable CORS with various options.
- `axios`: Promise based HTTP client for the browser and node.js.
- `bcrypt`: A library to help you hash passwords.
- `react-router-dom`: DOM bindings for React Router.

## Tools Used

- Visual Studio Code: 
- MySQL Workbench: 
- MySQL Server: 

## Database Setup

Download and install MySQL Server from [here](https://dev.mysql.com/downloads/MysSQL). Then, use MySQL Workbench to install the `sysDump20231023.sql` file.

## Getting the React Frontend Running

Install Material-UI (MUI) with the following command:

```bash
npm install -f @mui/material @emotion/react @emotion/styled
```

## Getting DB Integration Working
Install the necessary middleware and libraries with the following commands:

```bash
npm install -f express mysql body-parser
npm install -f cors
npm install -f axios
npm install -f bcrypt
```


## Running the Servers
Start the backend Express.js server for DB interaction with node index.js, and the frontend React server with npm start.

## MySQL Workbench Setup
Start by choosing the database (note: sys is my Database). You will need to change the database configuration in the index.js server and dump files before starting the server.

```bash
USE sys;
SELECT * FROM user;
```

When adding a new DB or dump file, make sure to:

```bash
DROP DATABASE IF EXISTS sys;
CREATE DATABASE IF NOT EXISTS sys;
USE sys;
```


Then, you can start the server with node index.js.

## Starting the Project
In the project directory, run:

```bash
cd NextLevel-Intramurals/nextlevel
npm start
```

This runs the app in development mode. Open http://localhost:3000 to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.


## VS Code Port Forwarding

This runs the app in development mode. Open http://localhost:3000 to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

VS Code Port Forwarding
Visual Studio Code has a feature called 'Port Forwarding' that allows the development server to be accessed from other devices on the same network. This is particularly useful when working with databases, as it allows the database to be accessed from the same port across multiple devices.# Dependecies:

```bash
npm i -f

npm install @material-ui/core --save -f

npm i keep-react -f

npm install -f @mui/material @emotion/react @emotion/styled

npm install -f express mysql body-parser

npm install -f cors

npm install -f axios

npm install -f bcrypt

npm i react-router-dom --save
```

### Using:

Vscode

MySQL Workbench

MySQL Server 'Typical': https://dev.mysql.com/downloads/MysSQL

Install `sysDump20231023.sql` using MySQL Workbench
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
