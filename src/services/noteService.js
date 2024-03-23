const noteModel = require("../models/note");

const getNotesByUserId = async (userId) => {
    try {
        return await noteModel.find({ userId: userId });
    } catch (error) {
        console.error("Error :", error);
        throw error;
    }
}

const saveNotes = async (title, description, userId) => {
    const newNote = new noteModel({
        title: title,
        description: description,
        userId: userId
    });
    try {
        return await newNote.save();
    } catch (error) {
        console.log("Error : " + error);
        throw error;
    }

}

const updateNoteById = async (title, description, userId, noteId) => {
    const newNote = {
        title: title,
        description: description,
        userId: userId,
    }
    try {
        return await noteModel.findByIdAndUpdate(noteId, newNote, { new: true });
    } catch (error) {
        console.log("Error: " + error);
        throw error;
    }
}

const deleteNoteById = async (noteId) => {
    try {
        return await noteModel.findByIdAndDelete(noteId);
    } catch (error) {
        console.log("Error: " + error);
        throw error;
    }
}

module.exports = {
    getNotesByUserId,
    saveNotes,
    updateNoteById,
    deleteNoteById
}