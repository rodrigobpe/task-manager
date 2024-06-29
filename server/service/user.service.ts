import { AuthUserDto, AuthUserResDto, CreateUserDto } from "../dto/user";
import { badRequestError, notFoundError,unauthorizedError } from "../error";
import { UserRepository } from "../repository/user.repo";
import { hashPassword } from "../util";
import bcrypt from 'bcrypt'
import jwt, {JwtPayload} from 'jsonwebtoken'

export class UserService {
    constructor(private readonly userRepo: UserRepository) { }

    async createUser({ email, name, password }: CreateUserDto) {
        const userExists = await this.userRepo.getByEmail({ email })
        if (userExists) throw badRequestError("Usuário já cadastrado!")

        const user = await this.userRepo.create({ email, name, password: hashPassword(password) })
        return user
    }

    async auth({ email, password }: AuthUserDto) {
        const user = await this.userRepo.getByEmail({ email })
        if (!user) throw notFoundError("E-mail ou senha incorretos")

        const passwordMatch = bcrypt.compareSync(password, user.password)
        if (!passwordMatch) throw notFoundError("E-mail ou senha incorretos")

        const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN ?? "", {
            subject: user.id,
            expiresIn: '24h'
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

    async verifyAuth({ token }: { token: string }) {
        return jwt.verify(token, process.env.JWT_TOKEN ?? '', async (error, result) => {
            if (error) {
                return false
            }
            const { id } = result as JwtPayload
            const user = await this.getUserById({ id })
            if (!user) throw unauthorizedError('Usuário não autorizado')
            return true
        })
    }

    async getUserById({ id }: { id: string }) {
        const user = await this.userRepo.getById({ id })
        if (!user) throw notFoundError("Usuário não encontrado!");

        return user;
    }

    async deleteUser({ id }: { id: string }) {
        const userExists = await this.userRepo.getById({ id })
        if (!userExists) throw notFoundError("Usuário não encontrado!");

        return await this.userRepo.delete({ id })
    }
}