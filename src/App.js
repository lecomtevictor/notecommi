import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import "./App.css";
import Note from "./components/Note/Note";
import NewNote from "./components/Note/NewNote";

function App() {
  const [notes, setNotes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredNotes = notes?.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchNotes = async () => {
    const response = await fetch("/notes");
    const result = await response.json();
    setNotes(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    await fetchNotes();
  };

  return (
    <>
      <aside className="Side">

        {isLoading
          ? "Chargement..."
          : filteredNotes &&
            filteredNotes.map((note) => (
              <Link key={note.id} to={`/notes/${note.id}`}>
                <div className="Side-item">{note.title}</div>
              </Link>
            ))}

        <input
          className="SearchBar SearchBar-input"
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Link to="/new">
          <div className="New-note">Nouvelle note</div>
        </Link>
      </aside>
      <main className="Main">
        <Routes>
          <Route path="/notes/:id" element={<Note onSave={fetchNotes} />} />
          <Route path="/new" element={<NewNote onAddNote={handleAddNote} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
