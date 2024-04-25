import "./App.css";
import "./themes.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRouter";

import MainPage from "./components/pages/main/MainPage.jsx";
import NotificationsPage from "./components/pages/notifications/NotificationPage.jsx";
import ProjectsPage from "./components/pages/projects/ProjectsPage.jsx";
import LoginPage from "./components/pages/login/LoginPage.jsx";

import Sidebar from "./components/base/Sidebar.jsx";
import UnPrivateRoute from "./utils/UnPrivateRouter";
import ProfilePage from "./components/pages/profile/ProfilePage";
import NotFoundPage from "./components/pages/not_found/NotFoundPage";
import useAxios from "./utils/useAxios";

export default function App() {
  useAxios();
  return (
    <BrowserRouter>
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
              path="/projects"
              element={
                <PrivateRoute>
                  <ProjectsPage />
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
              path="/mail"
              element={
                <PrivateRoute>
                  <NotificationsPage />
                </PrivateRoute>
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
    </BrowserRouter>
  );
}
