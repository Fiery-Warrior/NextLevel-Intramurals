use nlidb;
#CREATION QUERIES
	#INSERT INTO team (TeamName, Captain, sport_idSport) VALUES ('Eagles', '2222222', 1); #Create a Team
	#INSERT INTO team_has_user (team_teamID, user_stuID) VALUES (1, '7777777'); #Add user to Team
	#INSERT INTO sport (SportName) VALUES ('Basketball'); #Create Sport
	#INSERT INTO user (role, email, firstName, lastName, sex, stuID) VALUES (1, 'asher@mail.com', 'Asher', 'Coates', 'M', '1111111') #Create User. Roles are 1 (User), 2(Captain), 3(Admin), and 4(SuperAdmin). Sec can be 'M' or 'F'.
    
#SELECTION QUERIES
	#Select all users on a specific team
		/*
		SELECT u.firstName, u.lastName, u.email, u.stuID   
		FROM user u
		JOIN team_has_user thu ON u.stuID = thu.user_stuID
		WHERE thu.team_teamID = 1;
		*/

	#Select all teams for a sport
		/*
		SELECT t.teamID, t.TeamName  #Select all teams for a sport
		FROM team t
		WHERE t.sport_idSport = 1;
		*/