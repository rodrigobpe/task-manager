import { CreateListDto, UpdateListDto } from "../dto";
import { notFoundError } from "../error";
import { BoardRepository } from "../repository/board.repo";
import { ListRepository } from "../repository/list.repo";

export class ListService {
    constructor(private readonly listRepo: ListRepository, private readonly boardRepo: BoardRepository) { }

    async createList({ board_id, name, position }: CreateListDto) {
        const boardExists = await this.boardRepo.getBoardById({ id: board_id })
        if (!boardExists) throw notFoundError("Board não existe!");

        return await this.listRepo.create({ name, board_id, position })
    }

    async updateList({ id, board_id, name, position }: UpdateListDto) {
        const listExists = await this.listRepo.getById({ id })
        if (!listExists) throw notFoundError("Lista não existe!");

        if (board_id) {
            const boardExists = await this.boardRepo.getBoardById({ id: board_id })
            if (!boardExists) throw notFoundError("Board não existe!");
        }

        return await this.listRepo.update({ id, board_id, name, position })
    }

    async deleteList({ id }: { id: string }) {
        const listExists = await this.listRepo.getById({ id })
        if (!listExists) throw notFoundError("Lista não existe!");

        return await this.listRepo.delete({ id })
    }
}