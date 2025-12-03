import { Schema, model } from 'mongoose'

const sprintSchema = new Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
      index: true,
    },
    sprint_name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['planned', 'in-progress', 'completed', 'cancelled'],
      default: 'planned',
      index: true,
    },
    goals: {
      type: String,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    sprint_number: {
      type: Number,
      required: false,
    },
    velocity: {
      type: Number,
      default: 0,
      min: 0,
    },
    assigned_users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    duration_days: {
      type: Number,
    },
  },
  { timestamps: true }
)
sprintSchema.pre('save', function (next) {
  if (this.start_date && this.end_date && this.start_date < this.end_date) {
    const diff = this.end_date.getTime() - this.start_date.getTime() / (1000 * 60 * 60 * 24)
    this.duration_days = Math.ceil(diff)
  } else {
    return next(new Error('End date can not be before start date'))
  }
  next()
})
export const Sprint = model('Sprint', sprintSchema)
