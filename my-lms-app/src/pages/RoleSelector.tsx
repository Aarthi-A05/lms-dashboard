import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import users from '../data/users.json';
import { useRole } from '../contexts/RoleContext';

interface User {
  id: number;
  role: string;
  name: string;
  permissions: string[];
}

const RoleSelector = () => {
  const { currentUser, setCurrentUser } = useRole();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isUsersLoaded, setIsUsersLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (users && users.length > 0) {
      setIsUsersLoaded(true);
    } else {
      console.error('users.json is empty or not loaded:', users);
    }
  }, []);

  const handleSelect = () => {
    console.log('handleSelect triggered, selectedRole:', selectedRole);
    if (!isUsersLoaded) {
      console.error('users.json not loaded');
      return;
    }
    if (!selectedRole) {
      console.warn('Please select a role before logging in.');
      return;
    }
    const user = users.find((u: User) => u.role === selectedRole);
    if (user) {
      console.log('Found user:', user);
      localStorage.setItem('currentRole', JSON.stringify(user));
      setCurrentUser(user);
      console.log('User set in context');
    } else {
      console.error('User not found for selected role:', selectedRole);
    }
  };

  const handleLogout = () => {
    if (currentUser) {
      localStorage.removeItem('currentRole'); 
      window.location.reload(); 
    }
  };

  if (!isUsersLoaded) return <div>Loading users data...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Box
        className="w-full max-w-sm p-6 bg-white shadow-lg rounded-2xl"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h5" gutterBottom className="font-semibold text-gray-700">
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleSelect}
          className="w-full mt-3"
        >
          Login
        </Button>
        {currentUser && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            className="w-full mt-3"
          >
            Logout
          </Button>
        )}
      </Box>
    </div>
  );
};

export default RoleSelector;
