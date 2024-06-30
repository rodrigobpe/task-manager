import { CreateListDto, UpdateListDto } from "../dto";
import { invalidBodyError } from "../error";
import { ListService } from "../service";
import { H3Event } from 'h3'
import { handlerResponse } from "../util";

export class ListController {
    constructor(private readonly listService: ListService) { }

    async createList(event: H3Event) {
        const { name, position, board_id }: CreateListDto = await readBody(event)
        if (name === undefined || position === undefined || board_id === undefined) throw invalidBodyError();
        const newList = await this.listService.createList({ board_id, name, position })

        return handlerResponse(event, 201, newList)
    }

    async updateList(event: H3Event) {
        const { id } = getRouterParams(event)
        const { board_id, name, position }: UpdateListDto = await readBody(event)
        const listUpdated = await this.listService.updateList({ id, board_id, name, position })

        return handlerResponse(event, 201, listUpdated)
    }

    async deleteList(event: H3Event) {
        const { id } = getRouterParams(event)
        await this.listService.deleteList({ id })

        return handlerResponse(event, 201, `Lista com o id '${id}' deletada`)
    }
}