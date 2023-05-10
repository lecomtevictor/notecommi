import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./NewNote.css";

const NewNote = ({ onAddNote }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });
    const result = await response.json();
    onAddNote();
    navigate(`/notes/${result.id}`);
  };

  return (
    <>
      <form className="Form" onSubmit={handleSubmit}>
        <input
          className="Note-editable Note-title"
          type="text"
          placeholder="Titre de la note"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          className="Note-content Note-editable"
          placeholder="Contenu de la note"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <div className="Note-actions">
          <button className="Button" type="submit">
            Créer
          </button>
        </div>
      </form>
    </>
  );
};

export default NewNote;
