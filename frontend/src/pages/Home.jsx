import { useState, useEffect } from "react";
import api from "../api";
import Update from "./Update";
import Notes from "../components/Notes";

function Home() {
    const [notes, setNotes] = useState([]);
    const [usersname, setUsersname] = useState("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        try {
            const response = await api.get('/api/user/info/');
            if (response.status === 200) {
                setUsersname(response.data.username);
            } else {
                console.error('Failed to fetch user info:', response.status);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };


    async function getNotes(){
        const res = await api.get("/api/notes/")
        if (res.status === 200){
            setNotes(res.data)
        }
        else {
            // Handle non-200 responses here
            alert('Failed to fetch notes:', res.status);
        }
    }

    async function deleteNote  (id)  {
        const res = await api.delete(`/api/notes/delete/${id}/`)
        if (res.status === 200) {
            alert("Note deleted!");
        }
        getNotes();
    };

    async function createNote  (e)  {
        e.preventDefault();
        const res = await api.post("/api/notes/", { content, title })
        if (res.status === 200){
            alert("Note created!");
            setTitle("")
            setContent("")
            getNotes();
        }    
    };


    

    return (
        <div>
            <h1>WELCOME {usersname}</h1>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Notes note={note} onDelete={deleteNote}  key={note.id} />
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home;