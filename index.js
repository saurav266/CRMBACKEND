import express from 'express';
import 'dotenv/config'; 
import connect from './DB/db.js';
import deparmentRoute from './routes/department.js';
connect();
import userRoute from './routes/userRoute.js';
import cors from 'cors';
const app=express();
app.use(cors());
app.use(express.json());



const port=process.env.PORT  
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/api/users',userRoute);
app.use('/api/department',deparmentRoute);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
