import { LabelController } from "../controller"
import { PrismaBoardRepo } from "../repository/impl/prisma-board.repo"
import { PrismaLabelRepo } from "../repository/impl/prisma-label.repo"
import { LabelService } from "../service"

export const labelFactory = () => {
    const boardRepo = new PrismaBoardRepo()
    const labelRepo = new PrismaLabelRepo()
    const labelService = new LabelService(labelRepo,boardRepo)
    const labelController = new LabelController(labelService)
    return labelController
}