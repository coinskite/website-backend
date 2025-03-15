const express = require("express")
const { getAllCommodities, getCommodityById, createCommodity, updateCommodity, deleteCommodity, } = require("../controllers/commodity")
const router = express.Router()

router.get("/", getAllCommodities)
router.get("/:id", getCommodityById)
router.post("/", createCommodity)
router.put("/:id", updateCommodity)
router.delete("/:id", deleteCommodity)

module.exports = router;
