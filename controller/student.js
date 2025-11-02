import Student from '../model/student.js'; // adjust path as needed
import bcrypt from 'bcrypt';

export const addStudent = async (req, res) => {
  try {
    const { name, email, phone, branch: studentBranch, rollNumber, feesPaid, password } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    const newStudent = new Student({
      name,
      email,
      phone,
      branch: studentBranch,
      rollNumber,
      feesPaid,
      password: hashedPassword,
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }

};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
export const editStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, branch: studentBranch, rollNumber, feesPaid, password } = req.body; 
    const updatedData = {
      name,
      email,
      phone,
      branch: studentBranch,
      rollNumber,
      feesPaid,
    };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }
    const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};