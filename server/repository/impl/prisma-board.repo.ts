import { CreateBoardDto, Board } from "../../dto";
import { BoardRepository } from "../board.repo";
import { v7 } from 'uuid'
import { prisma } from '../../config'

export class PrismaBoardRepo implements BoardRepository {
    async create({ color, name, owner }: CreateBoardDto): Promise<Board> {
        const id = v7()
        const board = await prisma.board.create({
            data: { id, color, name, owner}
        })

        await prisma.boardMember.create({
            data:{board_id:id,user_id:owner}
        })

        return board
    }


    async getBoardByOwner({ owner }: { owner: string; }): Promise<Board[]> {
        return await prisma.board.findMany({ where: { owner } })
    }

    async getBoardById({ id }: { id: string; }): Promise<Board | null> {
        return await prisma.board.findFirstOrThrow(
            {
                where:{id},
                include: {
                    labels:true,
                    board_members:{select:{user:{select:{id:true, name:true,email:true}}}},
                    lists:true
                }
            }
        )
    }
}