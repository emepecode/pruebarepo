function logErrors (err,req, res, next){ // midd de tipo error, cuando a next le paso el err, seguirá la ejecucion con otro middleware de tipo error
  console.log("logErrors");
  console.error(err);
  next(err)
}

function errorHandler(err,req, res, next){ // midd de tipo error, cuando a next le paso el err, seguirá la ejecucion con otro middleware de tipo error
  console.log("errorHandler");
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

  function boomErrorHandler(err,req, res, next){ // midd de tipo error, cuando a next le paso el err, seguirá la ejecucion con otro middleware de tipo error
    if(err.isBoom){
      const {output} = err;
      res.status(output.statusCode).json(output.payload)
    }else{
      next(err);
    }


}
module.exports = {logErrors, errorHandler, boomErrorHandler}
