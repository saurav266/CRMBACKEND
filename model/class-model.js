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
  academicYear: {
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
  Teacher: {
    type: String,
    trim: true,
  },
  capacity: {
    type: Number,
    default: 30,
    min: 1,
  },
  timing: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Class', classSchema);