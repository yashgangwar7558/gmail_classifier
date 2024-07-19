import React from 'react'; 
import { Box, Typography, List, ListItem, ListItemText, Chip, Divider, Paper } from '@mui/material';

export default function EmailList({ emails, classifications, onEmailClick }) {
  return (
    <Box sx={{ padding: 2, maxHeight: '70vh', overflow: 'auto' }}>
      <List>
        {emails.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center">
            No emails available
          </Typography>
        ) : (
          emails.map((email) => {
            const classification = classifications[email.id];
            return (
              <React.Fragment key={email.id}>
                <ListItem button onClick={() => onEmailClick(email, classification)} sx={{ mb: 1 }}>
                  <ListItemText
                    primary={email.payload.headers.find((header) => header.name === 'Subject')?.value || 'No Subject'}
                    secondary={email.snippet}
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                    secondaryTypographyProps={{ color: 'text.secondary' }}
                  />
                  {classification && (
                    <Chip
                      label={classification}
                      color={
                        classification === 'Important'
                          ? 'success'
                          : classification === 'Promotions'
                          ? 'info'
                          : classification === 'Social'
                          ? 'warning'
                          : classification === 'Marketing'
                          ? 'default'
                          : classification === 'Spam'
                          ? 'error'
                          : 'default'
                      }
                      sx={{ ml: 2 }}
                    />
                  )}
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })
        )}
      </List>
    </Box>
  );
}
