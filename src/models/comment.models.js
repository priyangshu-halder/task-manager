import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    task_id: {
      type: Schema.Types.ObjectId,
      ref: 'task',
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)
export const Comment = mongoose.model('Comment', commentSchema)
