import * as mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface DailySchedule {
  breakfast: Array<String>
  lunch: Array<String>
  snacks: Array<String>
  dinner: Array<String>
}

export interface ScheduleDetailsDoc extends mongoose.Document {
  Monday: DailySchedule
  Tuesday: DailySchedule
  Wednesday: DailySchedule
  Thursday: DailySchedule
  Friday: DailySchedule
  Saturday: DailySchedule
  Sunday: DailySchedule
}

const ScheduleDetailsSchema = new Schema({
  active: {
    required: true,
    default: true,
  },
  Monday: {
    type: {
      breakfast: { type: Array },
      lunch: { type: Array },
      snacks: { type: Array },
      dinner: { type: Array },
    },
    required: true,
  },
  Tuesday: {
    type: {
      breakfast: { type: Array },
      lunch: { type: Array },
      snacks: { type: Array },
      dinner: { type: Array },
    },
    required: true,
  },
  Wednesday: {
    type: {
      breakfast: { type: Array },
      lunch: { type: Array },
      snacks: { type: Array },
      dinner: { type: Array },
    },
    required: true,
  },
  Thursday: {
    type: {
      breakfast: { type: Array },
      lunch: { type: Array },
      snacks: { type: Array },
      dinner: { type: Array },
    },
    required: true,
  },
  Friday: {
    type: {
      breakfast: { type: Array },
      lunch: { type: Array },
      snacks: { type: Array },
      dinner: { type: Array },
    },
    required: true,
  },
  Saturday: {
    type: {
      breakfast: { type: Array },
      lunch: { type: Array },
      snacks: { type: Array },
      dinner: { type: Array },
    },
    required: true,
  },
  Sunday: {
    type: {
      breakfast: { type: Array },
      lunch: { type: Array },
      snacks: { type: Array },
      dinner: { type: Array },
    },
    required: true,
  },
})

 export default mongoose.model<ScheduleDetailsDoc>(
  'ScheduleDetails',
  ScheduleDetailsSchema,
)
