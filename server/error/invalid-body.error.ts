export const invalidBodyError = () => {
    return createError({
        statusCode: 400,
        message:"Body inválido.",
        stack:undefined
    })
}