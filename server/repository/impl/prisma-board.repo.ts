import { CreateBoardDto, Board, UpdateBoardDto } from "../../dto";
import { BoardRepository } from "../board.repo";
import { v7 } from 'uuid'
import { prisma } from '../../config'

export class PrismaBoardRepo implements BoardRepository {
    async create({ color, name, owner }: CreateBoardDto): Promise<Board> {
        const id = v7()
        const board = await prisma.board.create({
            data: { id, color, name, owner }
        })

        await prisma.boardMember.create({
            data: { board_id: id, user_id: owner }
        })

        return board
    }

    async getBoardById({ id }: { id: string; }): Promise<Board | null> {
        return await prisma.board.findFirst(
            {
                where: { id },
                include: {
                    labels: true,
                    board_members: { select: { user: { select: { id: true, name: true, email: true } } } },
                    lists: { select: { id: true, name: true, position: true, tasks: { include: { task_labels: { select: { label: { select: { color: true, id: true, name: true } } } }, task_members: { select: { user: { select: { id: true, name: true } } } } } } } },

                }
            }
        )
    }

    async update({ id, color, is_favorite, name }: UpdateBoardDto): Promise<Board | null> {
        return await prisma.board.update({
            data: { color, is_favorite, name }, where: { id }
        })
    }

}