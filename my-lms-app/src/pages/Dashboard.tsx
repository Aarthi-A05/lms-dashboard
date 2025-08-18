import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useRole } from '../contexts/RoleContext';
import AdminWidgets from '../components/AdminWidgets';
import StudentWidgets from '../components/StudentWidgets';
import ChatbotModal from '../components/ChatbotModal';

const Dashboard = () => {
  const { currentUser } = useRole();

  if (!currentUser) return <div>Please select a role or log in</div>;

  const handleLogout = () => {
    localStorage.removeItem('currentRole');
    window.location.reload();
  };

  const [chatOpen, setChatOpen] = useState(false);

  const handleChatOpen = () => setChatOpen(true);
  const handleChatClose = () => setChatOpen(false);

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid>
        <Typography variant="h4" gutterBottom>
          {currentUser.role} Dashboard
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mb: 2, mr: 2 }}>
          Logout
        </Button>
        <Button variant="contained" color="primary" onClick={handleChatOpen} sx={{ mb: 2 }}>
          Open Chat
        </Button>
      </Grid>
      {currentUser.role === 'Admin' ? <AdminWidgets /> : <StudentWidgets />}
      <ChatbotModal open={chatOpen} onClose={handleChatClose} />
    </Grid>
  );
};

export default Dashboard;