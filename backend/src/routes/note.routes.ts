import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { createNote, deleteNote, getNotes } from "../controller/note.controller";

const noteRoutes = Router();

noteRoutes.post("/", authMiddleware, createNote);
noteRoutes.get("/", authMiddleware, getNotes);
noteRoutes.delete("/:id", authMiddleware, deleteNote);

export default noteRoutes;
