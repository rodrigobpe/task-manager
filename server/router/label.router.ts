import { labelFactory } from "../factory/label.factory"

export const labelRouter = createRouter()

const makeLabelController = labelFactory()

labelRouter.post('/labels', defineEventHandler((event) => (makeLabelController.createLabel(event))))
labelRouter.patch('/labels/:id', defineEventHandler((event) => (makeLabelController.updateLabel(event))))
labelRouter.delete('/labels/:id', defineEventHandler((event) => (makeLabelController.deleteLabel(event))))
