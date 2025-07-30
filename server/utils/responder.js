const responder = (res, data = null, status = 200, success = true, message = "i am default message") => {
   return  res.status(status).json({
        data,
        success,
        message
    })
}

export default responder