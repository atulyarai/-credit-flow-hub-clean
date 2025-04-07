
# CreditFlow - Credit Application Management System

<div align="center">
  <img src="public/Screenshot 2025-04-07 100637.png" alt="CreditFlow Logo" width="500" height="240" style="border-radius: 10px;">
  <img src="public/Screenshot 2025-04-07 100718.png" alt="CreditFlow Logo" width="500" height="240" style="border-radius: 10px;">
  <img src="public/Screenshot 2025-04-07 100815.png" alt="CreditFlow Logo" width="500" height="240" style="border-radius: 10px;">
  <img src="public/Screenshot 2025-04-07 100838.png" alt="CreditFlow Logo" width="500" height="240" style="border-radius: 10px;">
  <h1>CreditFlow</h1>
  <p><strong>Streamline Your Credit Application Process</strong></p>
  <p>
    <a href="#features">Features</a> •
    <a href="#demo">Demo</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#project-structure">Project Structure</a> •
    <a href="#user-roles">User Roles</a> •
    <a href="#roadmap">Roadmap</a> •
    <a href="#license">License</a>
  </p>
</div>

## About CreditFlow

CreditFlow is a modern web application designed to simplify and streamline the credit application process. It provides a user-friendly interface for applicants to submit credit applications, for verifiers to review them, and for administrators to manage the entire system. With real-time status tracking and a secure authentication system, CreditFlow makes credit management simpler than ever.

## Demo

### Live Demo
Visit the live demo: [CreditFlow Live Demo](https://credit-flow-hub.lovable.app/)

### Demo Accounts

Test the application with these demo accounts:

| Role | Email | Password |
|------|-------|----------|
| User | user@example.com | password |
| Verifier | verifier@example.com | password |
| Admin | admin@example.com | password |

## Installation

### Prerequisites
- Node.js (v16.0 or higher)
- npm (v7.0 or higher)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/creditflow.git
   cd creditflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```
   VITE_API_URL=your_api_url
   VITE_AUTH_SECRET=your_auth_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

## Usage

### For Users
1. Register for a new account or login with existing credentials
2. Navigate to the dashboard to view your application status
3. Create a new application by clicking the "New Application" button
4. Fill in all required information and submit
5. Track your application status in real-time

### For Verifiers
1. Login with verifier credentials
2. View pending applications in the dashboard
3. Select an application to review details
4. Approve or reject with comments
5. Move to the next application in queue

### For Admins
1. Login with admin credentials
2. Access system-wide analytics and reports
3. Manage users and verifiers
4. Configure system settings and parameters

## Tech Stack

CreditFlow is built with a modern technology stack:

- **Frontend**
  - React.js (with TypeScript)
  - Vite (for fast development)
  - Tailwind CSS (for styling)
  - shadcn/ui (component library)
  - React Router (for navigation)
  - TanStack Query (for data fetching)
  - Recharts (for data visualization)

- **UI Components**
  - Responsive layout design
  - Custom form components
  - Interactive charts and graphs
  - Modal dialogs and notifications

- **Tools & Utilities**
  - ESLint (code linting)
  - Prettier (code formatting)
  - TypeScript (type safety)

## Project Structure

```
creditflow/
├── public/                 # Static assets
├── src/                    # Source files
│   ├── components/         # Reusable components
│   │   ├── ui/             # UI components from shadcn
│   │   └── dashboard/      # Dashboard-specific components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Main page components
│   ├── utils/              # Helper functions
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Entry point
├── .env                    # Environment variables
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## User Roles

CreditFlow implements a three-tier role system:

### 1. User
- Can register and create a profile
- Submit new credit applications
- View and track their application status
- Receive notifications on application updates

### 2. Verifier
- Review submitted applications
- Request additional information from applicants
- Approve or reject applications
- Add notes and feedback to applications

### 3. Admin
- Complete system oversight
- User and verifier management
- Access to all application data
- System configuration and settings



<div align="center">
  <p>Built with ❤️ by atulyarai</p>
</div>
