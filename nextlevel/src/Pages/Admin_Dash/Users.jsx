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
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import AdminDash from './AdminDash';

export default function Users() {
    //Use 'users' to display this data on website
    //Use 'setUsers' to grab this data
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalScreen, setModalScreen] = useState('default'); // New state for modal screen
    const [teams, setTeams] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/admindashusers');
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

    useEffect(() => {
        fetch('http://localhost:3001/api/teams')
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error('Error fetching teams:', error));
        fetchUsers();
    }, []);
    

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setModalScreen('default');
        setOpenModal(true);
    };

    const handlePromoteToAdmin = async () => {
        if (selectedUser) {
            try {
                const response = await axios.post('http://localhost:3001/updateAdminRole', {
                    userId: selectedUser.stuID,
                    role: 3 // Role 3 signifies Admin
                    // Add other necessary data to send to the backend
                });

                if (response.status === 200) {
                    alert('User promoted to Admin successfully');
                    fetchUsers(); // Update the user list after promotion
                    setOpenModal(false);
                }
            } catch (error) {
                console.error('Error promoting user to Admin:', error);
                alert('Failed to promote user to Admin');
            }
        }
    };

    const handlePromoteToCaptain = () => {
        setModalScreen('promoteToCaptain');
    };

    const handleSubmitNewCaptain = async () => {
        const selectedTeam = document.getElementById('teamSelect').value;
        if (selectedUser && selectedTeam) {
            try {
                const response = await axios.post('http://localhost:3001/updateCaptain', {
                    userId: selectedUser.stuID, 
                    teamName: selectedTeam
                });
    
                if (response.status === 200) {
                    alert('Captain updated successfully');
                    fetchUsers(); //To update the roles in the table in real time, we fetch the entire list again. If this ends up having a significant performance impact, we will need to refactor to only update affected rows.
                    setOpenModal(false);
                }
            } catch (error) {
                console.error('Error updating captain:', error);
                alert('Failed to update captain');
            }
        }
    };
    

    const handleBack = () => {
        setModalScreen('default');
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
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    {modalScreen === 'default' ? (
                        <React.Fragment>
                    <h2 id="modal-title">
                        {selectedUser ? `User #s${selectedUser.stuID}` : 'User'}
                    </h2>
                    <p id="modal-description">
                        {selectedUser ? `Name: ${selectedUser.firstName} ${selectedUser.lastName}` : ''}
                    </p>
                    <p>
                        {selectedUser ? `Role: ${selectedUser.userPosition}`:''}
                    </p>
                    <Button variant="contained" color="error" onClick={handlePromoteToAdmin}>Promote to Admin</Button>
                    <Button variant="contained" color="error" onClick={deleteUser}>Delete User</Button>
                    <Button variant="contained" color="error" onClick={handlePromoteToCaptain}>Promote to Captain</Button>
                    </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <h3>{selectedUser ? `Select team that ${selectedUser.firstName} ${selectedUser.lastName} will be the captain of` : ''}</h3>
                            <Button onClick={handleBack}>Back</Button>
                            <select name="TeamName" id="teamSelect">
                                {teams.map(TeamName => (<option key={TeamName} value={TeamName}>{TeamName}</option>))} 
                            </select>
                            <Button onClick={handleSubmitNewCaptain} variant="contained" color="error">Set Captain</Button>
                        </React.Fragment>
                        
                    )}
                </Box>
            </Modal>
        </React.Fragment>
    );
}