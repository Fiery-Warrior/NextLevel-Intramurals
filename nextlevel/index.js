const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL configuration and connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'NLIDB'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Define a POST endpoint to handle user registration
app.post('/register', (req, res) => {
  const { firstName, lastName, email, password, sex, stuID } = req.body;
  const sexVal = sex === 'male' ? 'M' : 'F'; //sets the sex to M or F

  // Hash the password
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('An error occurred while hashing the password.');
    }

    // Insert the user data into the database with the hashed password
    connection.query('INSERT INTO user SET ?', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      sex: sexVal,
      stuID: stuID,
      role: 1
    }, (err, results) => {
      if (err) throw err;
      res.send('User registered successfully.');
    });
  });
});

// Define a POST endpoint to handle login
app.post('/adminlogin', (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) throw err;
        
        if (isMatch) {
          console.log('User authenticated successfully');
          res.send('User authenticated successfully.');
        } else {
          console.log('Invalid email or password');
          res.status(401).send('Invalid email or password.');
        }
      });
    } else {
      console.log('Invalid email or password');
      res.status(401).send('Invalid email or password.');
    }
  });
});

app.post('/admin-login', (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) throw err;
        
        if (isMatch) {
          // Check if user has admin role (3 or 4)
          const userRole = results[0].role;
          if (userRole === 3 || userRole === 4) {
            console.log('Admin authenticated successfully');
            res.send('Admin authenticated successfully.');
          } else {
            console.log('Unauthorized access');
            res.status(403).send('Unauthorized access');
          }
        } else {
          console.log('Invalid email or password');
          res.status(401).send('Invalid email or password.');
        }
      });
    } else {
      console.log('Invalid email or password');
      res.status(401).send('Invalid email or password.');
    }
  });
});


// Define a POST endpoint to handle login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) throw err;
        
        if (isMatch) {
          // Check if user has admin role (3 or 4)
          //Do we need to prohibit admins from signing in to the normal login page? If not, then the entire if else chain needs to be replaced with res.send('Player authenticated successfully.');
          
          //from here
          
          const userRole = results[0].role;
          if (userRole === 1) {
            console.log('Player authenticated successfully');
            res.send('Player authenticated successfully.');
          } else if (userRole === 2) {
            console.log('Captain authenticated successfully');
            res.send('Captain authenticated successfully.');
          
          } else {
            console.log('Unauthorized access');
            res.status(403).send('Unauthorized access');
          }
          
         //to here

        } else {
          console.log('Invalid email or password');
          res.status(401).send('Invalid email or password.');
        }
      });
    } else {
      console.log('Invalid email or password');
      res.status(401).send('Invalid email or password.');
    }
  });
});

// Define a POST endpoint to handle user registration
app.post('/reset', (req, res) => {
  const { email, stuID, password } = req.body;

  // TODO Write code to send an email verification or something like that
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send('An error occurred. Please try again later.');
    }
    connection.query('UPDATE user SET password = ? WHERE stuID = ? AND email = ?', 
      [hashedPassword, stuID, email], (err, results) => {
        if (err) {
          console.error(err); 
          return res.status(500).send('An error occurred. Please try again later.');
        }
        if (results.affectedRows === 0) {
          return res.status(404).send('User not found.');
        }
        res.send('Password Reset Successfully');
      }
    );
  });
});


//For Admin Dashboard
app.get('/admindash', (req, res) => {
  connection.query('SELECT firstName, lastName, email FROM user', (err, results) => {
    if (err) throw err;
    res.json(results);
    console.log(results);

  });
});


// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});