import type { Task } from "./task";

export type List = {
    id:string;
    name:string;
    position:number;
    tasks:Task[]
}

export type CreateList = {
    name:string;
    board_id:string;
    position:number;
}