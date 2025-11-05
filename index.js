import express from 'express';
import 'dotenv/config'; 
import connect from './DB/db.js';
import deparmentRoute from './routes/department.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';
import cookieParser from "cookie-parser";

connect();

const app = express();

// ✅ Only use this CORS config — no duplicates!
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoute);
app.use('/api/department', deparmentRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});