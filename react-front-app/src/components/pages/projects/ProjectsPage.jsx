import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";
import StudentProjectCard from "./StudentProjectCard"
import TeacherProjectCard from "./TeacherProjectCard"
import s from './projectPage.module.scss'
import {BaseUrl} from "../../../utils/useAxios";


export default function ProjectsPage() {
    const { user } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get(`${BaseUrl}/projects/`, {
            params: {
                user_id: user.user_id
            }
        })
        .then(response => {
                setProjects(response.data);
        })
    }, [user.user_id]);

    return (
      <>
        <h3>Ваши текущие работы:</h3>

        <ol className={s.projectList}>
          {projects.map(project => (
            user.is_teacher ?
              <TeacherProjectCard project={project} key={project.id} /> :
              <StudentProjectCard project={project} key={project.id} />
          ))}
          </ol>
      </>
    )
}