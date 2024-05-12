import {useRouteError} from "react-router-dom";
import Sidebar from "../../base/Sidebar";
import NotFoundPage from "./not_found/NotFoundPage";

export default function ErrorPage() {
    const error = useRouteError();
    return (
        <>
            <Sidebar />
            <div className="home text" id="error-page">
                {
                    (error.status === 404) ?
                    <NotFoundPage /> :
                    <>
                        <h1>Упс!</h1>
                        <p>Извините, произошла непредвиденная ошибка.</p>
                        <p>
                            <i>{error.message || error.statusText}</i>
                        </p>
                    </>
                }
            </div>
        </>
    );
}