import { CreateLabelDto, UpdateLabelDto } from "../dto";
import { notFoundError } from "../error";
import { BoardRepository } from "../repository/board.repo";
import { LabelRepository } from "../repository/label.repo";

export class LabelService {
    constructor(private readonly labelRepo: LabelRepository, private readonly boardRepo: BoardRepository) { }

    async createLabel({ board_id, color, name }: CreateLabelDto) {
        const boardExists = await this.boardRepo.getBoardById({ id: board_id })
        if (!boardExists) throw notFoundError("Esse Board não existe!");
        const label = await this.labelRepo.create({ board_id, color, name })

        return label
    }

    async deleteLabel({ id }: { id: string }) {
        const labelExists = await this.labelRepo.getByid({ id })
        if (!labelExists) throw notFoundError("Essa Label não existe!");

        return await this.labelRepo.delete({ id })
    }

    async updateLabel({ id, board_id, color, name }: UpdateLabelDto) {
        const labelExists = await this.labelRepo.getByid({ id })
        if (!labelExists) throw notFoundError("Essa Label não existe!");

        if (board_id) {
            const boardExists = await this.boardRepo.getBoardById({ id: board_id })
            if (!boardExists) throw notFoundError("Board não existe!");
        }

        return await this.labelRepo.update({ id, board_id, color, name })
    }

}