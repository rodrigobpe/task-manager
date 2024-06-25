import { Board, CreateBoardDto } from "../dto";

export abstract class BoardRepository {
    abstract create({color,name,owner}:CreateBoardDto):Promise<Board>
    abstract getBoardById({id}:{id:string}):Promise<Board | null>
}