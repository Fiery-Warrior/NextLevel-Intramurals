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

// Generate Order Data
function createData(id, date, name, sport, email, phone) {
    return { id, date, name, sport, email, phone };
}

export default function Users() {
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
            {users.map((user, index) => (
                <div key={index}>
                    <Card>
                        <CardHeader title="User" />
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Sport</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={user.id}>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.sport}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                            See more Users
                        </Link>
                    </Card>
                </div>
            ))}
        </React.Fragment>
    );
}