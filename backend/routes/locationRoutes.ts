import { Router } from "express";
import { locationSearchHandler } from "../controllers/locationController";

const router = Router();

router.get("/", locationSearchHandler);

export default router;
