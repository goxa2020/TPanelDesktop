import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/AuthContext";
import StudentProjectCard from "./StudentProjectCard"
import TeacherProjectCard from "./TeacherProjectCard"
import s from './projectPage.module.scss'
import useAxios, {BaseUrl} from "../../../utils/useAxios";


export default function ProjectsPage() {

    const { user } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get(`${BaseUrl}/projects/`, {
            params: {
                user_id: user.user_id
            }
        })
        .then(response => {
            setProjects(response.data);
            setLoading(false);
        })
        .catch(response => {
            console.log(response);
        })
    }, []);

    return (
        <>
            <h3>Ваши текущие работы:</h3>
            {
                loading ?
                <div className={s.loading}>
                    <h3>загрузка</h3>
                </div> :
                <ol className={s.projectList}>
                    {projects.map(project => (
                        user.is_teacher ?
                        <TeacherProjectCard project={project} key={project.id}/> :
                        <StudentProjectCard project={project} key={project.id}/>
                    ))}
                </ol>
            }
        </>
    )
}