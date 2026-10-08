import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  author: {
    type: String,
    required: [true, 'Book author is required'],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  category: {
    type: String,
    required: [true, 'Book category is required'],
    trim: true,
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: [true, 'Book skill level is required'],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  tags: {
    type: [String],
    trim: true,
  }
}, {timestamps: true});

const Book = mongoose.model("Book", bookSchema);

export default Book;
