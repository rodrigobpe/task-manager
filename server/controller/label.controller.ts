import { CreateLabelDto } from "../dto";
import { invalidBodyError } from "../error";
import { LabelService } from "../service";
import { H3Event } from 'h3'
import { handlerResponse } from "../util";

export class LabelController {
    constructor(private readonly labelService: LabelService) { }

    async createLabel(event: H3Event) {
        const { board_id, color, name }: CreateLabelDto = await readBody(event);
        if (color === undefined || name === undefined || board_id === undefined) throw invalidBodyError();
        const newLabel = await this.labelService.createLabel({ board_id, color, name })

        return handlerResponse(event, 201, newLabel)
    }

    async deleteLabel(event: H3Event) {
        const { id } = getRouterParams(event)
        await this.labelService.deleteLabel({ id })

        return handlerResponse(event, 201, `Label com o id '${id}' deletada`);
    }

    async updateLabel(event: H3Event) {
        const { id } = getRouterParams(event)
        const { board_id, color, name } = await readBody(event)
        if (color === undefined && name === undefined && board_id === undefined) throw invalidBodyError();
        const updatedLabel = await this.labelService.updateLabel({ id, board_id, color, name })

        return handlerResponse(event, 201, updatedLabel);
    }
}