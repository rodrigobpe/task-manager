import { H3Event } from 'h3'

export const handlerResponse = (event: H3Event, statusCode: number, data?: any) => {
    setResponseStatus(event,statusCode);
    return {
        statusCode,
        data
    }
}