import { taskFactory } from "../factory/task.factory"

export const taskRouter = createRouter()

const makeTaskController = taskFactory()

taskRouter.post('/lists/:list_id/tasks', defineEventHandler((event) => (makeTaskController.createTask(event))))
taskRouter.patch('/lists/:list_id/tasks/:id', defineEventHandler((event) => (makeTaskController.updateTask(event))))

