//creando server
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const routerApi = require("./routes")
const {logErrors, errorHandler, boomErrorHandler} = require("./middlewares/errorHandler")


/*
const whitelist = ["http://localhost:8080", "https://myapp.co", "http://localhost:3000"] //lista de dominios a los cuales habilito para que me hagan req
const options = {
  origin: (origin, callback) =>{
    if(whitelist.includes(origin))
      {
        callback(null, true)
      }else{
        callback (new Error("no permitido"));
      }
  }
}
app.use(cors(options))
*/

app.use(cors()); // aceptaria cualquier origen que me haga un request, conexion con frontend
app.use(express.json()); //middleware
routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// ruta home
app.get("/api", (req, res) => {
  res.send("Hola server en express")
}
)



//los log luego se sacan
app.listen(port, () => {
  console.log("Ok en el " + port);
}
);


