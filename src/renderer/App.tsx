import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GridOnIcon from '@mui/icons-material/GridOn';
import ScoreIcon from '@mui/icons-material/Score';
import AssessmentIcon from '@mui/icons-material/Assessment';

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [selectedPage, setSelectedPage] = useState('home');

  const menuItems = [
    { id: 'home', label: 'Home', icon: <HomeIcon /> },
    { id: 'participants', label: 'Participants', icon: <PeopleIcon /> },
    { id: 'contests', label: 'Contests', icon: <EmojiEventsIcon /> },
    { id: 'set-system', label: 'Set System', icon: <GridOnIcon /> },
    { id: 'score-entry', label: 'Score Entry', icon: <ScoreIcon /> },
    { id: 'results', label: 'Results', icon: <AssessmentIcon /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              NBTA Baton Contest Manager
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar Navigation */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton
                    selected={selectedPage === item.id}
                    onClick={() => setSelectedPage(item.id)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {selectedPage === 'home' && (
            <Box>
              <Typography variant="h4" gutterBottom>
                Welcome to NBTA Baton Contest Manager
              </Typography>
              <Typography variant="body1" paragraph>
                Modern desktop application for managing NBTA baton twirling contests.
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Quick Start:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="1. Add Participants" 
                    secondary="Go to Participants to add twirlers and coaches"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="2. Create Contest" 
                    secondary="Set up your contest with date, location, and classification"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="3. Generate Set System" 
                    secondary="Automatically assign divisions to lanes with conflict resolution"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="4. Enter Scores" 
                    secondary="Fast keyboard entry with auto-calculation"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="5. View Results" 
                    secondary="Generate results with NBTA placement-points tabulation"
                  />
                </ListItem>
              </List>
            </Box>
          )}
          
          {selectedPage === 'participants' && (
            <Box>
              <Typography variant="h4" gutterBottom>
                Participants & Coaches
              </Typography>
              <Typography variant="body1">
                Participant management coming soon...
              </Typography>
            </Box>
          )}
          
          {selectedPage === 'contests' && (
            <Box>
              <Typography variant="h4" gutterBottom>
                Contests
              </Typography>
              <Typography variant="body1">
                Contest management coming soon...
              </Typography>
            </Box>
          )}
          
          {selectedPage === 'set-system' && (
            <Box>
              <Typography variant="h4" gutterBottom>
                Set System Manager
              </Typography>
              <Typography variant="body1">
                Set system generation coming soon...
              </Typography>
            </Box>
          )}
          
          {selectedPage === 'score-entry' && (
            <Box>
              <Typography variant="h4" gutterBottom>
                Score Entry
              </Typography>
              <Typography variant="body1">
                Score entry interface coming soon...
              </Typography>
            </Box>
          )}
          
          {selectedPage === 'results' && (
            <Box>
              <Typography variant="h4" gutterBottom>
                Results & Reports
              </Typography>
              <Typography variant="body1">
                Results display coming soon...
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
