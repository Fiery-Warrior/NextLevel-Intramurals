use nlidb;
#select * from sport;
#CREATION QUERIES
	#INSERT INTO team (TeamName, Captain, sport_idSport) VALUES ('Pitch Perfect', '0018622', 6); #Create a Team
	#UPDATE user SET teamID = 1 WHERE stuID = '3333333'; #Add user to Team
	#INSERT INTO sport (SportName) VALUES ('Softball'); #Create Sport
	#INSERT INTO user (role, email, firstName, lastName, sex, stuID) VALUES (1, 'asher@mail.com', 'Asher', 'Coates', 'M', '1111111') #Create User. Roles are 1 (User), 2(Captain), 3(Admin), and 4(SuperAdmin). Sec can be 'M' or 'F'.
    
#SELECTION QUERIES
	#Select all users on a specific team
		/*
        SELECT *
        FROM user
        WHERE teamID = 8;
        */

	#Select all teams for a sport
		/*
		SELECT t.teamID, t.TeamName  #Select all teams for a sport
		FROM team t
		WHERE t.sport_idSport = 6;
		*/

	#Get user data, sport information, and team information for a user
        SELECT u.firstName, u.lastName, u.role, u.email, u.stuID, u.sex, t.TeamName, s.sportName
		FROM user u
		LEFT JOIN team t ON u.teamID = t.teamID
		LEFT JOIN sport s ON t.sport_idSport = s.idSport;
        