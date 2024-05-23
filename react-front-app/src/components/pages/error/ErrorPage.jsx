import {NavLink, useRouteError} from "react-router-dom";
import Sidebar from "../../base/Sidebar";

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <>
            <Sidebar />
            <div className="home text" id="error-page">
                <h1>Упс!</h1>
                <p>Извините, произошла непредвиденная ошибка.</p>
                <p>
                    <i>{error.statusText}</i>
                </p>
                <NavLink to={"/"}>На главную</NavLink>
            </div>
        </>
    );
}