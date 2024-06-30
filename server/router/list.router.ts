import { listFactory } from "../factory/list.factory"

export const listRouter = createRouter()

const makeListController = listFactory()

listRouter.post('/lists', defineEventHandler((event) => (makeListController.createList(event))))
listRouter.patch('/lists/:id', defineEventHandler((event) => (makeListController.updateList(event))))
listRouter.delete('/lists/:id', defineEventHandler((event) => (makeListController.deleteList(event))))
