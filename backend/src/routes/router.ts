import express from "express";

const router = express();

//User Routes
import { router as userRoutes } from "./UserRoutes";
router.use("/api/users", userRoutes);

//Photo Routes
import { router as photoRoutes } from "./PhotoRoutes";
router.use("/api/photos", photoRoutes);


router.get("/", (req,res) => {
	res.send({"message" : "Rota funcionando!"});
});

export { router };