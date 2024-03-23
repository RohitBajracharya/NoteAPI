const noteModel = require("../models/note");
const { getNotesByUserId, saveNotes, updateNoteById, deleteNoteById } = require("../services/noteService");

const getNotes = async (req, res) => {
    try {
        const notes = await getNotesByUserId(req.userId);
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const createNote = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.userId;
    try {
        const newNote = await saveNotes(title, description, userId);
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const updateNote = async (req, res) => {
    const noteId = req.params.id;
    const userId = req.userId;
    const { title, description } = req.body;
    try {
        const updatedNote = await updateNoteById(title, description, userId, noteId)
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const deleteNote = async (req, res) => {
    const noteId = req.params.id;
    try {
        const deletedNote = await deleteNoteById(noteId);
        res.status(202).json(deletedNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}



module.exports = {
    createNote, updateNote, deleteNote, getNotes
}