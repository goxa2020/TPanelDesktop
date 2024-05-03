import s from './projectPage.module.scss'
import {useEffect, useState} from "react";
import axios from "axios";

export default function StudentProjectCard({ project }) {
    const [teacher, setTeacher] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user/${project.teacher}`)
        .then(response => {
            console.log(response.data)
            setTeacher(response.data);
        })
    }, []);

    return (
      <li className={s.projectCard} key={project.id}>
        <div className={s.projectName}>{project.name}</div>

        <div className={s.projectTeacher}>Преподаватель: {teacher.first_name} {teacher.last_name}</div>
      </li>
    )
}