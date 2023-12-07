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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const Teams = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [teams, setTeams] = useState([]);
    const [sport, setSport] = useState([]);
    const [modalMode, setModalMode] = useState('addGame');
    const [forfeit, setForfeit] = useState({ team1: false, team2: false });
    const [selectedSport, setSelectedSport] = useState('');

    //TODO Move styling to other file
    const modalStyle = {
        display: 'flex',       // Enable Flexbox
        flexDirection: 'column', // Stack children vertically
        justifyContent: 'center', // Center vertically in the container
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        gap: '20px'
    };

    const handleAddTeamClick = () => {
        setModalMode('addTeam');
        setOpenModal(true);
    };

    const handleRowClick = (team) => {
        setSelectedTeam(team); // Set the selected game details
        console.log(selectedTeam);
        setModalMode('viewTeam');
        setOpenModal(true);     // Open the modal
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    useEffect(() => {
        if (selectedTeam) {
            setSelectedSport(selectedTeam.sportName);
        }
    }, [selectedTeam]);

    const fetchTeams = () => {
        fetch('http://localhost:3001/teaminfo')
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error('Error fetching game data:', error));
    };
    
    const fetchSports = () => {
        fetch('http://localhost:3001/sport')
            .then(response => response.json())
            .then(data => setSport(data))
            .catch(error => console.error('Error fetching sports:', error));
    };

    useEffect(() => {
        fetchSports();
    }, []);

    const handleSportChange = (event) => {
        console.log(event.target.value);
        setSelectedSport(event.target.value);
    };

    const handleAddTeam = async () => {
        const teamName = document.getElementById('teamName').value;
        const sport = document.getElementById('sportSelect').value;
        try {
            await axios.post('http://localhost:3001/addTeam', { teamName, sport});
            alert('Game added successfully');
            fetchTeams();
            setOpenModal(false);
        } catch (error) {
            console.error('Error adding game:', error);
            alert('Failed to add game');
        }
    };

    const handleEditTeam = async () => {
       // const gameID = selectedGame.gameID;
        const teamID = selectedTeam.teamID;
        const teamName = document.getElementById('teamName').value;
        const sportName = document.getElementById('sportSelect').value;
        console.log(teamName);
        console.log(sportName);
   
        try {
            await axios.post('http://localhost:3001/editTeam', { teamName, sportName, teamID});
            alert('Team edited successfully');
            fetchTeams();
            setOpenModal(false);
        } catch (error) {
            console.error('Error editing Team:', error);
            alert('Failed to edit team');
        }
    };

    const handleDeleteTeam = async () => {
        const gameID = selectedTeam.teamID;
        try {
            const teamID = selectedTeam.teamID;
            await axios.post('http://localhost:3001/removeTeam', {teamID});
            alert('Team deleted successfully');
            fetchTeams();
            setOpenModal(false);
        } catch (error) {
            console.error('Error deleting team:', error);
            alert('Failed to delete team');
        }
    };


    return (
        <div>
            <br></br>
            <Button variant="contained" onClick={handleAddTeamClick}>
                 Add Team
            </Button>

            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell>Team ID</TableCell>
                        <TableCell>Team Name</TableCell>
                        <TableCell>Captain</TableCell>
                        <TableCell>Sport</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teams.map((team) => (
                        <TableRow key={teams.teamID} onClick={() => handleRowClick(team)} style={{ cursor: 'pointer' }}>
                            <TableCell>{team.teamID}</TableCell>
                            <TableCell>{team.TeamName}</TableCell>
                            <TableCell>{team.firstName} {team.lastName}</TableCell>
                            <TableCell>{team.sportName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={modalStyle}>
                    
                    {modalMode === 'addTeam' && (

                            <Box> 
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                                    
                                    <TextField
                                        id="teamName"
                                        label="Team Name"
                                        sx={{ width: 220 }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                    <select name="sportSelect" id="sportSelect">
                                            {sport.map(sportName => (<option key={sportName} value={sportName}>{sportName}</option>))} 
                                    </select>
                                </Box>
                                    <br></br>
                                    
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                                    <Button variant="contained" onClick={handleAddTeam}>
                                        Add Game
                                    </Button>
                                </Box>
                            </Box>
                        )}

                        {modalMode === 'viewTeam' && selectedTeam && (
                                <Box> 
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>

                                    <TextField
                                        id ="teamName"
                                        label="Team Name"
                                        variant="outlined"
                                        defaultValue={selectedTeam.TeamName}
                                        sx={{ width: 220 }}
                                    />
                                    <select name="sportSelect" id="sportSelect" value={selectedSport} onChange={handleSportChange}>
                                            {sport.map(sportName => (<option key={sportName} value={sportName}>{sportName}</option>))} 
                                    </select>
                                </Box>
                                        <br></br>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                                    <Button variant="contained" onClick={handleEditTeam}>
                                        Update Team
                                    </Button>

                                    <Button variant="contained" color='error' onClick={handleDeleteTeam}>
                                        Delete Team
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    
                </Box>
            </Modal>
            
        </div>
    );
};

export default Teams;