import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const Schema = mongoose.Schema

export interface StudentDetail {
  learnerId: string
  registrationNumber: number
  college: string
  foodCourt: string
  verified: boolean
}

export interface StudentDoc extends mongoose.Document {
  learnerId: string
  registrationNumber: number
  college: string
  foodCourt: string
  password: string
  verified: boolean
  resetPasswordToken: string
  emailVerificationToken: string
  resetPasswordExpire: Date
  matchPassword(value: string): boolean
  getResetPasswordToken(): string
  getEmailToken(): string
  getStudentDetails(): StudentDetail
}

const StudentSchema = new Schema({
  learnerId: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  registrationNumber: {
    type: Number,
    required: [true, 'Please provide a registration number'],
    unique: [true, 'A user with this registration number already exists!'],
  },
  foodCourt: {
    type: mongoose.Types.ObjectId,
    required: [true, 'Please provide the food court'],
  },
  college: {
    type: String,
    required: [true, 'Please enter your college'],
    default: 'MIT',
  },
  password: {
    type: String,
    required: [true, 'A password is a required field!'],
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  resetPasswordToken: {
    type: String,
    required: false,
  },
  emailVerificationToken: {
    type: String,
    required: true,
    unique: true,
  },
  resetPasswordExpire: {
    type: Date,
    required: false,
  },
})

//Encrypt password using bcrypt
StudentSchema.pre<StudentDoc>('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

StudentSchema.methods.matchPassword = async function (value: string) {
  const user = this as StudentDoc
  return await bcrypt.compare(value, user.password)
}

StudentSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')

  const user = this as StudentDoc

  user.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  user.resetPasswordExpire = new Date(Date.now() + 10000 * 60 * 1000)

  return resetToken
}
StudentSchema.methods.getStudentDetails = function () {
  const user = this as StudentDoc
  return {
    learnerId: user.learnerId,
    registrationNumber: user.registrationNumber,
    college: user.college,
    foodCourt: user.foodCourt,
    verified: user.verified,
  }
}

StudentSchema.methods.getEmailToken = function () {
  const verifyToken = crypto.randomBytes(20).toString('hex')
  const user = this as StudentDoc
  user.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verifyToken)
    .digest('hex')

  return verifyToken
}

export default mongoose.model<StudentDoc>('Student', StudentSchema)
