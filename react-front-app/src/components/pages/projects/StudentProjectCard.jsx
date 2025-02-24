import s from './projectPage.module.scss'
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import useAxios, {BaseUrl} from "../../../utils/useAxios";

export default function StudentProjectCard({ project }) {
    const [teacher, setTeacher] = useState("---");
    const axiosInstance = useAxios();
    useEffect(() => {
        axiosInstance.get(`${BaseUrl}/user/${project.teacher}`)
        .then(response => {
            setTeacher(response.data);
        })
    }, []);

    return (
        <li>
            <NavLink className={s.projectCard} to={`/project/${project.id}`}>
                <div className={s.projectName}>{project.name}</div>

                <div className={s.projectTeacher}>Преподаватель: {teacher.first_name} {teacher.last_name}</div>
            </NavLink>

        </li>
    )
}