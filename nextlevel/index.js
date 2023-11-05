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
  database: 'sys'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Define a POST endpoint to handle user registration
app.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

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
      role: 1
    }, (err, results) => {
      if (err) throw err;
      res.send('User registered successfully.');
    });
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

//For Admin Dashboard
app.get('/users', (req, res) => {
  connection.query('SELECT firstName, lastName, email FROM user', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
