import mongoose from 'mongoose'

export const ConnectDB = async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION || "");
    console.log(`mongoose is connect with ${mongoose.connection.host}`)
}