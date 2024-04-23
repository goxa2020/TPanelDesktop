export default function taskCard({ task }) {
  return (
    <>
      <li key={task.id}>
        <span>{task.name}</span>
        <br/>
        <span>Преподователь: {task.teacher.full_name}</span>
      </li>
    </>
  )
}