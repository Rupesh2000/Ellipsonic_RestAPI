let express = require("express");
const router = express.Router();

const login_controller = require("../../controller/auth_controller/login.js");

//Get user
router.get("/api/users", login_controller.getAllUser);

//create user
router.post("/api/user/create", login_controller.createuser);

//Update user
router.put("/api/users/:id", login_controller.updateuser);

//Delete user
router.delete("/api/users/:id", login_controller.deleteuser);

//DeActivate user
router.get("/api/users/deactivate/:id", login_controller.deActivate);

module.exports = router;
