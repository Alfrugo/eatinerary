import React, { useState } from 'react';
import { TextField, styled, Button, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Wrapper = styled('div')(({ theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(2, 0)};
`);

const SignupForm = ({ closeModal }) => {
  // set initial form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { username, email, password },
      });

      if (!data) {
        throw new Error('something went wrong!');
      }

      console.log(data.addUser);
      Auth.login(data.addUser.token);
      closeModal();
    } catch (err) {
      console.error(err);
    }

    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <Wrapper>
      <Typography variant="h5">
        Sign Up
      </Typography>
      <TextField value={username} onChange={(e) => setUsername(e.target.value)} fullWidth label="Username" variant="outlined" />
      <TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth label="Email" variant="outlined" />
      <TextField value={password} onChange={(e) => setPassword(e.target.value)} fullWidth label="Password" type="password" variant="outlined" />
      <div>
        <Button disabled={!email || !password || !username} onClick={() => handleFormSubmit()} variant='contained' color="primary">
          Sign Up
        </Button>
      </div>
    </Wrapper>
  );
};

export default SignupForm;
