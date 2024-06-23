export const notFoundError = (message?:string) => {
    return createError({
        statusCode: 404,
        message,
        stack:undefined
    })
}