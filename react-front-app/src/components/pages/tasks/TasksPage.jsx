import {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";
import TaskCard from "../../base/TaskCard"

export default function TasksPage() {
    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/tasks/", {
            params: {
                user_id: user.user_id
            }
        })
        .then(response => {
                console.log(response.data);
                setTasks(response.data);
        })
    }, []);

    // tasks.map(item => (
    //     console.log(item.id)
    // ))

    return (
      <>
        <h3>Ваши текущие работы:</h3>
        <br/>
        <ul>
          {tasks.map(task => (
            <TaskCard task={task}/>
          ))}
          </ul>
      </>
    )
}