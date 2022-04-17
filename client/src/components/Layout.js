import { Container, styled, Typography, Button, Box } from '@mui/material';

const Header = styled('div')(({ theme }) => `
    background: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
    padding: ${theme.spacing(2, 0)};
`);

const Background = styled('div')(({ theme }) => `
    background: ${theme.palette.background.main};
    min-height: 100vh;
`);

export const Layout = ({ children }) => {
  return (
    <Background>
        <Header>
            <Container maxWidth="sm">
                <Box display="flex" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 800 }} variant="h5">
                        eatinerary
                    </Typography>
                    <Button variant="contained" color="secondary">Login</Button>
                </Box>
            </Container>
        </Header>
        <Container maxWidth="sm">
            {children}
        </Container>
    </Background>
  );
}
