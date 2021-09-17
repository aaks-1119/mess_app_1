import * as  mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface ScheduleImageDoc extends mongoose.Document {
  sender: string
  imageURL: string
  details: string
  foodCourt: string
  active: boolean
}

const ScheduleImageSchema = new Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  foodCourt: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
    unique: true,
  },
  details: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
})

export default mongoose.model<ScheduleImageDoc>(
  'ScheduleImage',
  ScheduleImageSchema,
)
