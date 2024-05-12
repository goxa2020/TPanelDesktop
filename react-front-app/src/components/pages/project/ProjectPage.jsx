import useAxios, {BaseUrl} from "../../../utils/useAxios";
import {useLoaderData} from "react-router-dom";
import {useState} from "react";

export async function loader({ params }) {
    return params.projectId;
}

export default function ProjectPage() {
    const project_id = useLoaderData();
    const axiosInstance = useAxios();
    const [project, setProject] = useState('');

    axiosInstance.get(`${BaseUrl}/project/${project_id}`)
    .then(response => {
        setProject(response.data)
    })
    .catch(response => {
        console.log(response);
    })
    return (
        <>
            <h3>{project.name}</h3>
        </>
    )
}