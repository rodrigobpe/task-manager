import { AuthUserDto, AuthUserResDto, CreateUserDto } from "../dto/user";
import { badRequestError, notFoundError } from "../error";
import { UserRepository } from "../repository/user.repo";
import { hashPassword } from "../util";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserService{
    constructor(private readonly userRepo:UserRepository){}

    async createUser({email,name,password}:CreateUserDto){
        const userExists = await this.userRepo.getByEmail({email})
        if(userExists) throw badRequestError("Usuário já cadastrado!")

        const user = await this.userRepo.create({email,name,password:hashPassword(password)})
        return user
    }

    async auth({ email, password }: AuthUserDto) {
        const user = await this.userRepo.getByEmail({ email })
        if (!user) throw notFoundError("E-mail ou senha incorretos")

        const passwordMatch = bcrypt.compareSync(password, user.password)
        if (!passwordMatch) throw notFoundError("E-mail ou senha incorretos")

        const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN ?? "", {
            subject: user.id,
            expiresIn: '6h'
        })

        const tokenRes: AuthUserResDto = {
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }, token
        }

        return tokenRes
    }

    async getUserById({id}:{id:string}){
        const user = await this.userRepo.getById({id})
        if(!user) throw notFoundError("Usuário não encontrado!");

        return user;
    }
}