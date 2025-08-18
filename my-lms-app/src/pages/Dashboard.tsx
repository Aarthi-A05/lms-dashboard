import { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useRole } from '../contexts/RoleContext';
import AdminWidgets from '../components/AdminWidgets';
import StudentWidgets from '../components/StudentWidgets';
import ChatbotModal from '../components/ChatbotModal';

const Dashboard = () => {
  const { currentUser } = useRole();

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-700">
          Please select a role or log in
        </p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('currentRole');
    window.location.reload();
  };

  const [chatOpen, setChatOpen] = useState(false);

  const handleChatOpen = () => setChatOpen(true);
  const handleChatClose = () => setChatOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6 sticky top-0 bg-gray-50 z-10 shadow-sm py-4 px-6">
        {/* Left Header */}
        <Typography variant="h4" className="font-bold text-gray-800">
          {currentUser.role} Dashboard
        </Typography>

        {/* Right Buttons */}
        <div className="flex gap-3">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            aria-label="Logout button"
            className="px-4"
          >
            Logout
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleChatOpen}
            aria-label="Open chat button"
            className="px-4"
          >
            Open Chat
          </Button>
        </div>
      </div>

      {/* Widgets Section */}
      <Grid container spacing={2}>
        {currentUser.role === 'Admin' ? <AdminWidgets /> : <StudentWidgets />}
      </Grid>

      {/* Chatbot Modal */}
      <ChatbotModal open={chatOpen} onClose={handleChatClose} />
    </div>
  );
};

export default Dashboard;
