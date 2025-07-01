# Spealish - Interactive Language Learning Game Platform

![Spealish Logo](public/spealishIcon.png)

## 📖 About The Project

**Spealish** is an interactive multiplayer language learning platform that combines English vocabulary learning with engaging games. The platform offers multiple game modes designed to help users improve their English skills through fun, competitive gameplay.

### 🎮 Game Modes

- **Translation Game** - Players translate words between English and Hebrew in a fishing-themed environment
- **Memory Game** - Classic memory card matching game with English vocabulary
- **Guess the Word** - Word guessing game with virtual keyboard input

### ✨ Key Features

- **Real-time Multiplayer** - Play with friends in real-time using WebSocket connections
- **Room System** - Create or join game rooms with up to 5 players
- **User Authentication** - Secure login system with password reset functionality
- **Guest Login** - Play instantly without registration
- **Score Tracking** - Track your progress and compete with other players
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Multiple Difficulty Levels** - Easy, Medium, and Hard difficulty options

## 🏗️ Architecture

The project consists of two main components:

### Frontend
- **Framework**: React 19 with Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Real-time Communication**: Socket.IO Client
- **Routing**: React Router DOM

### Backend
- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens with bcrypt
- **Real-time Communication**: Socket.IO
- **Email Service**: Nodemailer

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd devClubProject
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables

⚠️ **Never commit `.env` files to your repository!** Add them to `.gitignore`.

#### Backend (.env)
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/spealish
JWT_SECRET=your-secret-key
EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
```

**For Production**: Set these variables in Vercel (frontend) and Render (backend) dashboards with your actual values.

### 🖥️ Running the Application

#### Development Mode (Local)

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

#### Production Deployment

The application is deployed using:
- **Frontend**: [Vercel](https://vercel.com/) - Automatic deployments from Git
- **Backend**: [Render](https://render.com/) - Node.js web service

##### Deploying to Vercel (Frontend)

1. **Connect your repository to Vercel**
   - Visit [vercel.com](https://vercel.com) and sign in
   - Import your Git repository
   - Select the `frontend` folder as the root directory

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Set Environment Variables in Vercel Dashboard**
   ```env
   VITE_API_BASE_URL=https://YOUR_ACTUAL_BACKEND_URL.onrender.com
   ```

##### Deploying to Render (Backend)

1. **Connect your repository to Render**
   - Visit [render.com](https://render.com) and sign in
   - Create a new Web Service
   - Connect your Git repository
   - Select the `backend` folder as the root directory

2. **Configure Service Settings**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`

3. **Set Environment Variables in Render Dashboard**
   ```env
   CLIENT_URL=https://YOUR_ACTUAL_FRONTEND_URL.vercel.app
   MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/spealish
   JWT_SECRET=YOUR_PRODUCTION_JWT_SECRET_KEY
   EMAIL=your-actual-email@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password
   ```

#### Local Development Build

1. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```

## 📁 Project Structure

```
devClubProject/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service functions
│   │   ├── store/          # Redux store and slices
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Static assets
│   ├── public/             # Public assets
│   └── package.json
├── backend/                 # Node.js backend server
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── sockets/           # Socket.IO handlers
│   ├── middlewares/       # Express middlewares
│   ├── config/            # Configuration files
│   └── package.json
└── README.md
```

## 🎯 API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `POST /guest` - Guest login (no registration required)
- `POST /login/resetPassword` - Request password reset
- `POST /resetPassword` - Set new password

### Game Rooms
- `GET /api/rooms` - Get all available rooms
- `POST /api/rooms` - Create a new room
- `GET /api/rooms/:id` - Get room details
- `POST /api/rooms/players/join` - Join a room
- `DELETE /api/rooms/players/remove` - Leave a room

### Game Types & Scores
- `GET /api/game-types` - Get available game types
- `POST /api/score/save` - Save game score
- `GET /api/score/last/:playerId` - Get player's last score

## 🔧 Technologies Used

### Frontend
- React 19
- Redux Toolkit
- React Router DOM
- Socket.IO Client
- Tailwind CSS
- Axios
- React Icons
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- Socket.IO
- JWT (JSON Web Tokens)
- bcrypt
- Nodemailer
- UUID

### Deployment & Hosting
- **Frontend**: [Vercel](https://vercel.com/) - Serverless deployment with automatic Git integration
- **Backend**: [Render](https://render.com/) - Cloud platform for hosting Node.js applications
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud-hosted MongoDB service

## 🎨 Screenshots

### Home Page
![Home Page](docs/screenshots/homepage.png)

### Authentication
![Login](docs/screenshots/login.png)
![Guest Login](docs/screenshots/guestLogIn.png)

### Game Setup
![Create Game](docs/screenshots/createGame.png)
![Room List](docs/screenshots/roomlist.png)
![Waiting Room](docs/screenshots/waitingroom.png)

### Game Modes
![Translation Game](docs/screenshots/Translationgame.png)
![Guess the Word Game](docs/screenshots/chooseawordgame.png)
![Memory Game](docs/screenshots/memorygame.png)

### Statistics
![Statistics](docs/screenshots/stats.png)

## 🌐 Live Demo
[https://spealish.vercel.app](https://spealish.vercel.app)
---

**Happy Learning with Spealish! 🎮📚**
