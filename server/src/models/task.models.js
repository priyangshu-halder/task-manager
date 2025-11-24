import mongoose, { Schema } from 'mongoose'

const taskSchema = new Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    task_name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
      trim: true,
    },
    status: {
      type: String,
      enum: ['todo', 'in_progress', 'review', 'completed'],
      default: 'in_progress',
      trim: true,
    },
    assigned_to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    parent_task_id: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
    due_date: {
      type: Date,
    },
    estimated_time: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

taskSchema.index({ project_id: 1, status: 1 })
taskSchema.index({ assigned_to: 1 })
taskSchema.index({ project_id: 1, task_name: 1 })

export const Task = mongoose.model('Task', taskSchema)
