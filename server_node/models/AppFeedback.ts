import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface AppFeedbackDoc extends mongoose.Document {
  from: string
  stars: number
  additionalComments: string
  timestamp: Date
}

const AppFeedbackSchema = new Schema({
  from: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3, 4, 5],
  },
  additionalComments: {
    type: String,
    required: false,
    min: 8,
  },
  timastamp: {
    type: Date,
    required: true,
    default: Date.now(),
  },
})

export default mongoose.model<AppFeedbackDoc>('AppFeedback', AppFeedbackSchema)
