function response(res, isSuccess, { code = isSuccess ? 200 : 400, message = undefined, optional = {} }) {
    return res.status(code).json({
        status: isSuccess ? 'Success' : 'Faild',
        message,
        ...optional
    })
}

module.exports = { response }