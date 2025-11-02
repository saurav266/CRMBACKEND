import express,{Router} from 'express';
import { registerUser ,loginUser,verify} from '../controller/usercontroller.js';
import { verifyUser } from '../middleware/authMiddleware.js';
import { addTeacher ,getTeachers,editTeachers} from '../controller/teacher-controller.js';
import { addStudent,getAllStudents,getStudentById ,editStudent} from '../controller/student.js';
import { addClass,getAllClasses ,getClassById} from '../controller/class-controller.js';
const router=Router();
// Define user-related routes here
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get("/verify",verifyUser,verify);
router.post('/teacher',addTeacher);
router.get("/teacher",getTeachers);
router.put("/teacher/:id",editTeachers);
// for students
router.post('/Add-student',addStudent);
router.get('/student',getAllStudents);
router.get('/student/view/:id',getStudentById);
router.put('/student/edit/:id',editStudent);

// for classes
router.post('/class',addClass);
router.get('/class',getAllClasses);
router.get('/class/:id',getClassById);
export default router;