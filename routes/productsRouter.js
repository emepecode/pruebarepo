const express = require("express");
const productsService = require("../services/productsServices");
const validatorHandler = require("../middlewares/validatorHandler")
const { createProductSchema, updateProductSchema, getProductSchema } = require("../schemas/productSchema")
const router = express.Router();
const service = new productsService()



// cada una de las funciones asincronas es tambien un middleware
router.get("/", async (req, res) => {
  const products = await service.find();
  res.json(products);
});

// como endpoint filter es una ruta especifica va antes que la ruta /:id
router.get("/filter", (req, res) => {
  res.send("soy un filter");
});


// el id es un endpoint dinámico, ya que puede cambiar y ser tanto un nro como una palabra
router.get("/:id", validatorHandler(getProductSchema, "params"), async (req, res, next) => {
  try {
    const { id } = req.params; //destructuracion del params, solo me quedo con el id
    const product = await service.findOne(id);
    res.json(product)
  } catch (error) {
    next(error);
  }

});

//CREAR PRODUCTO

router.post("/", validatorHandler(createProductSchema, "body"), async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

//ACTUALIZAR UN PROD PARCIALMENTE CON PATCH
router.patch("/:id", validatorHandler(getProductSchema, "params"),
validatorHandler(updateProductSchema, "body"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error)
  }

});

// borrar producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
})

module.exports = router;
