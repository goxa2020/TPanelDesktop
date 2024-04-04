import "./App.css";
import "./themes.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRouter";

import MainPage from "./components/pages/main/MainPage.jsx";
import NotificationsPage from "./components/pages/notifications/NotificationPage.jsx";
import TasksPage from "./components/pages/tasks/TasksPage.jsx";
import LoginPage from "./components/pages/login/LoginPage.jsx";

import Sidebar from "./components/base/Sidebar.jsx";
import { AuthProvider } from "./context/AuthContext";
import UnPrivateRoute from "./utils/UnPrivateRouter";
import ProfilePage from "./components/pages/profile/ProfilePage";
import NotFoundPage from "./components/pages/not_found/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Sidebar />
        <main className="home">
          <div className="text">
            <Routes>
              <Route path="*" Component={NotFoundPage} />
              <Route path="/" Component={MainPage} />
              <Route
                path="/notifications"
                element={
                  <PrivateRoute>
                    <NotificationsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <PrivateRoute>
                    <TasksPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <UnPrivateRoute>
                    <LoginPage />
                  </UnPrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
