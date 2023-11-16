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
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function Users() {
    //Use 'users' to display this data on website
    //Use 'setUsers' to grab this data
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    const filteredUsers = users.filter((user) => {
        const searchRegex = new RegExp(searchTerm, 'i');
        return (
            searchRegex.test(user.firstName) ||
            searchRegex.test(user.lastName) ||
            searchRegex.test(user.sportName) ||
            searchRegex.test(user.stuID) ||
            searchRegex.test(getUserPosition(user.role)) ||
            searchRegex.test(user.TeamName)
        );
    });

    function getUserPosition(role) {
        switch (role) {
            case 1:
                return 'Player';
            case 2:
                return 'Captain';
            case 3:
                return 'Admin';
            case 4:
                return 'Super Admin';
            default:
                return 'NA';
        }
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader title="User" />
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="normal"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
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
                        {filteredUsers.map((user, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.sex}</TableCell>
                                    <TableCell>{user.stuID}</TableCell>
                                    <TableCell>{getUserPosition(user.role)}</TableCell>
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