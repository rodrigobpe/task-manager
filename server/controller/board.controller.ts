import { invalidBodyError } from "../error";
import { BoardService } from "../service";
import { H3Event } from 'h3'
import { handlerResponse } from "../util";

export class BoardControler {
    constructor(private readonly boardService: BoardService) { }

    async createBoard(event: H3Event) {
        const { color, name } = await readBody(event)
        const owner = event.id
        if (color === undefined || name === undefined) throw invalidBodyError();
        const newBoard = await this.boardService.createBoard({ color, name, owner })
        return handlerResponse(event, 201, newBoard)
    }

    async getBoardById(event: H3Event) {
        const { id } = getRouterParams(event)
        const board = await this.boardService.getBoardById({ id })

        return handlerResponse(event, 200, board)
    }
}