import mongoose, { Schema } from 'mongoose'

const projectSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    project_name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    status: {
      type: String,
      trim: true,
    },
    additional_info: {
      type: String,
    },
  },
  { timestamps: true }
)
export const Project = mongoose.model('Project', projectSchema)
