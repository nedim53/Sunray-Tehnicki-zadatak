# Team Lineup Builder

A web application for creating and managing sports team lineups. Users can add players, select them for lineups, and view statistics of the most frequently selected players.

## Features

- Add new players to the system
- Create lineups by selecting multiple players (minimum 3 required)
- View top 10 most frequently selected players with submission counts
- Special styling for players whose name length (without spaces) is a prime number

## Tech Stack

**Backend:**
- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)

**Frontend:**
- Next.js
- React
- Tailwind CSS

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd sunray
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory with the following variables:

```
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_SSL=false
```

If using SSL, set `DB_SSL=true` and provide `DB_CA_FILE` path.

### 3. Database Setup

Create the required tables in your PostgreSQL database:

```sql
CREATE TABLE lineups (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lineup_players (
    id SERIAL PRIMARY KEY,
    full_name TEXT UNIQUE NOT NULL,
    lineup_id INT
);

CREATE TABLE player_stats (
    full_name TEXT PRIMARY KEY,
    count INT NOT NULL
);
```

### 4. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the frontend directory:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

1. Start the backend server:

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

2. Start the frontend development server (in a new terminal):

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

### Production Mode

1. Build the frontend:

```bash
cd frontend
npm run build
```

2. Start the frontend:

```bash
npm start
```

3. Start the backend:

```bash
cd backend
npm start
```
## API Endpoints

- `GET /api/players` - Get all players
- `POST /api/players` - Add a new player
- `POST /api/lineup` - Submit a lineup
- `GET /api/top-players` - Get top 10 players by submission count
- `GET /api/health` - Health check endpoint

