function response(res, isSuccess, { status = isSuccess ? 200 : 400, message = undefined, optional = {} }) {
    return res.status(status).json({
        status: isSuccess ? 'Success' : 'Faild',
        message,
        ...optional
    })
}

module.exports = { response }