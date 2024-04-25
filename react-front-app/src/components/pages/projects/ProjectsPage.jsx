import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";
import ProjectCard from "../../base/ProjectCard"

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
                console.log(response.data);
                setProjects(response.data);
        })
    }, []);

    // projects.map(item => (
    //     console.log(item.id)
    // ))

    return (
      <>
        <h3>Ваши текущие работы:</h3>
        <br/>
        <ul>
          {projects.map(project => (
            <ProjectCard project={project}/>
          ))}
          </ul>
      </>
    )
}