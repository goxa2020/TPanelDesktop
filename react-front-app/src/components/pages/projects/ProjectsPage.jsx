import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";
import StudentProjectCard from "./StudentProjectCard"
import TeacherProjectCard from "./TeacherProjectCard"
import s from './projectPage.module.scss'


export default function ProjectsPage() {
    const { user } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/projects/", {
            params: {
                user_id: user.user_id
            }
        })
        .then(response => {
                setProjects(response.data);
        })
    }, []);

    return (
      <>
        <h3>Ваши текущие работы:</h3>

        <ol className={s.projectList}>
          {projects.map(project => (
            user.is_teacher ? <TeacherProjectCard project={project} /> : <StudentProjectCard project={project} />
          ))}
          </ol>
      </>
    )
}