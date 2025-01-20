import React from "react";
import { Link } from "react-router-dom";
// import "../styles/Note.css"

function Notes({ note, onDelete ,onUpdate}) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <div className="note-container">
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
            <Link to={`/notes/update/${note.id}`} className="update-button">
                Update
            </Link>
        </div>
    );
}

export default Notes