import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface FoodCourtDoc extends mongoose.Document {
  name: string
  shortForm: string
  currentSchedule: string
  details: string
  ownerDetails: string
}

const FoodCourtSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  shortForm: {
    type: String,
    required: false,
  },
  currentSchedule: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  details: {
    type: String,
    required: true,
    min: 10,
    unique: true,
  },
  ownerDetails: {
    type: String,
    required: true,
    min: 10,
  },
})

export default mongoose.model<FoodCourtDoc>('FoodCourt', FoodCourtSchema)
