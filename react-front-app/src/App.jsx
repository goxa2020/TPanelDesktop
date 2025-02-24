import "./App.css";
import "./themes.js";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRouter";

import MainPage from "./components/pages/main/MainPage.jsx";
import NotificationsPage from "./components/pages/notifications/NotificationPage.jsx";
import ProjectsPage from "./components/pages/projects/ProjectsPage.jsx";
import LoginPage from "./components/pages/login/LoginPage.jsx";

import UnPrivateRoute from "./utils/UnPrivateRouter";
import ProfilePage from "./components/pages/profile/ProfilePage";
import ProjectPage from "./components/pages/project/ProjectPage.tsx";
import Root from "./components/pages/Root";
import ErrorPage from "./components/pages/error/ErrorPage";
import NotFoundPage from "./components/pages/error/not_found/NotFoundPage";

export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/*",
                    element: <NotFoundPage />
                },
                {
                    path: "/",
                    element: <MainPage />
                },
                {
                    path: "/mail",
                    element: <PrivateRoute><NotificationsPage /></PrivateRoute>
                },
                {
                    path: "/notifications",
                    element: <PrivateRoute><NotificationsPage /></PrivateRoute>
                },
                {
                    path: "/projects",
                    element: <PrivateRoute><ProjectsPage /></PrivateRoute>
                },
                {
                    path: "/project/:projectId",
                    element: <PrivateRoute><ProjectPage /></PrivateRoute>,
                    loader: ({ params }) => (params.projectId)
                },
                {
                    path: "/profile",
                    element: <PrivateRoute><ProfilePage /></PrivateRoute>
                },
                {
                    path: "/login",
                    element: <UnPrivateRoute><LoginPage /></UnPrivateRoute>
                }
            ]
        },
    ]);
    return (
        <RouterProvider router={router} />
    );
}
