"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography, CircularProgress } from '@mui/material';
import { Mail as MailIcon, Class as ClassIcon, Logout as LogoutIcon } from '@mui/icons-material';
import EmailList from './components/EmailList';
import EmailDetails from './components/EmailDetails';
import UserDetails from './components/UserDetails';
import axios from 'axios';

export default function Home() {
  const router = useRouter();
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [classifications, setClassifications] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    const handleAuthentication = async () => {
      const params = new URLSearchParams(window.location.search);
      const urlUser = params.get('user');
      const urlTokens = params.get('tokens');

      if (urlUser && urlTokens) {
        try {
          const userData = JSON.parse(decodeURIComponent(urlUser));
          const tokenData = JSON.parse(decodeURIComponent(urlTokens));

          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('tokens', JSON.stringify(tokenData));

          router.replace(router.pathname);
        } catch (error) {
          console.error('Failed to parse user or tokens', error);
        }
      }

      const storedUser = localStorage.getItem('user');
      const storedTokens = localStorage.getItem('tokens');

      if (!storedUser || !storedTokens) {
        router.push('/login');
      }
    };

    if (typeof window !== 'undefined') {
      handleAuthentication();
    }
  }, [router]);

  const fetchEmails = async () => {
    setLoading(true);
    setLoadingMessage('Fetching emails...');
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      const response = await axios.post('/api/emails', { tokens });
      setEmails(response.data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const classifyEmails = async () => {
    setLoading(true);
    setLoadingMessage('Classifying emails...');
    try {
      const response = await axios.post('/api/classify', {
        openAiKey: localStorage.getItem('openAiKey') || process.env.OPENAI_API_KEY,
        emails,
      });
      setClassifications(response.data.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.classification }), {}));
    } catch (error) {
      console.error('Error classifying emails:', error);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const handleEmailClick = (email) => {
    const classification = classifications[email.id];
    setSelectedEmail({ ...email, classification });
  };

  return (
    <Box p={4} bgcolor="#f5f5f5" minHeight="100vh">
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <UserDetails />
      </Paper>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h5" gutterBottom>Email Actions</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<MailIcon />}
              onClick={fetchEmails}
              disabled={loading}
            >
              Fetch Emails
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ClassIcon />}
              onClick={classifyEmails}
              disabled={loading}
            >
              Classify Emails
            </Button>
          </Box>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2 }}>
        {loading ? (
          <Box display="flex" alignItems="center" justifyContent="center" minHeight="200px">
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>{loadingMessage}</Typography>
          </Box>
        ) : emails.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center">
            No fetched emails
          </Typography>
        ) : (
          <EmailList emails={emails} classifications={classifications} onEmailClick={handleEmailClick} />
        )}
      </Paper>
      <EmailDetails email={selectedEmail} classification={selectedEmail?.classification} onClose={() => setSelectedEmail(null)} />
    </Box>
  );
}

