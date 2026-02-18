# Smart Project Management Dashboard

A modern, responsive project management dashboard built with React.js. This application provides full CRUD functionality for managing projects with a Kanban-style board, authentication, and theme switching capabilities.

## Features

### Authentication
- User Registration with validation
- User Login with credential verification
- Protected routes
- Auto logout after 10 minutes of inactivity
- Persistent login state (survives page refresh)

### Dashboard
- Sidebar navigation
- Top navigation bar with theme toggle
- Dark/Light theme (persisted)
- Responsive layout (Mobile + Tablet + Desktop)

### Project Management
- Create new projects
- Edit existing projects
- Delete projects with confirmation
- View project details
- Status management (Pending / In Progress / Completed)
- Drag and drop between status columns (Kanban style)

### Advanced Features
- Global state management using Context API
- Search and filter functionality
- Sorting by date/title
- Client-side pagination
- Form validation
- Confirmation modal before delete
- Toast notifications for actions
- Loading skeleton UI
- Error boundary implementation

## Tech Stack

- React.js 18 (Functional Components + Hooks)
- React Router DOM 6
- Vite
- HTML5
- CSS3 (Flexbox/Grid)
- JavaScript (ES6+)

## Project Structure

```
smart-pm-dashboard/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Sidebar.jsx
│   │   ├── Topbar.jsx
│   │   ├── KanbanBoard.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── AddProjectModal.jsx
│   │   ├── EditProjectModal.jsx
│   │   ├── ConfirmModal.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Pagination.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── ToastProvider.jsx
│   ├── pages/            # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ProjectDetails.jsx
│   │   └── NotFound.jsx
│   ├── context/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── ProjectContext.jsx
│   ├── hooks/            # Custom hooks
│   │   ├── useIdleLogout.jsx
│   │   └── useLocalStorage.jsx
│   ├── utils/            # Utility functions
│   │   └── storage.js
│   ├── styles/           # CSS files
│   │   ├── global.css
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   ├── sidebar.css
│   │   ├── topbar.css
│   │   ├── kanban.css
│   │   ├── project-card.css
│   │   ├── project-details.css
│   │   ├── toast.css
│   │   ├── modal.css
│   │   ├── search-bar.css
│   │   └── pagination.css
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Setup Instructions

1. **Clone the repository**
   
```
bash
   git clone <repository-url>
   cd smart-pm-dashboard
   
```

2. **Install dependencies**
   
```
bash
   npm install
   
```

3. **Start the development server**
   
```
bash
   npm run dev
   
```

4. **Build for production**
   
```
bash
   npm run build
   
```

## Usage

1. **Register**: Create a new account with username and password (min 6 characters)
2. **Login**: Use your registered credentials to login
3. **Create Projects**: Click "Add Project" button to create new projects
4. **Manage Projects**: 
   - Drag and drop projects between status columns
   - Click on a project to view details
   - Edit or delete projects as needed
5. **Search & Filter**: Use the search bar to filter projects by title
6. **Theme Toggle**: Switch between dark and light themes

## Screenshots
<img width="1919" height="1025" alt="Screenshot 2026-02-19 001143" src="https://github.com/user-attachments/assets/2acd75e2-e9fc-46d0-bf20-78424944a6a9" />
<img width="1916" height="1027" alt="Screenshot 2026-02-19 001200" src="https://github.com/user-attachments/assets/78758bb1-aaaf-4a40-ace0-8a8130ee9f24" />
<img width="1919" height="1026" alt="Screenshot 2026-02-19 001216" src="https://github.com/user-attachments/assets/723c848e-482b-4b11-8d3c-d06df259d18d" />

## License

@Herlan Pio
