export class List{
    id: string;
    name:string;
    position:number;
    board_id:string
}

export class CreateListDto{
    name:string;
    position:number;
    board_id:string
}

export class UpdateListDto{
    id:string;
    name?:string;
    position?:number;
    board_id?:string;
}