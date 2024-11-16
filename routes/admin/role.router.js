const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/role.controller");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.createPost);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", controller.editPatch);

router.get("/permissions", controller.permission);

router.get("/detail/:id", controller.detail);

router.patch("/permissions", controller.permissionPatch);

router.delete("/delete/:id", controller.delete);

module.exports = router;
