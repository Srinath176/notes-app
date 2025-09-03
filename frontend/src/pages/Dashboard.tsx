import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    // 🔹 Later: Replace with API call -> axios.get("/api/notes")
    setNotes(["Note 1", "Note 2"]);
  }, []);

  const handleSignOut = () => {
    // 🔹 Later: Clear JWT token
    navigate("/signin");
  };

  const handleCreateNote = () => {
    setShowModal(true);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    // 🔹 Later: Replace with axios.post("/api/notes", { text: newNote })
    setNotes([...notes, newNote]);
    setNewNote("");
    setShowModal(false);
  };

  const handleDeleteNote = (index: number) => {
    // 🔹 Later: Replace with axios.delete(`/api/notes/${id}`)
    const updated = [...notes];
    updated.splice(index, 1);
    setNotes(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full bg-blue-600 animate-spin mr-2"></div>
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
          <h2 className="text-lg font-semibold">Welcome, Jonas Kahnwald !</h2>
          <p className="text-gray-500">Email: xxxxxx@xxxx.com</p>
        </div>

        {/* Create Note */}
        <button
          onClick={handleCreateNote}
          className="w-full md:w-auto px-6 py-3 mb-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Create Note
        </button>

        {/* Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
            >
              <span>{note}</span>
              <button
                onClick={() => handleDeleteNote(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-100 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
