import { Request, Response } from "express";
import Note from "../models/note.model";

//  Create Note
export const createNote = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Note text required" });

    const note = new Note({ user: req.userId, text });
    await note.save();

    return res.status(201).json({ message: "Note created", note });
  } catch (err) {
    return res.status(500).json({ message: "Error creating note" });
  }
};

//  Get Notes
export const getNotes = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    return res.json({ notes });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching notes" });
  }
};

//  Delete Note
export const deleteNote = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    const { id } = req.params;
    const note = await Note.findOneAndDelete({ _id: id, user: req.userId });

    if (!note) return res.status(404).json({ message: "Note not found" });

    return res.json({ message: "Note deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting note" });
  }
};
