import { Drawer, Box, Typography, IconButton, Chip, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const classificationColors = {
  Important: 'success',
  Promotions: 'info',
  Social: 'warning',
  Marketing: 'secondary',
  Spam: 'error',
  General: 'default'
};

export default function EmailDetails({ email, classification, onClose }) {
  return (
    <Drawer anchor="right" open={Boolean(email)} onClose={onClose}>
      <Box width={500} p={3} position="relative">
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, right: 16 }}>
          <CloseIcon />
        </IconButton>
        {email && (
          <Box>
            <Typography variant="h6" gutterBottom>Email Details</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" fontWeight="bold">
              Subject: <span style={{ fontWeight: 'normal' }}>{email.payload.headers.find((header) => header.name === 'Subject')?.value}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              From: <span style={{ fontWeight: 'normal' }}>{email.payload.headers.find((header) => header.name === 'From')?.value}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              To: <span style={{ fontWeight: 'normal' }}>{email.payload.headers.find((header) => header.name === 'To')?.value}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              Content: {email.snippet}
            </Typography>
            <Box mt={2}>
              {classification && (
                <Chip
                  label={classification}
                  color={classificationColors[classification] || 'default'}
                  sx={{ mt: 2 }}
                />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
