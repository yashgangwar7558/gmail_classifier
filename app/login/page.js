"use client";

import { Box, Button, Typography, Paper, Avatar, TextField, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [openAiKey, setOpenAiKey] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!openAiKey) {
      setError('OpenAI Key is required');
      return;
    }

    localStorage.setItem('openAiKey', openAiKey);
    
    const response = await fetch('/api/auth/login');
    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar sx={{ m: 1, mb: 2, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4" mb={2}>Login to Email Classifier</Typography>
          <Typography variant="subtitle1" mb={3}>Effortlessly classify your Gmail messages</Typography>
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
          <TextField
            label="OpenAI Key"
            variant="outlined"
            value={openAiKey}
            onChange={(e) => setOpenAiKey(e.target.value)}
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ mt: 3 }}
            fullWidth
          >
            Login with Google
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

