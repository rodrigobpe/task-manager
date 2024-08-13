import { boardRouter, labelRouter, listRouter, userRouter,taskRouter } from "../router"

const app = createApp()

app.use('/', defineEventHandler(userRouter))
app.use('/', defineEventHandler(boardRouter))
app.use('/', defineEventHandler(listRouter))
app.use('/', defineEventHandler(taskRouter))
app.use('/', defineEventHandler(labelRouter))

export default useBase('/api', app.handler)