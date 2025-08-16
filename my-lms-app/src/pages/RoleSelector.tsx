import React, { useState } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import users from '../data/users.json'; // Import mock users from JSON file

// Define the shape of a user object for TypeScript
interface User {
  id: number;
  role: string;
  name: string;
  permissions: string[];
}

// RoleSelector component to simulate login with role selection
const RoleSelector = ({ onSelectRole }: { onSelectRole: (user: User | null) => void }) => {
  const [selectedRole, setSelectedRole] = useState<string>(''); // State to track selected role

  // Handle the login action when the button is clicked
  const handleSelect = () => {
    if (!selectedRole) {
      // Prevent login if no role is selected
      console.warn('Please select a role before logging in.');
      return;
    }
    const user = users.find((u: User) => u.role === selectedRole); // Find user by role
    if (user) {
      localStorage.setItem('currentRole', JSON.stringify(user)); // Persist user data in localStorage
      onSelectRole(user); // Notify parent component of the selected role
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