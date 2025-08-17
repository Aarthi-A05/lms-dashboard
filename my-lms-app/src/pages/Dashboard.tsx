import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useRole } from '../contexts/RoleContext';
import AdminWidgets from '../components/AdminWidgets';
import StudentWidgets from '../components/StudentWidgets';

const Dashboard = () => {
  const { currentUser } = useRole();

  if (!currentUser) return <div>Please select a role or log in</div>;

  const handleLogout = () => {
    localStorage.removeItem('currentRole');
    window.location.reload();
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid>
        <Typography variant="h4" gutterBottom>
          {currentUser.role} Dashboard
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mb: 2 }}>
          Logout
        </Button>
      </Grid>
      {currentUser.role === 'Admin' ? <AdminWidgets /> : <StudentWidgets />}
    </Grid>
  );
};

export default Dashboard;