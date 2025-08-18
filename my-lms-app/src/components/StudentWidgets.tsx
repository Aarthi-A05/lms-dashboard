import { Grid, Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid'; // type-only import
import studentMetrics from '../data/studentMetrics.json';

const pieData = [
  { name: 'Completed', value: studentMetrics.courseProgress.completed },
  { name: 'Remaining', value: studentMetrics.courseProgress.total - studentMetrics.courseProgress.completed },
];

const COLORS = ['#0088FE', '#FFBB28'];

const columns: GridColDef[] = [
  { field: 'quiz', headerName: 'Quiz', width: 150 },
  { field: 'score', headerName: 'Score (%)', width: 120 },
  { field: 'date', headerName: 'Date', width: 150 },
];

const rows = studentMetrics.quizHistory.map((item, index) => ({ id: index + 1, ...item }));

const StudentWidgets = () => {
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
              Course Progress
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
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
              Quiz History
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
            <Typography variant="h6">Progress Percentage</Typography>
            <Typography variant="h4">{studentMetrics.courseProgress.percentage}%</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StudentWidgets;
