import React, { useState } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import users from '../data/users.json';
import { useRole } from '../contexts/RoleContext';

// Define the shape of a user object for TypeScript
interface User {
  id: number;
  role: string;
  name: string;
  permissions: string[];
}

const RoleSelector = () => {
  const { setCurrentUser } = useRole(); // Access setCurrentUser from context
  const [selectedRole, setSelectedRole] = useState<string>('');

  // Handle login action when the button is clicked
  const handleSelect = () => {
    console.log('handleSelect triggered, selectedRole:', selectedRole); // Debug log
    if (!selectedRole) {
      console.warn('Please select a role before logging in.');
      return;
    }
    const user = users.find((u: User) => u.role === selectedRole);
    if (user) {
      console.log('Found user:', user); // Debug log
      localStorage.setItem('currentRole', JSON.stringify(user)); // Persist user data
      setCurrentUser(user); // Update context with selected user
      console.log('User set in context, currentUser should update:', user); // Debug log
    } else {
      console.error('User not found for selected role:', selectedRole);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: 2,
        maxWidth: '300px',
        margin: 'auto',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Select Your Role
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="role-select-label">Role</InputLabel>
        <Select
          labelId="role-select-label"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value as string)}
          label="Role"
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSelect}>
        Login
      </Button>
    </Box>
  );
};

export default RoleSelector;