import { Card, CardContent, CardActions, styled, Typography, Button, Box, CardHeader, Avatar, CardMedia } from '@mui/material';
import { red } from '@mui/material/colors';

export const Destination = ({ destination }) => {
  return (
    <Card>
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {destination.username.charAt(0).toUpperCase()}
                </Avatar>
            }
            title={destination.destinationTitle}
            subheader={destination.username}
        />
        <CardMedia
            component="img"
            height="194"
            image={destination.destinationImgUrl}
            alt={destination.destinationTitle}
        />
        <CardContent>
            <Typography variant="body2">
                {destination.destinationText}
            </Typography>
        </CardContent>
        <CardActions>
            <Button sx={{ fontWeight: 800 }} size="small">See Stops</Button>
        </CardActions>
    </Card>
  );
}
