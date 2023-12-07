const express = require('express');
const nodemailer = require('nodemailer'); //For Emailing Form
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
  host: '47.186.237.244',
  user: 'asher',
  password: 'password',
  database: 'nlidb'
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
          
          } else if (userRole === 3) {
            console.log('Admin authenticated successfully');
            res.send('Captain authenticated successfully.');
          
          } else if (userRole === 4) {
            console.log('SuperAdmin authenticated successfully');
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
app.get('/admindashusers', (req, res) => {
  connection.query('SELECT u.firstName, u.lastName, u.role, u.email, u.stuID, u.sex, t.TeamName, s.sportName FROM user u LEFT JOIN team t ON u.teamID = t.teamID LEFT JOIN sport s ON t.sport_idSport = s.idSport', (err, results) => {
    if (err) throw err;
    res.json(results);
    console.log(results);
  
  });
  //Users sport and user team data will also be displayed here
});

app.get('/admindashgames', (req, res) => {
  connection.query('SELECT * FROM game', (err, results) => {
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

app.get('/getUserCount', (req, res) => {
  connection.query('SELECT COUNT(*) AS count FROM user', (err, results) => {
    if (err) {
      // Send a server error response if there's an error
      return res.status(500).send('Error getting user count');
    }
    // Send back the count if no error
    res.json({ userCount: results[0].count });
  });
});

app.get('/getTeamCount', (req, res) => {
  connection.query('SELECT COUNT(*) AS count FROM team', (err, results) => {
    if (err) {
      // Send a server error response if there's an error
      return res.status(500).send('Error getting user count');
    }
    // Send back the count if no error
    res.json({ teamCount: results[0].count });
  });
});

app.get('/getSportCount', (req, res) => {
  connection.query('SELECT COUNT(*) AS count FROM sport', (err, results) => {
    if (err) {
      // Send a server error response if there's an error
      return res.status(500).send('Error getting user count');
    }
    // Send back the count if no error
    res.json({ sportCount: results[0].count });
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

app.get('/sport', (req, res) => {
  connection.query('SELECT sportName FROM sport', (err, results) => {
      if (err) {
          return res.status(500).send('Error fetching teams');
      }
      res.json(results.map(sport => sport.sportName));
  });
});

app.post('/updateCaptain', async (req, res) => {
  try {
    const { userId, teamName } = req.body;

    // Start a transaction
    await queryAsync('START TRANSACTION');

    // Get the teamID for the given teamName
    const teamIdResults = await queryAsync('SELECT teamID FROM team WHERE TeamName = ?', [teamName]);
    if (teamIdResults.length === 0) {
      throw new Error('Failed to find current teamID');
    }

    const teamId = teamIdResults[0].teamID;

    // Get the current captain's ID
    const currentCaptainResults = await queryAsync('SELECT Captain FROM team WHERE TeamName = ?', [teamName]);
    if (currentCaptainResults.length === 0) {
      throw new Error('Failed to find current captain');
    }

    const currentCaptainId = currentCaptainResults[0].Captain;

    // Update the old captain's role
    await queryAsync('UPDATE user SET role = 1 WHERE stuID = ?', [currentCaptainId]);

    // Update the team captain
    await queryAsync('UPDATE team SET Captain = ? WHERE TeamName = ?', [userId, teamName]);

    // Update the new captain's role
    await queryAsync('UPDATE user SET role = 2 WHERE stuID = ?', [userId]);

    // Update the new captain's teamID
    await queryAsync('UPDATE user SET teamID = ? WHERE stuID = ?', [teamId, userId]);

    // Commit the transaction
    await queryAsync('COMMIT');

    res.status(200).send('Captain and roles updated successfully');
  } catch (error) {
    console.error('Error updating captain and roles:', error);
    
    // Rollback the transaction in case of an error
    await queryAsync('ROLLBACK');
    
    res.status(500).send('Failed to update captain and roles');
  }
});

// Helper function to promisify MySQL queries
function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


//For User Profile
app.get('/userprofile/:email', (req, res) => {
  const userEmail = req.params.email;
  connection.query('SELECT u.firstName, u.lastName, u.role, u.email, u.stuID, u.sex, t.TeamName, s.sportName FROM user u LEFT JOIN team t ON u.teamID = t.teamID LEFT JOIN sport s ON t.sport_idSport = s.idSport WHERE u.email = ?', [userEmail], (err, results) => {
    if (err) throw err;
    res.json(results);
    console.log(results);
  });
});

app.get('/gamedata', (req, res) => {
  const query = `
      SELECT g.gameID, 
      g.location, 
      g.date,
      MAX(CASE WHEN thg.seq = 1 THEN t.TeamName END) AS Team1Name,
      MAX(CASE WHEN thg.seq = 1 THEN thg.score END) AS Team1Score,
	    MAX(CASE WHEN thg.seq = 1 THEN thg.forfeited END) AS Team1Forfeited,
      MAX(CASE WHEN thg.seq = 2 THEN t.TeamName END) AS Team2Name,
      MAX(CASE WHEN thg.seq = 2 THEN thg.score END) AS Team2Score,
	    MAX(CASE WHEN thg.seq = 2 THEN thg.forfeited END) AS Team2Forfeited
      FROM game g
      LEFT JOIN (
      SELECT *, ROW_NUMBER() OVER (PARTITION BY game_gameID ORDER BY team_teamID) AS seq
      FROM team_has_game
      ) thg ON g.gameID = thg.game_gameID
      LEFT JOIN team t ON t.teamID = thg.team_teamID
      GROUP BY g.gameID, g.location, g.date
      ORDER BY g.gameID;
  `;

  connection.query(query, (err, results) => {
      if (err) {
          res.status(500).send('Error in fetching game data');
      } else {
          res.json(results);
      }
  });
});


app.post('/addGame', async (req, res) => {
  try {
    const { location, date, team1Name, team2Name } = req.body;

    // Insert a new game
    const insertGameSql = 'INSERT INTO game (location, date) VALUES (?, ?)';
    const gameInsertResults = await queryAsync(insertGameSql, [location, date]);

    const gameId = gameInsertResults.insertId;

    // Get team1 ID
    const team1IDQuery = 'SELECT teamID FROM team WHERE teamName = ?';
    const team1Results = await queryAsync(team1IDQuery, [team1Name]);
    const team1Id = team1Results[0].teamID;

    // Get team1 sport ID
    const team1SportIdQuery = 'SELECT sport_idSport FROM team WHERE teamID = ?';
    const team1SportResults = await queryAsync(team1SportIdQuery, [team1Id]);
    const team1Sport = team1SportResults[0].sport_idSport;

    // Link team1 to the game
    const insertTeamGameSql = 'INSERT INTO team_has_game (team_teamID, team_sport_idSport, game_gameID) VALUES (?, ?, ?)';
    await queryAsync(insertTeamGameSql, [team1Id, team1Sport, gameId]);

    // Get team2 ID
    const team2Results = await queryAsync(team1IDQuery, [team2Name]);
    const team2Id = team2Results[0].teamID;

    // Get team2 sport ID
    const team2SportResults = await queryAsync(team1SportIdQuery, [team2Id]);
    const team2Sport = team2SportResults[0].sport_idSport;

    // Link team2 to the game
    await queryAsync(insertTeamGameSql, [team2Id, team2Sport, gameId]);

    res.send('Game and team links created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Helper function to promisify MySQL queries
function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

app.post('/editGame', async (req, res) => {
  try {
    const { location, date, team1Name, team2Name, score1, score2, gameID, forfeit1, forfeit2} = req.body;
    // Get old team1ID
    const oldTeamIDQuery = 'SELECT team_teamID FROM team_has_game WHERE game_gameID = ?';
    const oldTeamIDs = await queryAsync(oldTeamIDQuery, [gameID]);
    const oldTeam1Id = oldTeamIDs[0].team_teamID;
    const oldTeam2Id = oldTeamIDs[1].team_teamID;

    // Get team1 ID
    const team1IDQuery = 'SELECT teamID FROM team WHERE teamName = ?';
    const team1Results = await queryAsync(team1IDQuery, [team1Name]);
    const team1Id = team1Results[0].teamID;

    // Get team1 sport ID
    const team1SportIdQuery = 'SELECT sport_idSport FROM team WHERE teamID = ?';
    const team1SportResults = await queryAsync(team1SportIdQuery, [team1Id]);
    const team1Sport = team1SportResults[0].sport_idSport;

    // Get team2 ID
    const team2Results = await queryAsync(team1IDQuery, [team2Name]);
    const team2Id = team2Results[0].teamID;

    // Get team2 sport ID
    const team2SportResults = await queryAsync(team1SportIdQuery, [team2Id]);
    const team2Sport = team2SportResults[0].sport_idSport;

    //Update Game
    const updateGameQuery = 'UPDATE game SET location = ?, date = ? WHERE gameID = ?';
    await queryAsync(updateGameQuery, [location, date, gameID]);
    
    //Update Team 1 Score
    const updateTeamQuery = 'UPDATE team_has_game SET score = ?, team_teamID = ?, forfeited = ? WHERE game_gameID = ? AND team_teamID = ?';
    await queryAsync(updateTeamQuery, [score1, team1Id, forfeit1, gameID, oldTeam1Id]);

    //Update Team 2 Score
    await queryAsync(updateTeamQuery, [score2, team2Id, forfeit2, gameID, oldTeam2Id]);

    res.send('Game and team links created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Helper function to promisify MySQL queries
function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

app.post('/deleteGame', async (req, res) => {
  try {
    const {gameID} = req.body;
    const deleteTeamHasGameQuery = 'DELETE FROM team_has_game WHERE game_gameID = ?';
    const deleteGameQuery = 'DELETE FROM game WHERE gameID = ?';
    await queryAsync(deleteTeamHasGameQuery, [gameID]);
    await queryAsync(deleteGameQuery, [gameID]);
    res.send('Game deleted successfully!');

  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Helper function to promisify MySQL queries
function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

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

app.post('/showGames', async (req, res) => {
  try {
    const {teamName} = req.body;
    const getTeamIDQuery = 'SELECT teamID FROM team WHERE teamName = ?'
    const teamIDResults = await queryAsync(getTeamIDQuery, [teamName]);
    const teamID = teamIDResults[0].teamID;
    const getGamesQuery = 	`SELECT g.gameID, g.date, g.location, 
                          t1.TeamName AS 'Your Team', thg1.score AS 'Your Team Score',
                          t2.TeamName AS 'Opposing Team', thg2.score AS 'Opposing Team Score'
                      FROM nlidb.game g
                      JOIN nlidb.team_has_game thg1 ON g.gameID = thg1.game_gameID AND thg1.team_teamID = ?
                      JOIN nlidb.team t1 ON thg1.team_teamID = t1.teamID
                      JOIN nlidb.team_has_game thg2 ON g.gameID = thg2.game_gameID AND thg2.team_teamID != ?
                      JOIN nlidb.team t2 ON thg2.team_teamID = t2.teamID`;
    const games = await queryAsync(getGamesQuery, [teamID, teamID]);
    console.log("Games JSON Response:", games);
    res.json(games);

  } catch (error) {
    console.error(error);
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

// Helper function to promisify MySQL queries
function queryAsync(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
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

app.get('/teaminfo', async (req, res) => {
  try{
  const getTeamsquery = (`SELECT t.teamID, t.TeamName, s.sportName, u.firstName, u.lastName, u.stuID
                          FROM nlidb.team t
                          JOIN nlidb.sport s ON t.sport_idSport = s.idSport
                          LEFT JOIN nlidb.user u ON t.Captain = u.stuID
                        `)
  const teams = await queryAsync(getTeamsquery);
  res.json(teams);
  } catch(error) {
    console.error(error);
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/addTeam', async (req, res) => {
  try {
    const { teamName, sport} = req.body;
    const getSportIDQuery = 'SELECT idSport FROM sport WHERE sportName = ?'
    const sportIDResults = await queryAsync(getSportIDQuery, [sport]);
    const sportID = sportIDResults[0].idSport

    // Insert a new game
    const createTeamSql = 'INSERT INTO team (TeamName, sport_idSport) VALUES (?, ?)';
    await queryAsync(createTeamSql, [teamName, sportID]);

    res.send('Game and team links created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/editTeam', async (req, res) => {
  try {
    const { teamName, sportName, teamID} = req.body;
    // Get sportID
    const sportIDQuery = 'SELECT idSport FROM sport WHERE sportName = ?';
    const sportResult = await queryAsync(sportIDQuery, [sportName]);
    const sportID = sportResult[0].idSport;

    const createTeamSql = 'UPDATE team SET TeamName = ?, sport_idSport = ? WHERE teamID = ?';
    await queryAsync(createTeamSql, [teamName, sportID, teamID]);

    res.send('Game and team links created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/removeTeam', async (req, res) => {
  try {
    const {teamID} = req.body;
    // Get sportID

    const removeUsersQuery = 'UPDATE user SET teamID = NULL WHERE teamID = ?';
    await queryAsync(removeUsersQuery, [teamID]);

    const removeTeamQuery = 'DELETE FROM team WHERE teamID = ?';
    await queryAsync(removeTeamQuery, [teamID]);

    res.send('Team Successfully Removed');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/addusertoteam', async (req, res) => {
  try {
    const {stuID, TeamName} = req.body;
    console.log(stuID, TeamName);

    const teamIDQuery = 'SELECT teamID from team where TeamName = ?';
    teamQueryResults = await queryAsync(teamIDQuery, [TeamName]);
    teamID = teamQueryResults[0].teamID;

    const removeUsersQuery = 'UPDATE user SET teamID = ?, role=1 WHERE stuID = ?';
    await queryAsync(removeUsersQuery, [teamID, stuID]);

    const removeFromInterestQuery = "DELETE FROM interest WHERE stuID = ? AND teamID = ?";
    await queryAsync(removeFromInterestQuery, [stuID, teamID]);

    res.send('User\'s team set');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/setInterest', async (req, res) => {
  try{
    const {email, sanitizedTeamName} = req.body;

    const teamIDQuery = 'SELECT teamID from team where TeamName = ?';
    teamQueryResults = await queryAsync(teamIDQuery, [sanitizedTeamName]);
    const teamID = teamQueryResults[0].teamID;

    const userEmailQuery = 'SELECT stuID from user where email = ?';
    teamQueryResults = await queryAsync(userEmailQuery, [email]);
    const userID = teamQueryResults[0].stuID;

    const setInterestQuery = `insert into interest set stuID = ?, teamID = ?`;
    await queryAsync(setInterestQuery, [userID, teamID]);
    res.status(200).json({ success: true, message: 'Interest set successfully' });
    
  } catch(error){
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
})


app.post('/getInterest', async (req, res) => {
  console.log("thinking");
  try{
    const {email} = req.body;

    const userEmailQuery = 'SELECT stuID from user where email = ?';
    teamQueryResults = await queryAsync(userEmailQuery, [email]);
    const userID = teamQueryResults[0].stuID;

    const getInterestQuery = `SELECT u.*
                              FROM user u
                              JOIN interest i ON u.stuID = i.stuID
                              JOIN team t ON i.teamID = t.teamID
                              WHERE t.teamID = (
                                  SELECT teamID
                                  FROM user
                                  WHERE stuID = ? 
                              );`;
    const result = await queryAsync(getInterestQuery, [userID]);
    res.json(result);

  } catch(error){
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
})

app.post('/updateAdminRole', (req, res) => {
  const { userId } = req.body;

  // Query to update the user's role to Admin (role 3)
  const updateUserRoleQuery = 'UPDATE user SET role = 3 WHERE stuID = ?';

  // Start a transaction
  connection.beginTransaction((err) => {
    if (err) {
      console.error('Transaction start error:', err);
      return res.status(500).send('Failed to update user role');
    }

    // Update the user's role to Admin
    connection.query(updateUserRoleQuery, [userId], (err, results) => {
      if (err) {
        return connection.rollback(() => {
          console.error('Error updating user role to Admin:', err);
          res.status(500).send('Failed to update user role to Admin');
        });
      }

      // Commit the transaction
      connection.commit((err) => {
        if (err) {
          return connection.rollback(() => {
            console.error('Error committing transaction:', err);
            res.status(500).send('Failed to update user role to Admin');
          });
        }

        res.status(200).send('User role updated to Admin successfully');
      });
    });
  });
});



// New POST route '/join-team'
app.post('/join-team', (req, res) => {
  const { userEmail, teamName } = req.body;
  connection.query('UPDATE user u JOIN team t ON t.TeamName = ? SET u.teamID = t.teamID WHERE u.email = ?', [teamName, userEmail], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error joining team');
    } else {
      res.status(200).send('Joined team successfully');
    }
  });
});

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







app.post('/updateAdminRole', (req, res) => {
  const { userId } = req.body;

  // Query to update the user's role to Admin (role 3)
  const updateUserRoleQuery = 'UPDATE user SET role = 3 WHERE stuID = ?';

  // Start a transaction
  connection.beginTransaction((err) => {
    if (err) {
      console.error('Transaction start error:', err);
      return res.status(500).send('Failed to update user role');
    }

    // Update the user's role to Admin
    connection.query(updateUserRoleQuery, [userId], (err, results) => {
      if (err) {
        return connection.rollback(() => {
          console.error('Error updating user role to Admin:', err);
          res.status(500).send('Failed to update user role to Admin');
        });
      }

      // Commit the transaction
      connection.commit((err) => {
        if (err) {
          return connection.rollback(() => {
            console.error('Error committing transaction:', err);
            res.status(500).send('Failed to update user role to Admin');
          });
        }

        res.status(200).send('User role updated to Admin successfully');
      });
    });
  });
});



// New POST route '/join-team'
app.post('/join-team', (req, res) => {
  const { userEmail, teamName } = req.body;
  connection.query('UPDATE user u JOIN team t ON t.TeamName = ? SET u.teamID = t.teamID WHERE u.email = ?', [teamName, userEmail], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error joining team');
    } else {
      res.status(200).send('Joined team successfully');
    }
  });
});

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

//Form Emailing
require('dotenv').config();