import s from './projectPage.module.scss'

export default function TeacherProjectCard({ project }) {
    return (
        <li className={s.projectCard} key={project.id}>
            <div className={s.projectName}>{project.name}</div>
            <div className="">НЕ РЕАЛИЗОВАНО</div>
        </li>
    )
}