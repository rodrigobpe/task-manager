import { AuthUserDto, CreateUserDto } from "../dto";
import { invalidBodyError } from "../error";
import { UserService } from "../service";
import { H3Event } from 'h3'
import { handlerResponse } from "../util";


export class UserController {
    constructor(private userService: UserService) { }

    async createUser(event: H3Event) {
        const { email, name, password }: CreateUserDto = await readBody(event)
        if (email === undefined || name === undefined || password === undefined) { throw invalidBodyError() }
        const newUser = await this.userService.createUser({ email, name, password })
        const { password: _, ...user } = newUser
        return handlerResponse(event, 200, user)
    }

    // async getAllUsers(event: H3Event) {
    //     const users = await this.userService.getAll()
    //     return handlerResponse(event,200,users)
    // }

    async auth(event: H3Event) {
        const { email, password }: AuthUserDto = await readBody(event)
        if (email === undefined || password === undefined) throw invalidBodyError();
        const auth = await this.userService.auth({ email, password })
        setCookie(event, 'token', auth.token)
        setCookie(event,'theme','dark')
        setCookie(event, 'user', JSON.stringify({
            email: auth.user.email,
            id: auth.user.id
        }))
        return handlerResponse(event, 201, auth)
    }
}