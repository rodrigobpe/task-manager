import { userFactory } from "../factory/user.factory"

export const userRouter = createRouter()

const makeUserController = userFactory()

userRouter.post('/users', defineEventHandler((event) => (makeUserController.createUser(event))))
// userRouter.get('/users', defineEventHandler((event) => (makeUserController.getAllUsers(event))))
userRouter.post('/auth', defineEventHandler((event) => (makeUserController.auth(event))))