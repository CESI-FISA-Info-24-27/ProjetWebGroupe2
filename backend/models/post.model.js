import mongoose from 'mongoose';
import { type } from 'os';
import { text } from 'stream/consumers';

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: {
      text: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
    },
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  repliesTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    nullable: true,
  },
  reports: {
    type: integer,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});
