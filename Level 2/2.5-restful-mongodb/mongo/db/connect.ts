import { connect } from 'mongoose'

const connectDB = (url: string) => connect(url!)

export default connectDB