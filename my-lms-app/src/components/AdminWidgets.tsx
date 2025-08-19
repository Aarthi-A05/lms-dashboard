import { Card, CardContent, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import adminMetrics from '../data/adminMetrics.json';

const chartData = [
  { name: 'Active Users', users: adminMetrics.usageStats.activeUsers },
  { name: 'Inactive Users', users: adminMetrics.usageStats.totalUsers - adminMetrics.usageStats.activeUsers },
];

// Mock data for Usage Trend
const trendData = [
  { week: 'Week 1', users: 100 },
  { week: 'Week 2', users: 110 },
  { week: 'Week 3', users: 120 },
  { week: 'Week 4', users: 115 },
];

const columns: GridColDef[] = [
  { field: 'course', headerName: 'Course', width: 150 },
  { field: 'completionRate', headerName: 'Completion Rate (%)', width: 180 },
];

const rows = [
  { id: 1, course: 'Course A', completionRate: adminMetrics.usageStats.completionRate },
  { id: 2, course: 'Course B', completionRate: 70 },
];

const AdminWidgets = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        p: 0, // Remove padding to eliminate white space
      }}
    >
      {/* Charts Section - Two charts side by side */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, row on desktop
          justifyContent: 'space-between',
          width: '100%',
          p: 2, // Minimal padding for charts
        }}
      >
        {/* Active vs Inactive Users (Bar Chart) */}
        <Card
          sx={{
            flex: 1,
            maxWidth: { xs: '100%', md: '50%' }, // 50% width on desktop, 100% on mobile
            m: 0, // No margin to avoid gaps
            mr: { md: 2 }, // Small right margin on desktop only
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white for readability
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2, // Consistent padding inside card
            }}
          >
            <Typography variant="h6" gutterBottom className="text-gray-800">
              Active vs Inactive Users
            </Typography>
            <BarChart width={400} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#8884d8" />
            </BarChart>
            <Typography variant="h6" sx={{ mt: 2 }} className="text-gray-800">
              Total Users: {adminMetrics.usageStats.totalUsers}
            </Typography>
          </CardContent>
        </Card>

        {/* Usage Trend Over Weeks (Line Chart) */}
        <Card
          sx={{
            flex: 1,
            maxWidth: { xs: '100%', md: '50%' }, // 50% width on desktop, 100% on mobile
            m: 0, // No margin to avoid gaps
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white for readability
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2, // Consistent padding inside card
            }}
          >
            <Typography variant="h6" gutterBottom className="text-gray-800">
              Usage Trend Over Weeks
            </Typography>
            <LineChart width={400} height={300} data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" />
            </LineChart>
            <Typography variant="h6" sx={{ mt: 2 }} className="text-gray-800">
              Current Active: {adminMetrics.usageStats.activeUsers}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Completion Rates (DataGrid) */}
      <Box sx={{ width: '100%', p: 2 }}>
        <Card sx={{ width: '100%', m: 0, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 2,
            }}
          >
            <Typography variant="h6" gutterBottom className="text-gray-800">
              Completion Rates
            </Typography>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5, page: 0 } },
                }}
                autoHeight
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminWidgets;