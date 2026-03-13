import mongoose, { Schema } from 'mongoose'

const attachmentSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    localUrl: {
      type: String,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    MimeType: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ['image', 'document', 'video', 'audio', 'archive', 'other'],
      default: 'other',
    },
    attachedTo: {
      type: String,
      required: true,
      enum: ['Task', 'Project', 'Comment'],
    },
    attachedToId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'attachedTo',
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

attachmentSchema.index({ attachedTo: 1, attachedToId: 1 })
attachmentSchema.index({ uploadedBy: 1 })
attachmentSchema.index({ isDeleted: 1 })

attachmentSchema.virtual('fileExtension').get(function () {
  return this.originalName.split('.').pop()
})

attachmentSchema.methods.softDelete = function (userId) {
  this.isDeleted = true
  this.deletedAt = new Date()
  this.deletedBy = userId
  return this.save()
}

export const Attachment = mongoose.model('Attachment', attachmentSchema)
