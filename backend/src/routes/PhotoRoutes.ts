import  express  from "express";

//Controllers
import { comment, deletePhoto, getAllPhotos, getPhotoById, getPhotosByUserId, insertPhoto, like, searchPhotos, updatePhotoById } from "../controllers/PhotoController";

//Middlewares
import { photoCommentValidation, photoInsertValidation, photoUpdateValidation } from "../middlewares/photoValidation";
import { authGuard } from "../middlewares/authGuard";
import { validate } from "../middlewares/handleValidate";
import { imageUpload } from "../middlewares/imageUpload";

const router = express.Router();

//Routes
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", getPhotosByUserId);
router.get("/search", authGuard, searchPhotos);
router.get("/:id", authGuard, getPhotoById);
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhotoById);
router.put("/like/:id", authGuard, like);
router.put("/comment/:id", authGuard, photoCommentValidation(), validate, comment);

export { router };