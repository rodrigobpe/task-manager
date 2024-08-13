import { CreateTaskDto, Task, UpdateTaskDto } from "~/server/dto";
import { TaskRepository } from "../task.repo";
import { prisma } from "~/server/config";
import { v7 } from "uuid";

export class PrismaTaskRepo implements TaskRepository {
    async update({ id, color, description, due_date, is_important, list_id, title }: UpdateTaskDto): Promise<Task> {
        return await prisma.task.update({
            data: {
                color, description, due_date, is_important, list_id, title
            },
            where: { id }
        })
    }
    getById({ id }: { id: string; }): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    delete({ id }: { id: string; }): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async create({ color, description, list_id, title, due_date, task_members }: CreateTaskDto): Promise<Task> {
        const id = v7()
        let data: { task_id: string, user_id: string }[] = []
        const task = await prisma.task.create({
            data: { id, color, description, list_id, title, due_date }
        })

        if (task_members) {
            for (const user_id of task_members) {
                let temp = { task_id: id, user_id }
                data.push(temp)
            }
            await prisma.taskMember.createMany({ data })
        }

        return task
    }
}