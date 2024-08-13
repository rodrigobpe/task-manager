import { CreateTaskDto, Task, UpdateTaskDto } from "../dto";

export abstract class TaskRepository {
    abstract create({ color, description, list_id, title, due_date, task_members }: CreateTaskDto): Promise<Task>
    abstract update({ id, color, description, due_date, is_important, list_id, title }: UpdateTaskDto): Promise<Task>
    abstract getById({ id }: { id: string }): Promise<Task | null>
    abstract delete({ id }: { id: string }): Promise<void>
}