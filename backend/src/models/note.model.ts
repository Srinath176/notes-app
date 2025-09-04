import mongoose, { Document, Schema } from "mongoose";

//define note object
export interface INote extends Document {
  user: mongoose.Schema.Types.ObjectId;
  text: string;
}

//create note schema
const NoteSchema = new Schema<INote>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const Note = mongoose.model<INote>("Note", NoteSchema);

export default Note;
