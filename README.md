# Countries Fullstack (testing Azure)

A full-stack application with NestJS backend and React frontend. The application provides information about countries around the world. Browse countries, view detailed information, check capital city weather, and save your favorites.
It's my study project to learn how to deal with NestJS and Supabase.

## Features

Country Information: Browse and search countries with detailed information
Weather Data: View real-time weather information for capital cities
User Authentication: Secure authentication with Supabase Auth
Favorites Management: Save and manage your favorite countries (requires login)
Protected Routes: Secured routes and content for authenticated users
Responsive Design: Fully responsive UI that works on mobile and desktop
Dark/Light Mode: Toggle between dark and light themes

## Project Structure

```sh
project-root/
├── backend/         # NestJS application
│   ├── src/         # Source code
│   ├── test/        # Test files
│   └── ...
├── frontend/        # React application
│   ├── src/         # Source code
│   │   ├── api/     # API services
│   │   ├── components/ # React components
│   │   ├── context/ # Context providers
│   │   ├── store/   # Redux store
│   │   ├── theme/   # Theme configuration
│   │   └── types/   # TypeScript interfaces
│   ├── cypress/     # E2E tests
│   └── ...
└── docs/            # Project documentation
```

## Tech Stack

### Frontend

-   React 18 with TypeScript
-   Vite for fast development and building
-   Redux Toolkit for state management
-   Material UI for UI components
-   Axios for API requests
-   Cypress for E2E testing (just tried it)

### Backend

-   NestJS for robust API development
-   TypeScript for type safety
-   Supabase for database and authentication

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm (comes with Node.js)
-   Supabase account (free tier works fine)

## Installation

1. Clone the repository:

```sh
git clone <your-repository-url>
cd <project-directory>
```

2. Install all dependencies (both frontend and backend):

```sh
npm run install:all
```

## Environment Setup

Create a .env file in the root directory:

```
# Supabase credentials:
SUPABASE_URL=https://<your-supabase-instance>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>

# Frontend-specific:
VITE_SUPABASE_URL=${SUPABASE_URL}
VITE_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
VITE_WEATHER_API_KEY=<your-openweather-api-key>
```

## Development

Start both frontend and backend development servers:

```sh
npm run dev
```

The applications will be available at:

-   Frontend: http://localhost:5180
-   Backend: http://localhost:3000

### Available Commands

-   `npm run dev` - Start both frontend and backend in development mode
-   `npm run dev:frontend` - Start only the frontend
-   `npm run dev:backend` - Start only the backend
-   `npm run install:all` - Install dependencies for both projects
-   `npm run install:frontend` - Install frontend dependencies
-   `npm run install:backend` - Install backend dependencies
-   `npm run build` - Build both projects
-   `npm run build:frontend` - Build frontend only
-   `npm run build:backend` - Build backend only

## Testing

### Frontend

```sh
cd cd <project-directory>/frontend
npm run test
```

### Backend

```sh
cd cd <project-directory>/backend
npm run test
```

### Cypress tests (e2e)

```sh
cd cd <project-directory>
npm run dev
npm run cypress:run
```

## Protected Data

The application includes a demonstration of protected routes and content:

### Authentication-Protected Routes

-   Certain routes require user authentication
-   Unauthenticated users are redirected to the login page
-   Authentication state is managed through the AuthContext provider

### Protected Data Management

-   Authenticated users can view their protected data entries
-   Users can create new entries through the CreateEntryForm component
-   Each user can only see their own data entries

### Row-Level Security (RLS)

-   Supabase Row-Level Security policies restrict data access
-   Protected data table enforces user-specific data visibility
-   Security is implemented at both database and application levels

### Testing Protected Routes

To test protected functionality:

-   Create an account or log in
-   Navigate to the Protected Data section
-   View existing entries or create new ones
-   Log out to verify access restrictions

## Deployment

Building for Production

```sh
npm run build
```

This will create production builds for both frontend and backend in their respective /dist directories.

## Development Notes

-   The backend includes CORS configuration for the frontend port (5180);
-   TypeScript is configured for both frontend and backend;
-   ESLint and Prettier are set up for code formatting;
-   Both applications include hot-reload functionality for development;
-   Authentication is handled through Supabase Auth UI;
-   Row-Level Security (RLS) policies are used in Supabase for data protection;
