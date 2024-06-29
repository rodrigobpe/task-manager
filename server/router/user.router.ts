import { userFactory } from "../factory/user.factory"

export const userRouter = createRouter()

const makeUserController = userFactory()

userRouter.post('/users', defineEventHandler((event) => (makeUserController.createUser(event))))
userRouter.get('/me', defineEventHandler((event) => (makeUserController.getUserById(event))))
userRouter.post('/auth', defineEventHandler((event) => (makeUserController.auth(event))))
userRouter.post('/auth/verify', defineEventHandler((event) => makeUserController.verify(event)))
userRouter.delete('/users/:id', defineEventHandler((event) => (makeUserController.deleteUser(event))))