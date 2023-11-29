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

const Game = () => {
    const [games, setGames] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [teams, setTeams] = useState([]);
    const [modalMode, setModalMode] = useState('addGame');

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
    const fetchTeams = () => {
        fetch('http://localhost:3001/api/teams')
            .then(response => response.json())
            .then(data => setTeams(data))
            .catch(error => console.error('Error fetching teams:', error));
    };

    const handleAddGameClick = () => {
        setModalMode('addGame');
        setOpenModal(true);
    };

    const handleRowClick = (game) => {
        setSelectedGame(game); // Set the selected game details
        setModalMode('viewUser');
        setOpenModal(true);     // Open the modal
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchGames = () => {
        fetch('http://localhost:3001/gamedata')
            .then(response => response.json())
            .then(data => setGames(data))
            .catch(error => console.error('Error fetching game data:', error));
    };
    
    useEffect(() => {
        fetchGames();
    }, []);

    const handleAddGame = async () => {
        const date = document.getElementById('date').value;
        const location = document.getElementById('location').value;
        const team1 = document.getElementById('teamSelect1').value;
        const team2 = document.getElementById('teamSelect2').value;
        const sportId = 1; // Currently Placeholder. Can remove as long as it is also removed from endpoint

        try {
            await axios.post('http://localhost:3001/addGame', { date, location, team1Name: team1, team2Name: team2, sportId });
            alert('Game added successfully');
            fetchGames();
            setOpenModal(false);
        } catch (error) {
            console.error('Error adding game:', error);
            alert('Failed to add game');
        }
    };

    const handleEditGame = async () => {
        const gameID = selectedGame.gameID;
        const date = document.getElementById('date').value;
        const location = document.getElementById('location').value;
        const team1 = document.getElementById('teamSelect1').value;
        const team2 = document.getElementById('teamSelect2').value;
        const score1 = document.getElementById('team1Score').value;
        const score2 = document.getElementById('team2Score').value;
        const sportId = 1; // Currently Placeholder. Can remove as long as it is also removed from endpoint

        try {
            await axios.post('http://localhost:3001/editGame', { date, location, team1Name: team1, team2Name: team2, score1, score2, gameID});
            alert('Game edited successfully');
            fetchGames();
            setOpenModal(false);
        } catch (error) {
            console.error('Error adding game:', error);
            alert('Failed to edit game');
        }
    };

    const handleDeleteGame = async () => {
        const gameID = selectedGame.gameID;
        try {
            await axios.post('http://localhost:3001/deleteGame', {gameID});
            alert('Game deleted successfully');
            fetchGames();
            setOpenModal(false);
        } catch (error) {
            console.error('Error deleting game:', error);
            alert('Failed to delete game');
        }
    };


    return (
        <div>
            <br></br>
            <Button variant="contained" onClick={handleAddGameClick}>
                 Add Game
            </Button>

            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell>Game ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Team 1</TableCell>
                        <TableCell>Score 1</TableCell>
                        <TableCell>Team 2</TableCell>
                        <TableCell>Score 2</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {games.map((game) => (
                        <TableRow key={game.gameID} onClick={() => handleRowClick(game)} style={{ cursor: 'pointer' }}>
                            <TableCell>{game.gameID}</TableCell>
                            <TableCell>{game.date}</TableCell>
                            <TableCell>{game.location}</TableCell>
                            <TableCell>{game.Team1Name}</TableCell>
                            <TableCell>{game.Team1Score}</TableCell>
                            <TableCell>{game.Team2Name}</TableCell>
                            <TableCell>{game.Team2Score}</TableCell>
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
                    
                    {modalMode === 'addGame' && (
                            <Box> 
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                                
                                <TextField
                                    id="date"
                                    label="Select Date"
                                    type="date"
                                    defaultValue={new Date().toISOString().split('T')[0]}
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <TextField
                                    id ="location"
                                    label="Location"
                                    variant="outlined"
                                    sx={{ width: 220 }}
                                />
                                </Box>
                                    <br></br>
                    
                                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                                        <select name="TeamName1" id="teamSelect1">
                                            {teams.map(TeamName => (<option key={TeamName} value={TeamName}>{TeamName}</option>))} 
                                        </select>
                                        <p>VS.</p>
                                        <select name="TeamName2" id="teamSelect2">
                                            {teams.map(TeamName => (<option key={TeamName} value={TeamName}>{TeamName}</option>))} 
                                        </select>
                                    </Box>
                                    <br></br>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                                    <Button variant="contained" onClick={handleAddGame}>
                                        Add Game
                                    </Button>
                                </Box>
                            </Box>
                        )}

                        {modalMode === 'viewUser' && selectedGame && (
                                <Box> 
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                                <TextField
                                    id="date"
                                    label="Select Date"
                                    type="date"
                                    defaultValue={new Date(selectedGame.date).toISOString().split('T')[0]}
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <TextField
                                    id ="location"
                                    label="Location"
                                    variant="outlined"
                                    defaultValue={selectedGame.location}
                                    sx={{ width: 220 }}
                                />
                                </Box>
                                    <br></br>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                                        <select name="TeamName1" id="teamSelect1" defaultValue = {selectedGame.Team1Name}>
                                            {teams.map(TeamName => (<option key={TeamName} value={TeamName}>{TeamName}</option>))} 
                                        </select>
                                        <p>VS.</p>
                                        <select name="TeamName2" id="teamSelect2" defaultValue = {selectedGame.Team2Name}>
                                            {teams.map(TeamName => (<option key={TeamName} value={TeamName}>{TeamName}</option>))} 
                                        </select>
                                    </Box>
                                    <br></br>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                                    <TextField
                                        id = "team1Score"
                                        type = "number"
                                        label={`${selectedGame.Team1Name} Score`}
                                        defaultValue={selectedGame.Team1Score}
                                    />
                                    <TextField
                                        id = "team2Score"
                                        type = "number"
                                        label={`${selectedGame.Team2Name} Score`}
                                        defaultValue={selectedGame.Team2Score}
                                    />
                                </Box>
                                    <br></br>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'center' }}>
                                    <Button variant="contained" onClick={handleEditGame}>
                                        Update Game
                                    </Button>

                                    <Button variant="contained" color='error' onClick={handleDeleteGame}>
                                        Delete Game
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    
                </Box>
            </Modal>
            
        </div>
    );
};

export default Game;