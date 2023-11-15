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



export default function Users() {
    //Use 'users' to display this data on website
    //Use 'setUsers' to grab this data
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/admindash');
                setUsers(response.data);
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
                <CardHeader title="User" />
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Sex</TableCell>
                            <TableCell>StudID</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Team Name</TableCell>
                            <TableCell>Sport</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => {
                            let userPosition;
                            console.log(user.role)

                            if (user.role === 1) {
                                userPosition = 'Player';
                            } else if (user.role === 2) {
                                userPosition = 'Captain';
                            } else if (user.role === 3) {
                                userPosition = 'Admin';
                            } else if (user.role === 4) {
                                userPosition = 'Super Admin';
                            }else {
                                userPosition = 'NA';
                            }
                            return (
                                <TableRow key={index}>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.sex}</TableCell>
                                    <TableCell>{user.stuID}</TableCell>
                                    <TableCell>{userPosition}</TableCell>
                                    <TableCell>{user.TeamName}</TableCell>
                                    <TableCell>{user.sportName}</TableCell>
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