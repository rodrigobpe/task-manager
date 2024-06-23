export const invalidParamsError = () => {
    return createError({
        statusCode: 400,
        message: "Parâmetro inválido.",
        stack: undefined
    })
}