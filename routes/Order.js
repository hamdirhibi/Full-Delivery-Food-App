const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/Order");
const checkAuth = require("../middleware/checkAuth");

router.get("/", checkAuth, OrderController.Order_findAll);
router.get("/onProgress/", checkAuth, OrderController.Order_OnPregress);
router.post("/addOrder", checkAuth, OrderController.Order_save);
router.get("/:orderId", checkAuth, OrderController.Order_by_ID);
router.get("/getOne/:orderId", checkAuth, OrderController.Order_by_ID);
router.patch("/accepted/:orderId", checkAuth, OrderController.Order_Accepted);
router.patch("/refused/:orderId", checkAuth, OrderController.Order_Refused);
router.patch("/confirmed/:orderId", checkAuth, OrderController.Order_Confirmed);
router.put("/view/:orderId", checkAuth, OrderController.Order_View);

module.exports = router;
