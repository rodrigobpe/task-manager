import { ListController } from "../controller"
import { PrismaListRepo } from "../repository/impl/prisma-list.repo"
import { PrismaBoardRepo } from "../repository/impl/prisma-board.repo"
import { ListService } from "../service"

export const listFactory = () => {
    const boardRepo = new PrismaBoardRepo()
    const listRepo = new PrismaListRepo()
    const listService = new ListService(listRepo, boardRepo)
    const listController = new ListController(listService)
    return listController
}