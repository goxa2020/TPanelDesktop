import s from './projectPage.module.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import {BaseUrl} from "../../../utils/useAxios";

export default function StudentProjectCard({ project }) {
    const [teacher, setTeacher] = useState("---");

    useEffect(() => {
        axios.get(`${BaseUrl}/user/${project.teacher}`)
        .then(response => {
            setTeacher(response.data);
        })
    }, [project.teacher]);

    return (
        <li>
            <NavLink className={s.projectCard} to={''}>
                <div className={s.projectName}>{project.name}</div>

                <div className={s.projectTeacher}>Преподаватель: {teacher.first_name} {teacher.last_name}</div>
            </NavLink>

        </li>
    )
}