import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import axios from 'axios';



export default function Teams() {
    //Use 'teams' to display this data on website
    //Use 'setTeams' to grab this data
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/teams');
                setTeams(response.data);
            } catch (error) {
                console.error(`There is error retrieving the user data: ${error}`);
            }
        };

        fetchUsers();
    }, []);

    function preventDefault(event) {
        event.preventDefault();
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader title="Team" />
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>teamID</TableCell>
                            <TableCell>TeamName</TableCell>
                            <TableCell>Captain</TableCell>
                            <TableCell>sport_idSport</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map((team, index) => {
        
                            return (
                                <TableRow key={index}>
                                    <TableCell>{team.teamID}</TableCell>
                                    <TableCell>{team.TeamName}</TableCell>
                                    <TableCell>{team.Captain}</TableCell>
                                    <TableCell>{team.sport_idSport}</TableCell>
                                    {/* <TableCell>{userPosition}</TableCell> */}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                    See more Users
                </Link>
            </Card>
        </React.Fragment>
    );
}