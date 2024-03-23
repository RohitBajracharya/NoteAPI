const noteModel = require("../models/note");

const getNotesByUserId = async (userId) => {
    return await noteModel.find({ userId: userId });
}

const saveNotes = async (title, description, userId) => {
    const newNote = new noteModel({
        title: title,
        description: description,
        userId: userId
    });
    return await newNote.save();

}

const updateNoteById = async (title, description, userId, noteId) => {
    const newNote = {
        title: title,
        description: description,
        userId: userId,
    }
    return await noteModel.findByIdAndUpdate(noteId, newNote, { new: true });
}

const deleteNoteById = async (noteId) => {
    return await noteModel.findByIdAndDelete(noteId);
}

module.exports = {
    getNotesByUserId,
    saveNotes,
    updateNoteById,
    deleteNoteById
}