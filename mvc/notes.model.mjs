import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    userName: {
        // require: true,
        type: String
    },
    fileName: {
        type: String
    },
    note: {
        require: true,
        type: String
    }
})

const Note = mongoose.model('Note', noteSchema)

export default Note