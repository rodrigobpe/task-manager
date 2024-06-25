import { CreateBoardDto } from "../dto";
import { notFoundError } from "../error";
import { BoardRepository } from "../repository/board.repo";
import { UserRepository } from "../repository/user.repo";

export class BoardService {
    constructor(private readonly boardRepo:BoardRepository, private readonly userRepo:UserRepository){}

    async createBoard({color,name,owner}:CreateBoardDto){
        const ownerExists = await this.userRepo.getById({id:owner})
        if(!ownerExists) throw notFoundError("Usuário não encontrado!");

        return await this.boardRepo.create({color,name,owner}); 
    }

    async getBoardById({id}:{id:string}){
        const board = await this.boardRepo.getBoardById({id})
        if(!board) throw notFoundError("Board não encontrado!");

        return board;
    }
}