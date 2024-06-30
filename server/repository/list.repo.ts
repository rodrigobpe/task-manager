import { CreateListDto, List, UpdateListDto } from "../dto";

export abstract class ListRepository {
    abstract create({ board_id, name, position }: CreateListDto): Promise<List>
    abstract update({ id, board_id, name, position }: UpdateListDto): Promise<List>
    abstract getById({ id }: { id: string }): Promise<List | null>
    abstract delete({ id }: { id: string }): Promise<void>
} 