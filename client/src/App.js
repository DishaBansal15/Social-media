import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import CreatePost from './components/CreatePost';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Notifications from './components/Notifications';
import CreateStory from './components/CreateStory';

// Route Protectors
import AuthProtector from './RouteProtectors/AuthProtector';
import LoginProtector from './RouteProtectors/LoginProtector';

function App() {
  return (
    <div className="App">
      {/* App Routes */}
      <Routes>
        <Route
          exact
          path="/"
          element={<AuthProtector><Home /></AuthProtector>}
        />
        <Route
          path="/landing"
          element={<LoginProtector><LandingPage /></LoginProtector>}
        />
        <Route
          path="/profile/:id"
          element={<AuthProtector><Profile /></AuthProtector>} // Handles dynamic user profile based on ID
        />
        <Route
          path="/my-profile"
          element={<AuthProtector><Profile /></AuthProtector>} // Handles logged-in user's profile
        />
        <Route
          path="/chat"
          element={<AuthProtector><Chat /></AuthProtector>}
        />
      </Routes>

      {/* Floating Components */}
      <CreatePost />
      <CreateStory />
      <Notifications />
    </div>
  );
}

export default App;
