import { boardFactory } from "../factory/board.factory"

export const boardRouter = createRouter()

const makeBoardController = boardFactory()

boardRouter.post('/boards', defineEventHandler((event) => (makeBoardController.createBoard(event))))
boardRouter.patch('/boards/:id', defineEventHandler((event) => (makeBoardController.updateBoard(event))))
boardRouter.get('/boards/:id', defineEventHandler((event) => (makeBoardController.getBoardById(event))))
