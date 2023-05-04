import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import "./Note.css";

const Note = ({ onSave, onDelete, history }) => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const fetchNote = useCallback(async () => {
    const response = await fetch(`/notes/${id}`);
    const result = await response.json();
    setNote(result);
  }, [id]);

  useEffect(() => {
    fetchNote();
  }, [id, fetchNote]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    onSave();
  };

  const handleDelete = async () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    await fetch(`/notes/${id}`, {
      method: "DELETE",
    });
    setShowDeleteDialog(false);
    onSave();
    navigate("/");
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <input
        className="Note-editable Note-title"
        type="text"
        value={note ? note.title : ""}
        onChange={(event) => {
          setNote({ ...note, title: event.target.value });
        }}
      />
      <textarea
        className="Note-editable Note-content"
        value={note ? note.content : ""}
        onChange={(event) => {
          setNote({ ...note, content: event.target.value });
        }}
      />
      <div className="Note-actions ">
        <button className="Button" type="submit">
          Enregistrer
        </button>
        <button
          className="Button Button--danger"
          type="button"
          onClick={handleDelete}
        >
          Supprimer
        </button>
        {showDeleteDialog && (
          <div className="Dialog">
            <p>Êtes-vous sûr de vouloir supprimer cette note ?</p>
            <button className="Button" onClick={handleDeleteConfirm}>
              Oui
            </button>
            <button className="Button" onClick={handleDeleteCancel}>
              Annuler
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default Note;
