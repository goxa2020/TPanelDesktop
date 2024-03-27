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

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Sidebar />
        <main className="home text">
          <div className="text">
            <Routes>
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
              <Route path="/login" Component={LoginPage} />
            </Routes>
          </div>
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
}
