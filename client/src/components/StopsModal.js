import React, { useState } from 'react';
import { styled, Button, Dialog, DialogTitle, DialogContent, Typography, Box, IconButton } from '@mui/material';

const Wrapper = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing(3)};
`);

export const StopsModal = ({ user, stops, destinationTitle, onPositiveReaction, onNeutralReaction, onNegativeReaction }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)} sx={{ fontWeight: 800 }}>See Stops</Button>
      <Dialog
        fullWidth
        open={showModal}
        onClose={() => setShowModal(false)}>
        <DialogTitle>Stops in {destinationTitle}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          { stops.map((stop, i) => (
            <Wrapper key={i}>
              <Typography sx={{ fontWeight: 800 }} gutterBottom>
                Stop {i + 1} - {stop.stopTitle}
              </Typography>
              <Typography gutterBottom>
                {stop.stopText}
              </Typography>
              <img src={stop.stopImgUrl} />
              <Box marginTop={2} display="flex" gap={1}>
                <Button disabled={!user} onClick={() => onPositiveReaction(stop._id)} variant='outlined'>
                  <Box fontSize="18px" color>🤩 {stop.numPositiveReactions}</Box>
                </Button>
                <Button disabled={!user} onClick={() => onNeutralReaction(stop._id)} variant='outlined'>
                  <Box fontSize="18px" color>🤔 {stop.numNeutralReactions}</Box>
                </Button>
                <Button disabled={!user} onClick={() => onNegativeReaction(stop._id)} variant='outlined'>
                  <Box fontSize="18px" color>😔 {stop.numNegativeReactions}</Box>
                </Button>
              </Box>
            </Wrapper>
          ) ) }
        </DialogContent>
      </Dialog>
    </>
  );
};
