import { CreateListDto, List, UpdateListDto } from "~/server/dto";
import { ListRepository } from "../list.repo";
import { prisma } from "~/server/config";
import { v7 } from "uuid";

export class PrismaListRepo implements ListRepository {
    async create({ board_id, name, position }: CreateListDto): Promise<List> {
        return await prisma.list.create(
            { data: { id: v7(), name, position, board_id } }
        )
    }
    async update({ id, board_id, name, position }: UpdateListDto): Promise<List> {
        return await prisma.list.update({
            data: { name, board_id, position },
            where: { id }
        })
    }

    async getById({ id }: { id: string; }): Promise<List | null> {
        return await prisma.list.findFirst({
            where: { id }
        })
    }

    async delete({ id }: { id: string; }): Promise<void> {
        await prisma.list.delete({
            where: { id }
        })
    }

}