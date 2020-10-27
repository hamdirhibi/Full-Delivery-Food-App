const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/Category");
const checkAuth = require("../middleware/checkAuth");


router.get("/", checkAuth,  CategoryController.Category_findAll);

router.get("/getOne/:categoryId", checkAuth,  CategoryController.Category_findOne);

router.post("/addCategory", checkAuth,  CategoryController.Category_save);
router.delete("/deleteCategory/:categoryId", checkAuth,   CategoryController.Category_delete);
router.patch("/updateCategory/:categoryId", checkAuth, CategoryController.Category_update);



module.exports = router ; 
