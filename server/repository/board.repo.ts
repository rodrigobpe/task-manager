import { Board, CreateBoardDto, UpdateBoardDto } from "../dto";

export abstract class BoardRepository {
    abstract create({ color, name, owner }: CreateBoardDto): Promise<Board>
    abstract getBoardById({ id }: { id: string }): Promise<Board | null>
    abstract update({ id, color, is_favorite, name }: UpdateBoardDto): Promise<Board | null>
}