import Class from '../model/class-model.js';

export const addClass = async (req, res) => {
  try {
    const { name, section, department, subjects, timing, teacher } = req.body;
    const newClass = new Class({
      name,
      subjects,
      section,
      department,
      timing,
      teacher
    });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({ message: 'Failed to create class' });
  }
};
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ message: 'Failed to fetch classes' });
  }
};
export const getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.status(200).json(classItem);
  } catch (error) {
    console.error('Error fetching class by ID:', error);
    res.status(500).json({ message: 'Failed to fetch class' });
  }
};