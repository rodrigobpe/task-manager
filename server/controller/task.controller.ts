import { CreateTaskDto, UpdateTaskDto } from "../dto";
import { invalidBodyError } from "../error";
import { TaskService } from "../service";
import { H3Event } from 'h3'
import { handlerResponse } from "../util";


export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    async createTask(event: H3Event) {
        const { list_id } = getRouterParams(event)
        const { color, description, due_date, task_members, title }: CreateTaskDto = await readBody(event)
        // if (color === undefined || description === undefined || task_members.length === 0 || title === undefined) throw invalidBodyError();
        if (color === undefined || description === undefined || title === undefined) throw invalidBodyError();
        const newTask = await this.taskService.createTask({ color, description, due_date, list_id, task_members, title })

        return handlerResponse(event, 201, newTask)
    }

    async updateTask(event: H3Event) {
        const { list_id, id } = getRouterParams(event)
        // const { color, description, due_date, is_important, title } = await readBody(event)
        const updatedTask = await this.taskService.updateTask({ id, list_id })
    
        return handlerResponse(event, 201, updatedTask)
    }
}