export const badRequestError = (message?:string) => {
    throw createError({
        statusCode: 400,
        message,
        stack:undefined
    })
}