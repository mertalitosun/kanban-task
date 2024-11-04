class APIError extends Error {
    constructor(message,statusCode){
        super(message),
        this.statusCode = statusCode || 400
    }
}

const errorHandlerMiddleware = (err,req,res,next) =>{
    if(err instanceof APIError){
        return res.status(err.statusCode || 400).json({
            success:false,
            message:err.message
        })
    }
    return res.status(500).json({
        success:false,
        message:"Sunucu Hatası",
	messagess:err.message
    })
}

const notFoundMiddleware = (req, res, next) => {
    const error = new APIError('Bu Sayfa Bulunamadı', 404);
    next(error);
}

module.exports = {APIError, errorHandlerMiddleware,notFoundMiddleware};
