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
  connection.query('SELECT u.firstName, u.lastName, u.role, u.email, u.stuID, u.sex, t.TeamName, s.sportName FROM user u LEFT JOIN team t ON u.teamID = t.teamID LEFT JOIN sport s ON t.sport_idSport = s.idSport', (err, results) => {
    if (err) throw err;
    res.json(results);
    console.log(results);
  
  });

  

  //Users sport and user team data will also be displayed here
});

app.delete('/deleteUser/:stuID', (req, res) => {
  const stuID = req.params.stuID;
  connection.query('DELETE FROM user WHERE stuID = ?', [stuID], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting the user');
    } else {
      console.log(results);
      res.status(200).send('User deleted successfully');
    }
  });
});

app.get('/api/teams', (req, res) => {
  connection.query('SELECT TeamName FROM team', (err, results) => {
      if (err) {
          return res.status(500).send('Error fetching teams');
      }
      res.json(results.map(team => team.TeamName));
  });
});

//Big bertha endpoint. It runs a lot of queries at once to update a captain. It can probably be changed to achieve all of this in much fewer queries but it is 1:00 AM and I don't want to think about this any more. Mess with at your own risk.
app.post('/updateCaptain', (req, res) => {
  const { userId, teamName } = req.body;

  // Query to get the current captain's ID
  const getCurrentCaptainQuery = 'SELECT Captain FROM team WHERE TeamName = ?';

  // Queries to update roles
  const updateOldCaptainRoleQuery = 'UPDATE user SET role = 1 WHERE stuID = ?';
  const updateUserRoleQuery = 'UPDATE user SET role = 2 WHERE stuID = ?';
  
  // Query to update the team captain
  const updateCaptainQuery = 'UPDATE team SET Captain = ? WHERE TeamName = ?';
  const getTeamIdQuery = 'SELECT teamID FROM team WHERE TeamName = ?';
  const updateTeamIdQuery = 'UPDATE user SET teamID = ? WHERE stuID = ?';
  // Start a transaction
  connection.beginTransaction((err) => {
      if (err) {
          console.error('Transaction start error:', err);
          return res.status(500).send('Failed to update captain');
      }

      // Query to get the teamID for the given teamName
      
      connection.query(getTeamIdQuery, [teamName], (err, results) => {
        if (err || results.length === 0) {
          return connection.rollback(() => {
              console.error('Error finding current teamID:', err);
              res.status(500).send('Failed to find current teamID');
          });
        }
        const teamId = results[0].teamID;
        console.log(teamId);

        // Get the current captain's ID
        connection.query(getCurrentCaptainQuery, [teamName], (err, results) => {
            if (err || results.length === 0) {
                return connection.rollback(() => {
                    console.error('Error finding current captain:', err);
                    res.status(500).send('Failed to find current captain');
                });
            }

            const currentCaptainId = results[0].Captain;
            // Update the old captain's role
            connection.query(updateOldCaptainRoleQuery, [currentCaptainId], (err, results) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('Error updating old captain role:', err);
                        res.status(500).send('Failed to update old captain role');
                    });
                }

                // Update the team captain
                connection.query(updateCaptainQuery, [userId, teamName], (err, results) => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error('Error updating captain:', err);
                            res.status(500).send('Failed to update captain');
                        });
                    }

                    // Update the new captain's role
                    connection.query(updateUserRoleQuery, [userId], (err, results) => {
                        if (err) {
                            return connection.rollback(() => {
                                console.error('Error updating new captain role:', err);
                                res.status(500).send('Failed to update new captain role');
                            });
                        }

                          connection.query(updateTeamIdQuery, [teamId, userId], (err, results) => {
                            if (err) {
                              return connection.rollback(() => {
                                console.error('Error updating new captain team:', err);
                                res.status(500).send('Failed to update new captain role');
                            });
                            }

                          // Commit the transaction
                          connection.commit((err) => {
                              if (err) {
                                  return connection.rollback(() => {
                                      console.error('Error committing transaction:', err);
                                      res.status(500).send('Failed to update captain and roles');
                                  });
                              }

                              res.status(200).send('Captain and roles updated successfully');
                            });
                        });
                      });
                  });
              });
          });
      });
  });
});



//For User Profile
app.get('/userprofile/:email', (req, res) => {
  const userEmail = req.params.email;
  connection.query('SELECT u.firstName, u.lastName, u.role, u.email, u.stuID, u.sex, t.TeamName, s.sportName FROM user u LEFT JOIN team t ON u.teamID = t.teamID LEFT JOIN sport s ON t.sport_idSport = s.idSport WHERE u.email = ?', [userEmail], (err, results) => {
    if (err) throw err;
    res.json(results);
    console.log(results);
  });
});







// app.get('/roster/:teamID', (req, res) => {
//   const teamID = req.params.teamID;
//   connection.query('SELECT u.firstName, u.lastName FROM user u WHERE u.teamID = ?', [teamID], (err, results) => {
//     if (err) throw err;
//     res.json(results);
//     console.log(results);
//     console.log(teamID);
//   });
// });





app.get('/team/:teamName', (req, res) => {
  const teamName = req.params.teamName;
  connection.query('SELECT u.firstName, u.lastName FROM user u JOIN team t ON u.teamID = t.teamID WHERE t.TeamName = ?', [teamName], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching team members');
    } else {
      res.json(results);
    }
  });
});


// Search for teams and sport
app.get('/teams-sports', (req, res) => {
  connection.query('SELECT t.TeamName, s.sportName FROM team t LEFT JOIN sport s ON t.sport_idSport = s.idSport', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching teams and sports');
    } else {
      const teamsSports = results.map(result => result.sportName ? `${result.TeamName} (${result.sportName})` : result.TeamName);
      res.json(teamsSports);
    }
  });
});



// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});