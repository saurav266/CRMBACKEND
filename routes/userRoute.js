import express,{Router} from 'express';
import { registerUser ,loginUser,verify,logoutUser} from '../controller/usercontroller.js';
import { verifyUser } from '../middleware/authMiddleware.js';
import { addTeacher ,getTeachers,editTeachers,getTeacherById,deleteTeacher} from '../controller/teacher-controller.js';
import { addStudent,getAllStudents,getStudentById ,editStudent,deleteStudent} from '../controller/student.js';
import { addClass,getAllClasses ,getClassById} from '../controller/class-controller.js';
const router=Router();
// Define user-related routes here
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get("/verify",verifyUser,verify);
router.post("/logout",logoutUser);
router.post('/teacher',addTeacher);
router.get("/teacher",getTeachers);
router.get("/teacher/:id",getTeacherById);
router.put("/teacher/:id",editTeachers);
router.delete("/teacher/:id",deleteTeacher);
// for students
router.post('/Add-student',addStudent);
router.get('/student',getAllStudents);
router.get('/student/view/:id',getStudentById);
router.put('/student/edit/:id',editStudent);
router.delete('/student/:id',deleteStudent);

// for classes
router.post('/Add-class',addClass);
router.get('/class',getAllClasses);
router.get('/class/:id',getClassById);
export default router;