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
    client_id: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
    },
    team_members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['planning', 'active', 'on_hold', 'completed', 'cancelled'],
      default: 'planning',
      trim: true,
    },
    additional_info: {
      type: String,
    },
  },
  { timestamps: true }
)

projectSchema.index({ owner: 1, status: 1 })

export const Project = mongoose.model('Project', projectSchema)
