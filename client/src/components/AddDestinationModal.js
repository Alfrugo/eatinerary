import React, { useState, useEffect } from 'react';
import { styled, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

// import Auth from '../utils/auth';
import { Destination } from '../components/Destination';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_DESTINATION, ADD_STOP } from '../utils/mutations';


export const AddDestinationModal = ({ onSave }) => {
  const [showModal, setShowModal] = useState(false);

  const [destinationTitle, setDestinationTitle] = useState();
  const [destinationText, setDestinationText] = useState();
  const [destinationImgUrl, setDestinationImgUrl] = useState();
  const [destinationLocUrl, setDestinationLocUrl] = useState();

  const [addDestination] = useMutation(ADD_DESTINATION);
  const [addStop] = useMutation(ADD_STOP);

  const [stops, setStops] = useState([{
    stopTitle: '',
    stopText: '',
    stopImgUrl: '',
  }]);

  const addStopEntry = () => {
    setStops([...stops, {
      stopTitle: '',
      stopText: '',
      stopImgUrl: '',
    }]);
  }

  const updateStop = (stop, i) => {
    const copy = [...stops];
    copy[i] = stop;
    setStops(copy);
  }

  const save = async () => {
    const { data } = await addDestination({
      variables: { destinationTitle, destinationText, destinationImgUrl, destinationLocUrl },
    });

    await Promise.all(
      stops
        .filter((s) => !!s.stopTitle && !!s.stopText && s.stopImgUrl)
        .map((stop) => addStop({
          variables: { ...stop, destinationId: data.addDestination._id },
        }))
    );

    setShowModal(false);
    onSave();
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)}
        startIcon={<AddIcon />}
        sx={{ fontWeight: 800 }}
        variant='contained'
        color="secondary">Add Destination</Button>
      <Dialog
        fullWidth
        open={showModal}
        onClose={() => setShowModal(false)}>
        <DialogTitle>Add Destination</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField fullWidth label="Destination Title" variant="outlined" value={destinationTitle} onChange={(e) => setDestinationTitle(e.target.value)} />
          <TextField fullWidth multiline label="Description" variant="outlined" value={destinationText} onChange={(e) => setDestinationText(e.target.value)} />
          <TextField fullWidth label="Image URL" variant="outlined" value={destinationImgUrl} onChange={(e) => setDestinationImgUrl(e.target.value)} />
          <TextField fullWidth label="Website URL" variant="outlined" value={destinationLocUrl} onChange={(e) => setDestinationLocUrl(e.target.value)} />
          { stops.map((stop, i) => (
            <>
              <Typography>
                Stop {i + 1}
              </Typography>
              <TextField fullWidth label="Stop Title" variant="outlined" value={stop.stopTitle} onChange={(e) => updateStop({ ...stop, stopTitle: e.target.value }, i)} />
              <TextField fullWidth label="Stop Description" variant="outlined" value={stop.stopText} onChange={(e) => updateStop({ ...stop, stopText: e.target.value }, i)} />
              <TextField fullWidth label="Stop Image URL" variant="outlined" value={stop.stopImgUrl} onChange={(e) => updateStop({ ...stop, stopImgUrl: e.target.value }, i)} />
            </>
          ) ) }
          <Button onClick={() => addStopEntry()}
            startIcon={<AddIcon />}
            sx={{ fontWeight: 800 }}
            variant='contained'
            color="secondary">Add Stop</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => save()} size="large" sx={{ fontWeight: 800 }} endIcon={<SaveIcon />}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
