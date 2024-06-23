const boom = require("@hapi/boom");


function validatorHandler(schema, property){
  return (req,res,next)=>{ //devuelve un middleware, closures
    const data = req[property]; // property puede ser el body del req, params del req o query, depende como venga

    const {error} = schema.validate(data, {abortEarly: false});
    if (error){
      next(boom.badRequest(error))
    }
    next();
  }
}

module.exports = validatorHandler
