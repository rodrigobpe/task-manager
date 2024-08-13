import { CreateLabelDto, Label, UpdateLabelDto } from "../dto";

export abstract class LabelRepository {
    abstract create({ color, name, board_id }: CreateLabelDto): Promise<Label>
    abstract getByid({ id }: { id: string }): Promise<Label | null>
    abstract update({ id, color, name, board_id }: UpdateLabelDto): Promise<Label>
    abstract delete({ id }: { id: string }): Promise<void>
}