export class Label {
    id:string;
    name:string;
    color:string;
    board_id:string;
}

export class CreateLabelDto {
    name:string;
    color:string;
    board_id:string;
}

export class UpdateLabelDto {
    id:string
    name?:string;
    color?:string;
    board_id?:string;
}