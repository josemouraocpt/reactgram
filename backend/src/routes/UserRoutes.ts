import  express  from "express";

//Controllers
import { register, login, getCurrentUser, update, getUserById } from "../controllers/UserController";

//Middlewares
import { validate } from "../middlewares/handleValidate";
import { userCreateValidation, loginValidation, userUpdateValidation } from "../middlewares/userValidation";
import { authGuard } from "../middlewares/authGuard";
import { imageUpload } from "../middlewares/imageUpload";

const router = express.Router();

//Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update);
router.get("/:id", getUserById);

export { router };