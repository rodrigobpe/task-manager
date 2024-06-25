import { boardRouter, userRouter } from "../router"

const app = createApp()

app.use('/', defineEventHandler(userRouter))
app.use('/', defineEventHandler(boardRouter))

export default useBase('/api', app.handler)