import { Box, Typography, Button, Avatar, Paper } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserDetails() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    if (tokens) {
      try {
        await axios.post('/api/revoke', { token: tokens.access_token });
      } catch (error) {
        console.error('Failed to revoke token', error);
      }
    }

    localStorage.removeItem('user');
    localStorage.removeItem('tokens');
    localStorage.removeItem('openAiKey');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <Box sx={{ padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box display="flex" alignItems="center">
        <Avatar src={user.profileImage || '/default-profile.png'} sx={{ width: 56, height: 56, mr: 2 }} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Welcome, {user.name}</Typography>
          <Typography variant="body1" color="text.secondary">Email: {user.email}</Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={() => handleLogout()}
        sx={{ alignSelf: 'flex-start' }}
      >
        Logout
      </Button>
    </Box>
  );
}

