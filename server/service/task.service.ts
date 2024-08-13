import { CreateTaskDto, UpdateTaskDto } from "../dto";
import { notFoundError } from "../error";
import { ListRepository } from "../repository/list.repo";
import { TaskRepository } from "../repository/task.repo";

export class TaskService {
    constructor(private readonly taskRepo: TaskRepository, private readonly listRepo: ListRepository) { }

    async createTask({ color, description, due_date, list_id, task_members, title }: CreateTaskDto) {
        const listExists = await this.listRepo.getById({ id: list_id })
        if (!listExists) throw notFoundError("Lista não existe!");

        return await this.taskRepo.create({ color, description, due_date, list_id, task_members, title })
    }

    async updateTask({ id, color, description, due_date, is_important, list_id, title }: UpdateTaskDto) {
        const listExists = await this.listRepo.getById({ id: list_id })
        if (!listExists) throw notFoundError("Lista não existe!");

        return await this.taskRepo.update({ id, list_id, color, description, due_date, is_important, title })
    }
}