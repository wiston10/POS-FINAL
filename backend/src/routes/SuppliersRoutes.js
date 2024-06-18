const { createsupplier ,getSuppliers,detailSupplier,destroySupplier} = require("../controller/SupplierControllers/index");
// const multer = require('multer');
// const upload = multer();
const midalware = require("../midelwares/auth");

const SupplierController = require("express").Router();

SupplierController.get("/detail/:id",detailSupplier)
SupplierController.get("/get",midalware,getSuppliers)
SupplierController.delete("/delete/:id",midalware,destroySupplier)
SupplierController.post("/create", midalware, createsupplier);

module.exports = SupplierController;
