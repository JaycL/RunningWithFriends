const express = require("express");
const router = express.Router();
const subEventController = require("../controllers/subEvent.controller");

router.post("/", subEventController.createSubEvent);
router.get("/:id", subEventController.getSubEventById);
router.delete("/:id", subEventController.deleteSubEvent);

module.exports = router;