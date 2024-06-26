export class Board {
    id: string
    name: string
    create_date: Date
    is_favorite: boolean
    color:string;
    owner:string
}

export class CreateBoardDto{
    name: string
    color:string;
    owner:string
}

export class UpdateBoardDto {
    id:string;
    name?:string;
    color?:string;
    is_favorite?:boolean
}