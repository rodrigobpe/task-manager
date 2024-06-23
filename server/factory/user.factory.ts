import { UserController } from "../controller"
import { PrismaUserRepo } from "../repository/impl/prisma-user.repo"
import { UserService } from "../service"

export const userFactory = () => {
    const userRepo = new PrismaUserRepo()
    const userService = new UserService(userRepo)
    const userController = new UserController(userService)
    return userController
}