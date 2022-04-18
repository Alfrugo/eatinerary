import React, { useEffect, useState } from 'react';
import { Container, styled, Typography, Button, Box, Dialog, Tabs, Tab } from '@mui/material';
import LoginForm from './LoginForm';
import { TabPanel } from './TabPanel';
import SignupForm from './SignupForm';
import Auth from '../utils/auth';
import { Destinations } from '../pages/Destinations';

const Header = styled('div')(({ theme }) => `
    background: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
    padding: ${theme.spacing(2, 0)};
`);

const Background = styled('div')(({ theme }) => `
    background: ${theme.palette.background.main};
    min-height: 100vh;
`);

export const Layout = ({ }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const profile = Auth.getProfile();
        if (profile && profile.data) {
            setUser(profile.data)
        }
    }, []);

    const onLoginOrSignUp = () => {
        const profile = Auth.getProfile();
        if (profile && profile.data) {
            setUser(profile.data)
        }
        setShowModal(false);
    }

    const logout = () => {
        Auth.logout();
        setUser(null);
    }

  return (
    <Background>
        <Header>
            <Container maxWidth="sm">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography sx={{ fontWeight: 800 }} variant="h5">
                        eatinerary
                    </Typography>
                    { !!user && (
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography sx={{ fontWeight: 800 }}>
                                {user.username}
                            </Typography>
                            <Button onClick={() => logout()} variant="contained" color="secondary">Logout</Button>
                        </Box>
                    ) }
                    { !user && (
                        <Button onClick={() => setShowModal(true)} variant="contained" color="secondary">Sign Up or Login</Button>
                    ) }
                </Box>
            </Container>
        </Header>
        <Container maxWidth="sm">
            <Destinations user={user} />
        </Container>
        {/* set modal data up */}
      <Dialog
        fullWidth
        open={showModal}
        onClose={() => setShowModal(false)}>
        {/* tab container to do either signup or login component */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={selectedTab} onChange={(_, v) => setSelectedTab(v)} aria-label="basic tabs example">
                <Tab label="Sign Up" />
                <Tab label="Login" />
            </Tabs>
        </Box>
        <TabPanel value={selectedTab} index={0}>
            <SignupForm closeModal={() => onLoginOrSignUp()} />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
            <LoginForm closeModal={() => onLoginOrSignUp()} />
        </TabPanel>
      </Dialog>
    </Background>
  );
}
