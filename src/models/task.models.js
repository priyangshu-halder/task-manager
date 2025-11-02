import mongoose, { Schema } from 'mongoose'

const taskSchema = new Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    task_name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
    },
    assigned_to: {
      type: Schema.type.ObjectId,
      ref: 'User',
    },
    created_by: {
      type: Schema.type.ObjectId,
      ref: 'User',
    },
    parent_task_id: {
      type: Schema.type.ObjectId,
      ref: 'Project',
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
