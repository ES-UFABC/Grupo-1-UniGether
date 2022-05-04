const { AppError } = require("../errors/AppError.js");

function errorHandler(err, req, res, next){
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      })
    }
  
    return res.status(500).json({
      status: "error",
      message: `Internal server error ${err.message}`,
    })
}

module.exports =  errorHandler 