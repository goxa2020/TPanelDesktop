import "./App.css";
import "./themes.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./components/pages/main/MainPage.jsx";
import NotificationsPage from "./components/pages/notifications/NotificationPage.jsx";
import TasksPage from "./components/pages/tasks/TasksPage.jsx";
import LoginPage from "./components/pages/login/LoginPage.jsx"

import Sidebar from "./components/base/Sidebar.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <main className="home text">
        <div className="text">
          <Routes>
            <Route path="/" Component={MainPage} />
            <Route path="/notifications" Component={NotificationsPage} />
            <Route path="/tasks" Component={TasksPage} />
            <Route path="/login" Component={LoginPage} />
          </Routes>

          {/* <MainPage /> */}
        </div>
      </main>
    </BrowserRouter>
  );
}
