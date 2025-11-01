import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database connected'))
        await mongoose.connect(process.env.MONGO_URI) // Use MONGO_URI directly
    } catch (error) {
        console.log('MongoDB connection error:', error.message)
    }
}

export default connectDB