export const unauthorizedError = (message?:string) => {
    return createError({
        statusCode: 401,
        message,
        stack:undefined
    })
}