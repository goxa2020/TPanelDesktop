export default function projectCard({ project }) {
  return (
    <>
      <li key={project.id}>
        <span>{project.name}</span>
        <br/>
        <span>Преподователь: {project.teacher.full_name}</span>
      </li>
    </>
  )
}