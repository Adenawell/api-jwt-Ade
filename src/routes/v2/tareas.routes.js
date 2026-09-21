import express from "express";
import { createTarea, getTareas, getTareaById, updateTarea, deleteTarea } from "../v2/tareas.controller.js";

const router = express.Router();

router.get("/", getTareas);
router.post("/", createTarea);
router.put("/:id", updateTarea);
router.delete("/:id", deleteTarea);

export default router;