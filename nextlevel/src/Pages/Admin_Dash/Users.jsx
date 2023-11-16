import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Button } from '@material-ui/core';



export default function Users() {
    //Use 'users' to display this data on website
    //Use 'setUsers' to grab this data
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/admindash');
                const updatedUsers = response.data.map(user => {
                    let userPosition = 'NA';
                    switch (user.role) {
                        case 4: userPosition = 'Super Admin'; break;
                        case 3: userPosition = 'Admin'; break;
                        case 2: userPosition = 'Captain'; break;
                        case 1: userPosition = 'Player'; break;                         
                        default: break;
                    }
                    return { ...user, userPosition }; // Add userPosition to each user object
                });
                setUsers(updatedUsers);
            } catch (error) {
                console.error(`There is error retrieving the user data: ${error}`);
            }
        };
    
        fetchUsers();
    }, []);
    

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setOpenModal(true);
    };

    const deleteUser = async () => {
        if (selectedUser && window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await axios.delete(`http://localhost:3001/deleteUser/${selectedUser.stuID}`);
                if (response.status === 200) {
                    setUsers(users.filter(user => user.stuID !== selectedUser.stuID));
                    setOpenModal(false);
                    alert("User deleted successfully.");
                }
            } catch (error) {
                console.error(`There was an error deleting the user: ${error}`);
                alert("Failed to delete the user.");
            }
        }
    };
    //TODO Move styling to other file
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const handleClose = () => {
        setOpenModal(false);
    };

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
                        {users.map((user, index) =>  {
                            return (
                                <TableRow key={index} onClick={() => handleRowClick(user)}
                                style={{ cursor: 'pointer' }}>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.sex}</TableCell>
                                    <TableCell>{user.stuID}</TableCell>
                                    <TableCell>{user.userPosition}</TableCell>
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
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    <h2 id="modal-title">
                        {selectedUser ? `User #s${selectedUser.stuID}` : 'User'}
                    </h2>
                    <p id="modal-description">
                        {selectedUser ? `Name: ${selectedUser.firstName} ${selectedUser.lastName}` : ''}
                    </p>
                    <p>
                        {selectedUser ? `Role: ${selectedUser.userPosition}`:''}
                    </p>
                    <Button variant="contained" color="error" onClick={deleteUser}>Delete User</Button>
                    {/* You can add more user details here */}
                </Box>
            </Modal>
        </React.Fragment>
    );
}