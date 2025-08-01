import { Router } from "express";
import {
  listWidgets,
  createWidget,
  deleteWidget,
} from "../controllers/widgetController";

const router = Router();

router.get("/", listWidgets);
router.post("/", createWidget);
router.delete("/:id", deleteWidget);

export default router;
