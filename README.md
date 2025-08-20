# LMS Dashboard Assignment for 6S Consulting

## Project Overview
This is a frontend application built for the Junior Frontend Engineer Round 2 assignment at 6S Consulting. It implements a role-based Learning Management System (LMS) dashboard with the following key features:
- **Role-Based Dashboard**: Tailored views for Admin and Student roles, including widgets like charts (e.g., usage stats for Admin, progress for Student) and tabular data.
- **Chatbot Modal**: A modal accessible from any page, supporting role-specific static Q&A (from mock JSON data) and inline chart rendering within chat messages.
- **Authentication & RBAC**: Mock login with role selection, persisted in local storage, and enforcement of permissions.
- **Responsiveness**: Adapts to mobile, tablet, and desktop breakpoints.
- **Mock Data**: All data (users, metrics, Q&A, charts) is simulated via JSON files – no backend required.

The app supports at least two roles: Admin and Student, as per the problem statement. Built with modular components, clear comments, and best practices for separation of concerns.

## Tech Stack
- **Framework**: React (with Vite for setup).
- **UI Library**: Material-UI (MUI) for responsive components.
- **Charting Library**: Recharts for dashboard and in-chat visualizations.
- **State Management**: React Context API for role persistence.
- **Other Tools**: LocalStorage for session continuity, JSON for mock data.
- **Deployment**: Hosted on Vercel (link below).

## Setup Instructions
To run the project locally:
1. Clone the repository: `git clone https://github.com/your-username/lms-dashboard-assignment.git`
2. Navigate to the project folder: `cd lms-dashboard-assignment`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev` (or `npm run start` if using Create React App)
5. Open http://localhost:5173 (or the port shown) in your browser.

**Requirements**: Node.js v18+ installed.

## Deployment
The application is hosted on Render: (https://lms-dashboard-mm3v.onrender.com) 

## Usage
- Select a role (Admin or Student) on the login page.
- Explore the dashboard widgets specific to the role.
- Open the chatbot modal from the dashboard to ask role-specific questions (e.g., "Show my weekly progress" to see an inline chart).

## Folder Structure (High-Level)
- `src/`: Main source code.
  - `components/`: Reusable UI components (e.g., widgets, chatbot).
  - `data/`: Mock JSON files (users, metrics, Q&A, charts).
  - `contexts/`: State management (e.g., RoleContext).
  - `pages/`: Main pages (e.g., RoleSelector, Dashboard).
- More details will be added as the project progresses.

## Notes
- This project uses mock data only, as specified.
- For any issues, check the console or refer to the code comments.
- Built by [Your Name] for 6S Consulting assignment.
