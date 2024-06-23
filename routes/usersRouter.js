const express = require("express");
const {faker} = require("@faker-js/faker")
const router = express.Router();

// recojer parametros tipo query, gralmente se usan para filtros o paginacion
router.get("/", (req, res) => {
  const {limit, offset} = req.query;
  if(limit && offset){
    res.json({
      limit, offset
    })
  }else{
    res.send("No hay parametros")
  }
});

//CREAR usuario

router.post("/",(req,res)=>{
  const body = req.body
  res.json({
    message: "Nuevo usuario",
    data: body
  })
});

//ACTUALIZAR usuario
router.patch("/:id",(req,res)=>{
  const {id}= req.params;
  const body = req.body
  res.json({
    id,
    message: "usuario actualizado",
    data: body
  })
});


// borrar categoria
router.delete("/:id",(req,res)=>{
  const {id}= req.params;
  res.json({
    id,
    message: "Usuario eliminado"
  })
})
module.exports = router;
