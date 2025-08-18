import { Grid, Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid'; // type-only import
import adminMetrics from '../data/adminMetrics.json';

const chartData = [
  { name: 'Active Users', users: adminMetrics.usageStats.activeUsers },
  { name: 'Inactive Users', users: adminMetrics.usageStats.totalUsers - adminMetrics.usageStats.activeUsers },
];

const columns: GridColDef[] = [
  { field: 'course', headerName: 'Course', width: 150 },
  { field: 'completionRate', headerName: 'Completion Rate (%)', width: 150 },
];

const rows = [
  { id: 1, course: 'Course A', completionRate: adminMetrics.usageStats.completionRate },
  { id: 2, course: 'Course B', completionRate: 70 },
];

const AdminWidgets = () => {
  return (
    <Grid container spacing={2}>
      <Grid
        sx={{
          flex: '0 0 100%',
          maxWidth: '100%',
          '@media (min-width:900px)': {
            flex: '0 0 50%',
            maxWidth: '50%',
          },
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
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
          </CardContent>
        </Card>
      </Grid>
      <Grid
        sx={{
          flex: '0 0 100%',
          maxWidth: '100%',
          '@media (min-width:900px)': {
            flex: '0 0 50%',
            maxWidth: '50%',
          },
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Completion Rates
            </Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } }
              }}
              autoHeight
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid
        sx={{
          flex: '0 0 100%',
          maxWidth: '100%',
          '@media (min-width:900px)': {
            flex: '0 0 33.3333%',
            maxWidth: '33.3333%',
          },
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h4">{adminMetrics.usageStats.totalUsers}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdminWidgets;
