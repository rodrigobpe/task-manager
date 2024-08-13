import { CreateLabelDto, Label, UpdateLabelDto } from "~/server/dto";
import { LabelRepository } from "../label.repo";
import { prisma } from "~/server/config";
import { v7 } from "uuid";

export class PrismaLabelRepo implements LabelRepository {
    async create({ color, name, board_id }: CreateLabelDto): Promise<Label> {
        return await prisma.label.create({
            data: { id: v7(), color, name, board_id }
        })
    }

    async getByid({ id }: { id: string; }): Promise<Label | null> {
        return await prisma.label.findFirst({
            where: { id }
        })
    }

    async delete({ id }: { id: string; }): Promise<void> {
        await prisma.label.delete({ where: { id } })
    }

    async update({ id, color, name, board_id }: UpdateLabelDto): Promise<Label> {
        return await prisma.label.update({
            data: { color, board_id, name, },
            where: { id }
        })
    }
}