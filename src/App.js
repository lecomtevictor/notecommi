import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  const fetchNotes = async () => {
    const response = await fetch("/notes");
    const result = await response.json();
    setNotes(result);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleNewNoteSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: newNoteTitle, content: newNoteContent })
    });

    if (response.ok) {
      const result = await response.json();
      setNotes([...notes, result]);
      setSelectedNote(result);
      setNewNoteTitle("");
      setNewNoteContent("");
    }
  };

  const handleGoBack = () => {
    setSelectedNote(null);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <aside className="Side">
        {selectedNote ? (
          <div>
            <h3>{selectedNote.title}</h3>
            <p>{selectedNote.content}</p>
            <button type="button" onClick={handleGoBack}>Retour</button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleNewNoteSubmit}>
              <label>
                Titre:
                <input type="text" value={newNoteTitle} onChange={(event) => setNewNoteTitle(event.target.value)} />
              </label>
              <label>
                Contenu:
                <textarea value={newNoteContent} onChange={(event) => setNewNoteContent(event.target.value)}></textarea>
              </label>
              <div>
                <button type="submit">Créer une note</button>
              </div>
            </form>
            <hr />
            {Array.isArray(notes) && notes.map((note) => (
              <div key={note.id} className='titre_notes'>
                <button><Link to={`/notes/${note.id}`} onClick={() => handleNoteClick(note)}>{note.title}</Link></button>
              </div>
            ))}
          </div>
        )}
      </aside>
      <main className="Main">
        {selectedNote && (
          <div>
            <h2>{selectedNote.title}</h2>
            <p>{selectedNote.content}</p>
          </div>
        )}
      </main>
    </>
  );
};

export default App;
