import express from 'express'
import * as db from './util/database.js'

const app = express()
app.use(express.json())
const PORT = 8080

app.get('/notes', (req, res) => {
    const notes = db.getNotes()
    res.status(200).json(notes)
})

app.get('/notes/:id', (req, res) => {
    const note = db.getNote(req.params.id)
    if(!note) {
        return res.status(404).json({message: 'Note not found'})
    }
    res.status(200).json(note)
})

app.post('/notes', (req, res) => {
    const {title, content} = req.body
    if (!title || !content) {
        return res.status(400).json({message: 'Invalid credentials'})
    }
    const savedNote = db.saveNote(title, content)
    if (savedNote.changes != 1) {
        return res.status(501).json({message: 'Saved failed'})
    }
    res.status(200).json({id, title, content})
})

app.delete('/notes/:id', (req, res) => {
    const deletedNote = db.deleteNote(req.params.id)
    if (deletedNote.changes != 1) {
        return res.status(404).json({message: 'Delete failed'})
    }
    res.status(204).json({message: 'Delete successful'})
})

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`)
})