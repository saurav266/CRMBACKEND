import techerSchmma from "../model/techerSchmma.js";

import bcrypt from "bcrypt";

export const addTeacher = async (req, res) => {
    try {
        const { name, email, phone, department, salary ,password} = req.body;
        const existingTeacher = await techerSchmma.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({ message: "Teacher with this email already exists" });
        }
        if (!name || !email || !phone || !department || !salary || !password) {
           return res.status(400).json({ message: 'All fields are required' });
        }
         const haspassword=await bcrypt.hash(password,10)

        const newTeacher = new techerSchmma({
            name,
            email,
            phone,
            department,
            
            salary,
            password: haspassword
        });
        await newTeacher.save();
        res.status(201).json({ message: "Teacher added successfully", teacher: newTeacher });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getTeachers = async (req, res) => {
    try {
        const teachers = await techerSchmma.find().populate('department');
        res.status(200).json({ teachers });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const editTeachers = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, department, salary, password } = req.body;

    // Find the teacher by ID
    const teacher = await techerSchmma.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Update fields if provided
    if (name) teacher.name = name;
    if (email) teacher.email = email;
    if (phone) teacher.phone = phone;
    if (department) teacher.department = department;
    if (salary) teacher.salary = salary;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      teacher.password = hashedPassword;
    }

    await teacher.save();
    res.status(200).json({ message: 'Teacher updated successfully', teacher });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await techerSchmma.findByIdAndDelete(id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const ShowAllTeacher=async(req,res)=>{
  try {
    const teachers = await techerSchmma.find();
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
