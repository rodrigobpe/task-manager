import { boardRouter, listRouter, userRouter } from "../router"

const app = createApp()

app.use('/', defineEventHandler(userRouter))
app.use('/', defineEventHandler(boardRouter))
app.use('/', defineEventHandler(listRouter))

export default useBase('/api', app.handler)