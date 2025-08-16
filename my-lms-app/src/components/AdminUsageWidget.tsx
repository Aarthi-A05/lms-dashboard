import { useRole } from '../contexts/RoleContext'; // Import the custom hook
import { Card, CardContent, Typography } from '@mui/material';
import { hasPermission } from '../utils/rbac'; // Import the RBAC utility

// AdminUsageWidget component to display usage stats for Admin role
const AdminUsageWidget = () => {
  const { currentUser } = useRole(); // Access current user from context

  // Check if the user has permission to view usage stats
  if (!hasPermission(currentUser, 'viewUsageStats')) {
    return null; // Render nothing if permission is lacking
  }

  // Mock data for demonstration (to be replaced with adminMetrics.json in Phase 3)
  const usageStats = {
    totalUsers: 150,
    activeUsers: 120,
    completionRate: 85,
  };

  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Usage Statistics
        </Typography>
        <Typography variant="body2">
          Total Users: {usageStats.totalUsers}
        </Typography>
        <Typography variant="body2">
          Active Users: {usageStats.activeUsers}
        </Typography>
        <Typography variant="body2">
          Completion Rate: {usageStats.completionRate}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AdminUsageWidget;