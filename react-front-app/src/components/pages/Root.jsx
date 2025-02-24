import Sidebar from "../base/Sidebar";
import {Outlet} from "react-router-dom";

export default function Root() {
    return (
        <>
            <Sidebar />
            <main className="home">
                <div className="text">
                    <Outlet />
                </div>
            </main>
        </>
    )
}