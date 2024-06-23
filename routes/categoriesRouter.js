const express = require("express");
const categoriesService = require("../services/categoriesService")
const router = express.Router();
const service = new categoriesService;



router.get("/", (req, res) => {
  const categories = service.find();
  res.json(categories)
}
)


router.get("/:categid", (req, res) => {
  const { categid } = req.params;
  const category = service.findOne(categid);
  res.json(category);
});

//CREAR categoria

router.post("/",(req,res)=>{
  const body = req.body
  res.json({
    message: "Nueva categoría",
    data: body
  })
});


//ACTUALIZAR categoria
router.patch("/:id",(req,res)=>{
  const {id}= req.params;
  const body = req.body
  res.json({
    id,
    message: "categoría actualizada",
    data: body
  })
});


// borrar categoria
router.delete("/:id",(req,res)=>{
  const {id}= req.params;
  res.json({
    id,
    message: "Categoría borrada"
  })
})



module.exports = router;
