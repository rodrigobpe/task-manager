import { BoardControler } from "../controller"
import { PrismaBoardRepo } from "../repository/impl/prisma-board.repo"
import { PrismaUserRepo } from "../repository/impl/prisma-user.repo"
import { BoardService } from "../service"

export const boardFactory = () => {
    const boardRepo = new PrismaBoardRepo()
    const userRepo = new PrismaUserRepo()
    const boardService = new BoardService(boardRepo,userRepo)
    const boardController = new BoardControler(boardService)
    return boardController
}