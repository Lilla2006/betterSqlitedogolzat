import Database from 'better-sqlite3'
const db = new Database('./database.sqlite')
db.prepare(`CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title STRING, content STRING)`).run()

export const getNotes = () => db.prepare('SELECT * FROM notes').all()
export const getNote = (id) => db.prepare('SELECT * FROM notes WHERE id = ?').get(id)
export const saveNote = (title, content) => db.prepare('INSERT INTO notes title = ?, content = ? VALUES (?, ?').run(title, content)
export const deleteNote = (id) => db.prepare('DELETE FROM notes WHERE id = ?').run(id)

const notes = [
    {title: 'jegyzet1', content: 'szoveg1'},
    {title: 'jegyzet2', content: 'szoveg2'},
    {title: 'jegyzet3', content: 'szoveg3'},
    {title: 'jegyzet4', content: 'szoveg4'}
]

for (const note of notes) saveNote(note.title, note.content)