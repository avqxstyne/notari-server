import mongoose, { Mongoose, mongo } from 'mongoose';
const MONGODB = "mongodb://127.0.0.1:27017";

const db = async () => {
    try {
        const con = await mongoose.connect(MONGODB);
        console.log(`MongoDB connected: ${con.connection.host}`)
    } catch(e) {
        console.log(e)
    }
}

export default db