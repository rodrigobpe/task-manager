import { userRouter } from "../router"

const app = createApp()

app.use('/', defineEventHandler(userRouter))

export default useBase('/api', app.handler)