export interface User {
    id: number
    user_id: number
    first_name: string
    last_name: string
    full_name: string
    username: string
    email: string
    image: string
    birthday: string
    verified: boolean
    is_staff: boolean
    is_student: boolean
    is_teacher: boolean
}

export interface Student extends User {
    student_group: string
}

export interface Teacher extends User {
    teacher_achievements: string
}

export interface Project {
    id: number
    name: string
    teacher: Teacher
    students: [Student]
    tasks: [Task]
}

export interface Task {
    id: number
    project: Project
    name: string
    description: string
    created: string
}