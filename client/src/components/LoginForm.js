// see SignupForm.js for comments
import React, { useState } from 'react';
import { TextField, styled, Button, Typography } from '@mui/material';

import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const Wrapper = styled('div')(({ theme }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing(2, 0)};
`);

const LoginForm = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async () => {
    try {
      const { data } = await login({
        variables: { email, password },
      });

      if (!data) {
        throw new Error('something went wrong!');
      }

      console.log(data.login);

      Auth.login(data.login.token);
      closeModal();
    } catch (err) {
      console.error(err);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <Wrapper>
      <Typography variant="h5">
        Login
      </Typography>
      <TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth label="Email" variant="outlined" />
      <TextField value={password} onChange={(e) => setPassword(e.target.value)} fullWidth label="Password" type="password" variant="outlined" />
      <div>
        <Button disabled={!email || !password} onClick={() => handleFormSubmit()} variant='contained' color="primary">
          Login
        </Button>
      </div>
    </Wrapper>
  );
};

export default LoginForm;
