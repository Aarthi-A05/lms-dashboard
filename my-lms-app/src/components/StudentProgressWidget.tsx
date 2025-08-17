import { useRole } from '../contexts/RoleContext'; // Import the custom hook
import { Card, CardContent, Typography, List, ListItem } from '@mui/material';
import { hasPermission } from '../utils/rbac'; // Import the RBAC utility
import studentMetrics from '../data/studentMetrics.json'; // Import mock data

// StudentProgressWidget component to display progress stats for Student role
const StudentProgressWidget = () => {
  const { currentUser } = useRole(); // Access current user from context

  // Check if the user has permission to view progress
  if (!hasPermission(currentUser, 'viewProgress')) {
    return null; // Render nothing if permission is lacking
  }

  const { courseProgress, upcomingDeadlines } = studentMetrics;

  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Course Progress
        </Typography>
        <Typography variant="body2">
          Completed: {courseProgress.completed} of {courseProgress.total} ({courseProgress.percentage}%)
        </Typography>
        <Typography variant="h6" gutterBottom>
          Upcoming Deadlines
        </Typography>
        <List>
          {upcomingDeadlines.map((deadline, index) => (
            <ListItem key={index}>
              <Typography variant="body2">
                {deadline.course}: {deadline.date}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default StudentProgressWidget;