// noinspection JSIgnoredPromiseFromCall

import {useContext, useEffect, useState} from "react";
import type { User as StreamUser, Channel as StreamChannel } from 'stream-chat';
import { useCreateChatClient,
         Chat,
         Channel,
         ChannelHeader,
         MessageInput,
         MessageList,
         Thread,
         Window
} from 'stream-chat-react';

import useAxios, {BaseUrl} from "../../../utils/useAxios";
import {useLoaderData} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";

import 'stream-chat-react/dist/css/v2/index.css';

import {Project, Student, Task, Teacher, User} from '../../../utils/types';

export default function ProjectPage() {
    const { user } = useContext<{user: User}>(AuthContext);

    const project_id = useLoaderData();
    const axiosInstance = useAxios();
    const [project, setProject] = useState<Project>();
    const [projectLoaded, setProjectLoaded] = useState(false);
    const [tasksLoaded, setTasksLoaded] = useState(false);
    const [studentsLoaded, setStudentsLoaded] = useState(false);
    const [teacher, setTeacher] = useState<Teacher>();
    const [students, setStudents] = useState<Student[]>();
    const [tasks, setTasks] = useState<Task[]>();
    let tasksArray: Task[] = [];
    let studentsArray: Student[] = [];
    const [channel, setChannel] = useState<StreamChannel>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosInstance.get(`${BaseUrl}/project/${project_id}`)
            setProject(response.data);
            setProjectLoaded(true);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosInstance.get(`${BaseUrl}/user/${project?.teacher}`)
            setTeacher(response.data);
        }
        if (projectLoaded) {
            fetchData();
        }
    }, [projectLoaded])
    useEffect(() => {
        if (projectLoaded) {
            project.students.forEach((student) => {
                axiosInstance.get(`${BaseUrl}/user/${student}`)
                    .then(response => {
                        studentsArray.push(response.data);
                        if (project.students.length === studentsArray.length) {
                            setStudents(studentsArray.sort((a, b) => (a.id - b.id)));
                            setStudentsLoaded(true);
                         }
                    })
            })
        }
    }, [projectLoaded])
    useEffect(() => {
        if (projectLoaded) {
            project.tasks.forEach((task) => {
                axiosInstance.get(`${BaseUrl}/task/${task}`)
                    .then(response => {
                        tasksArray.push(response.data)
                        if (project.tasks.length === tasksArray.length) {
                            setTasks(tasksArray.sort((a, b) => (a.id - b.id)));
                            setTasksLoaded(true);
                        }
                    })
            })
        }
    }, [projectLoaded])


    // настройки чата
    const userName = user.full_name;
    const apiKey = '5dhk5bugg9x3';
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMiJ9.VN1wmRuJa3ri2UNHjGrTJ_W4-GWaz6FQ5jIy3GlU_ls'
    // const userToken = authTokens.access
    const chatUser: StreamUser = {
        id: user.user_id.toString(),
        name: userName,
        username: user.username,
        image: `https://getstream.io/random_png/?name=${userName}`,
    };
    const client = useCreateChatClient({
        apiKey,
        tokenOrProvider: userToken,
        userData: chatUser,
    });

    useEffect(() => {
        if (!client) return;

        const channel = client.channel('messaging', project.id.toString(), {
            image: `https://getstream.io/random_png/?name=${project.name}`,
            name: project.name,
            members: project.students.map(student => (student.toString())),
        });

        setChannel(channel);
    }, [client]);

    return (
        <>
            <h3>{project?.name}</h3>
            <hr/>
            <p>Препод: {teacher?.full_name}</p>
            <hr/>
            <ul>Студенты:
                {studentsLoaded &&
                    students.map(student => (
                        <li key={`student_${student.id}`}>
                            <p>{student.first_name} {student.last_name}</p>
                        </li>
                    ))
                }
            </ul>
            <hr/>
            <ul>Задачи:
                {tasksLoaded &&
                    tasks.map(task => (
                        <li key={`task_${task.id}`}>
                            {task.name}
                            <br/>
                            {task.description}
                        </li>
                    ))
                }
            </ul>
            {client &&
                <Chat client={client}>
                    <Channel channel={channel}>
                        <Window>
                            <ChannelHeader />
                            <MessageList />
                            <MessageInput />
                        </Window>
                        <Thread />
                    </Channel>
                </Chat>
            }
        </>
    )
};