# Hey gang. It's ya boi asher. I am riding the high of getting authentication to work so here are some steps you need to get this running on your machine.
Make sure you have both MySQL Workbench **AND** MySql server installed and running on your machine.   
CONFIGURING THE SERVER:  
    Install `NLIDBDump20231023.sql` using MySQL Workbench  
        Workbench: https://dev.mysql.com/downloads/workbench/  
        Server: https://dev.mysql.com/downloads/mysql/  
    In MySql Workbench, create and connect to a localhost connection. If you do not set the password as 'password' you will need to edit some of the backend code.  
    After opening the server connection, click "schemas" towards the bottom left hand corner of the window.  
    Right click the schema you would like to load the db tables into. In the code, it is called 'NLIDB', but by default, it is called 'sys'  
    Go to 'Server>Data Import' and select "Import from self contained file"   
    Select the "Import Progress" tab and select "Start Import"   
    Open the "Query 1" tab (not in the ribbon, but above the main window) and execute the following queries:  
        ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'your_password';  
        FLUSH PRIVILEGES;  
    Replace "your_password" with the password you used when configuring the server and press the lightning bolt icon to run these queries.  
    Open windows services (enter "services" into the windows search bar) and restart the MySql service.  
    In nextlevel>index.js change the "password" and "database" fields to accurately reflect your password and database scheme name  
    
GETTING THE REACT FRONTEND RUNNING (As of 10/23/2023):  
    Install Material-UI (MUI): `npm install -f @mui/material @emotion/react @emotion/styled` (Do not forget the -f)  
  
GETTING DB INTEGRATION WORKING   
    Install body-parser middleware: `npm install -f express mysql body-parser` (note: I am unsure if I ever actually used this)  
    Install cors middleware: `npm install -f cors`  
    Make http requests: `npm install -f axios`  
    Hash passwords: `npm install -f bcrypt`  
    Assuming you have the database configured correctly, you are now able to start the servers  
  
RUN SERVERS (IT DOES NOT MATTER WHICH ORDER THEY RUN IN):  
backend express.js server (for DB interaction): `node index.js`  
Frontend React server: `npm.start`  

Extra notes:  
    When creating a new user for testing, remember or write down their password. You will not be able to retrive this value after setting it the first time.  
  

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
