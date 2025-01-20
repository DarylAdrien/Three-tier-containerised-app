import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function Update() {
    const { id } = useParams(); // Get note ID from URL
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the existing note data when the component mounts
        const fetchNote = async () => {
            try {
                const res = await api.get(`/api/notes/update/${id}/`);
                setTitle(res.data.title);
                setContent(res.data.content);
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        };

        fetchNote();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/api/notes/update/${id}/`, { title, content });
            if (res.status === 200) {
                alert("Note updated successfully!");
                navigate("/");
            } else {
                alert("Failed to update note.");
            }
        } catch (error) {
            alert("Error updating note.");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Update Note</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                <br />
                <button type="submit">Update Note</button>
            </form>
        </div>
    );
}

export default Update;
