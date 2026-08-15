import { useState } from 'react';
import { Plus, Minus, RotateCcw, Trash2 } from 'lucide-react';

export default function App() {
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState<{ id: number; text: string }[]>([]);
  const [input, setInput] = useState('');

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setNotes([...notes, { id: Date.now(), text: input }]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 text-neutral-100 font-sans selection:bg-neutral-800">
      <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Focus Counter</h1>
          <div className="text-6xl font-light tabular-nums">{count}</div>
          <div className="flex justify-center gap-2">
            <button onClick={() => setCount(c => c - 1)} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors"><Minus size={18} /></button>
            <button onClick={() => setCount(0)} className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-colors"><RotateCcw size={18} /></button>
            <button onClick={() => setCount(c => c + 1)} className="p-3 bg-neutral-100 hover:bg-white text-black rounded-xl transition-colors"><Plus size={18} /></button>
          </div>
        </div>

        <div className="h-px bg-neutral-800 w-full" />

        <div className="space-y-4">
          <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Quick Notes</h2>
          <form onSubmit={addNote} className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a thought..." className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-neutral-600 transition-colors placeholder:text-neutral-600" />
            <button type="submit" className="bg-neutral-100 text-black px-4 rounded-xl text-sm font-medium hover:bg-white transition-colors">Add</button>
          </form>
          
          <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1">
            {notes.map(note => (
              <div key={note.id} className="group flex items-center justify-between bg-neutral-800/50 rounded-xl p-3 text-sm border border-transparent hover:border-neutral-700 transition-colors">
                <span className="truncate pr-4">{note.text}</span>
                <button onClick={() => setNotes(notes.filter(n => n.id !== note.id))} className="text-neutral-500 hover:text-red-400 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {notes.length === 0 && (
              <div className="text-center py-6 text-sm text-neutral-600">No notes yet. Add one above.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
