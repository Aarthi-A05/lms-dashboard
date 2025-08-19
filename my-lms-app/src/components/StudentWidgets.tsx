import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import studentMetrics from '../data/studentMetrics.json';

const pieData = [
  { name: 'Completed', value: studentMetrics.courseProgress.completed },
  { name: 'Remaining', value: studentMetrics.courseProgress.total - studentMetrics.courseProgress.completed },
];

const COLORS = ['#0088FE', '#FFBB28'];

// Mock data for Quiz Score Trend (based on quizHistory dates and scores)
const trendData = studentMetrics.quizHistory.map((item) => ({
  date: item.date,
  score: item.score,
}));

const columns: GridColDef[] = [
  { field: 'quiz', headerName: 'Quiz', width: 150 },
  { field: 'score', headerName: 'Score (%)', width: 120 },
  { field: 'date', headerName: 'Date', width: 150 },
];

const rows = studentMetrics.quizHistory.map((item, index) => ({ id: index + 1, ...item }));

const StudentWidgets = () => {
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
        {/* Course Progress (Pie Chart) */}
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
              Course Progress
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            <Typography variant="h5" sx={{ mt: 2 }} className="text-gray-800">
              {studentMetrics.courseProgress.percentage}% Completed
            </Typography>
          </CardContent>
        </Card>

        {/* Quiz Score Trend (Area Chart) */}
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
              Quiz Score Trend
            </Typography>
            <AreaChart width={400} height={300} data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="score" stroke="#ff7300" fill="#ff7300" fillOpacity={0.3} />
            </AreaChart>
            <Typography variant="h6" sx={{ mt: 2 }} className="text-gray-800">
              Latest Score: {trendData.length > 0 ? trendData[trendData.length - 1].score : 'N/A'}%
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Quiz History (DataGrid) */}
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
              Quiz History
            </Typography>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[4]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 4, page: 0 } },
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

export default StudentWidgets;