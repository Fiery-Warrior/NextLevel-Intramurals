import * as React from 'react';
import './TeamSelection.css';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 80,
  lineHeight: '80px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

const items = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => `Team ${elevation}`);

export default function Elevation() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddItemClick = (itemIndex) => {
    console.log(`Add button clicked for item ${itemIndex}`);
    // Perform actions related to the item here
  };

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
  <div>
    <div>
      <h1 class="title">Team List</h1>
      <input class="search_input"
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for a team..."
      />
      </div>
      <Grid container spacing={2}>
        {filteredItems.map((team, index) => (
          <Grid item xs={12} key={index}>
            <ThemeProvider theme={lightTheme}>
              <Box
                sx={{
                  padding: '0 40px',
                }}
              >
                <Item elevation={index}>
                  {team}
                  <button
                    className="add_button"
                    onClick={() => handleAddItemClick(index)}
                  >
                    +
                  </button>
                </Item>
              </Box>
            </ThemeProvider>
          </Grid>
        ))}
      </Grid>
      </div>
  );
}