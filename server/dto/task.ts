export class Task {
    id: string;
    title: string;
    description: string;
    created_date:Date
    due_date: Date | null
    color: string;
    list_id: string
}

export class CreateTaskDto {
    title: string;
    description: string;
    due_date: Date
    color: string;
    list_id: string
    task_members: string[]
}

export class UpdateTaskDto {
    id: string;
    title?: string;
    description?: string;
    is_important?: boolean
    due_date?: Date
    color?: string;
    list_id: string
}