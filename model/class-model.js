import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  section: {
    type: String,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  subjects: [
    {
      type: String,
      trim: true,
    }
  ],
  teacher: {
    type: String,
    trim: true,
    required: true,
  },
  
  timing: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Class', classSchema);