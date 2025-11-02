import mongoose, { Schema } from 'mongoose'

const clientSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    company_name: {
      type: String,
    },
    contact_person: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    contact_number: {
      type: Number,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
)
export const Client = mongoose.model('Client', clientSchema)
