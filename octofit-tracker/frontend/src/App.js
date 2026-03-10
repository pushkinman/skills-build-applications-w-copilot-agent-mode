import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api';

  console.log('OctoFit API base URL:', apiBaseUrl);

  return (
    <div className="app-shell pb-5">
      <div className="container py-4">
        <header className="mb-4">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="display-5 fw-bold mb-2">OctoFit Tracker</h1>
              <p className="lead text-muted mb-3">
                Monitor activities, users, teams, workouts, and rankings from one dashboard.
              </p>
              <p className="mb-0">
                <span className="fw-semibold me-2">API Root:</span>
                <a className="link-primary" href={`${apiBaseUrl}/`} target="_blank" rel="noreferrer">
                  {`${apiBaseUrl}/`}
                </a>
              </p>
            </div>
          </div>
        </header>

        <nav className="navbar navbar-expand-lg app-navbar rounded-3 shadow-sm mb-4">
          <div className="container-fluid px-3">
            <span className="navbar-brand fw-semibold">Sections</span>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#octofitNav"
              aria-controls="octofitNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="octofitNav">
              <div className="navbar-nav gap-2 ms-lg-2">
                <NavLink
                  to="/activities"
                  className={({ isActive }) =>
                    `nav-link px-3 rounded-pill ${isActive ? 'active bg-primary text-white' : 'text-dark'}`
                  }
                >
                  Activities
                </NavLink>
                <NavLink
                  to="/leaderboard"
                  className={({ isActive }) =>
                    `nav-link px-3 rounded-pill ${isActive ? 'active bg-primary text-white' : 'text-dark'}`
                  }
                >
                  Leaderboard
                </NavLink>
                <NavLink
                  to="/teams"
                  className={({ isActive }) =>
                    `nav-link px-3 rounded-pill ${isActive ? 'active bg-primary text-white' : 'text-dark'}`
                  }
                >
                  Teams
                </NavLink>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    `nav-link px-3 rounded-pill ${isActive ? 'active bg-primary text-white' : 'text-dark'}`
                  }
                >
                  Users
                </NavLink>
                <NavLink
                  to="/workouts"
                  className={({ isActive }) =>
                    `nav-link px-3 rounded-pill ${isActive ? 'active bg-primary text-white' : 'text-dark'}`
                  }
                >
                  Workouts
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        <section className="card shadow-sm border-0">
          <div className="card-body p-4">
            <Routes>
              <Route path="/" element={<Navigate to="/activities" replace />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/users" element={<Users />} />
              <Route path="/workouts" element={<Workouts />} />
            </Routes>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
