import { TaskController } from "../controller"
import { PrismaTaskRepo } from "../repository/impl/prisma-task.repo"
import { PrismaListRepo } from "../repository/impl/prisma-list.repo"
import { TaskService } from "../service"

export const taskFactory = () => {
    const taskRepo = new PrismaTaskRepo()
    const listRepo = new PrismaListRepo()
    const taskService = new TaskService(taskRepo,listRepo)
    const taskController = new TaskController(taskService)
    return taskController
}