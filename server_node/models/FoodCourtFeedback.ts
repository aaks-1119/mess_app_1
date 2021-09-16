import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface FoodCourtFeedbackDoc extends mongoose.Document {
  from: string
  foodCourt: string
  stars: number
  additionalComments: string
  timestamp: Date
}

const FoodCourtFeedbackSchema = new Schema({
  from: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  foodCourt: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  additionalComments: {
    type: String,
    required: true,
    min: 8,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now(),
  },
})


export default mongoose.model<FoodCourtFeedbackDoc>("FoodCourtFeedback",FoodCourtFeedbackSchema);