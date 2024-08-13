import type { Color } from "./board";

export type Task = {
    id:string;
    title:string;
    description:string;
    is_important:boolean;
    created_date:Date;
    due_date:Date
    color:string;
    list_id:string
    task_labels: {
        id:string
        name:string
        color:Color
    }[]
}