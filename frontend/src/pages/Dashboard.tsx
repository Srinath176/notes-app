import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Loader2, Loader } from "lucide-react";
import API from "../api/authApi";
import toast from "react-hot-toast";

interface User {
  name: string;
  email: string;
}

interface Note {
  _id: string;
  text: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(true); // loading state
  const [addingNote, setAddingNote] = useState(false); // loader for add note

  useEffect(() => {
    fetchUser();
    fetchNotes();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/user");
      setUser(res.data.user);
    } catch (err) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      navigate("/signin");
    }
  };

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await API.get("/notes");
      setNotes(res.data.notes);
    } catch (err) {
      toast.error("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token")
    navigate("/signin");
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    setAddingNote(true);
    try {
      await API.post("/notes", { text: newNote });
      setNewNote("");
      setShowModal(false);
      fetchNotes();
      toast.success("Note added!");
    } catch (err) {
      toast.error("Error adding note");
    } finally {
      setAddingNote(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted");
    } catch (err) {
      toast.error("Error deleting note");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-around items-center px-6 py-4 bg-white shadow">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full text-blue-500 mr-2"><Loader /></div>
          <span className="text-xl font-semibold">Dashboard</span>
        </div>
        <button
          onClick={handleSignOut}
          className="text-blue-600 font-medium hover:underline"
        >
          Sign Out
        </button>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto p-6">
        {/* Welcome card */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="text-lg font-semibold">
            Welcome, {user?.name || "Guest"}!
          </h2>
          <p className="text-gray-500">Email: {user?.email}</p>
        </div>

        {/* Create Note */}
        <button
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto px-6 py-3 mb-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 hover:cursor-pointer"
        >
          <Plus className="w-5 h-5" /> Create Note
        </button>

        {/* Notes Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p>
              No notes yet. Click{" "}
              <span className="font-semibold">Create Note</span> to add your
              first note.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
              >
                <span>{note.text}</span>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-5xl">
            <h3 className="text-lg font-semibold mb-4">Create a new note</h3>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Write your note here..."
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                disabled={addingNote}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
              >
                {addingNote && <Loader2 className="w-4 h-4 animate-spin" />}
                {addingNote ? "Adding..." : "Add Note"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
