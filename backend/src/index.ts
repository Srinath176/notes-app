import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import noteRoutes from "./routes/note.routes";

//env config middleware
dotenv.config();

//init express
const app = express();
//cors middleware
app.use(cors());
//parse json 
app.use(express.json());

//connect to database
connectDB();

//routes
app.use('/api/auth', authRoutes)
app.use('/api/notes',noteRoutes)


//create server on given port number
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});