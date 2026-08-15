import React, { useState } from 'react';

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
    <div className="min-h-screen bg-bg flex items-center justify-center p-4 text-ink font-sans">
      <div className="w-full max-w-[400px] p-8 border-2 border-ink bg-white shadow-[8px_8px_0px_var(--color-ink)]">
        <h1 className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 mb-4">Focus Counter</h1>
        
        <div className="text-[6rem] font-bold leading-none tracking-[-0.05em] text-center my-8">
          {count}
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => setCount(c => c - 1)} 
            aria-label="minus"
            className="p-4 bg-white border border-ink font-bold cursor-pointer hover:bg-ink hover:text-white transition-colors"
          >
            −
          </button>
          <button 
            onClick={() => setCount(0)} 
            aria-label="reset"
            className="p-4 bg-white border border-ink font-bold cursor-pointer hover:bg-ink hover:text-white transition-colors"
          >
            ⟲
          </button>
          <button 
            onClick={() => setCount(c => c + 1)} 
            aria-label="plus"
            className="p-4 bg-white border border-ink font-bold cursor-pointer hover:bg-ink hover:text-white transition-colors"
          >
            +
          </button>
        </div>

        <div className="mt-8 pt-4 border-t border-ink">
          <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.15em] opacity-60 mb-4">Quick Notes</h2>
          <form onSubmit={addNote} className="flex flex-col gap-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Type a thought..." 
              className="w-full p-3 border border-ink font-inherit focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button 
              type="submit" 
              className="w-full p-4 bg-white border border-ink font-bold cursor-pointer hover:bg-ink hover:text-white transition-colors"
            >
              ADD
            </button>
          </form>
          
          <div className="mt-4 max-h-[30vh] overflow-y-auto">
            {notes.map(note => (
              <div key={note.id} className="flex items-center justify-between py-2 border-b border-dashed border-[#ccc] text-[0.85rem]">
                <span className="truncate pr-4">{note.text}</span>
                <button 
                  onClick={() => setNotes(notes.filter(n => n.id !== note.id))} 
                  className="border-none p-1 bg-transparent cursor-pointer opacity-50 hover:opacity-100 hover:text-accent transition-colors"
                  aria-label="delete"
                >
                  ✕
                </button>
              </div>
            ))}
            {notes.length === 0 && (
              <div className="text-center py-6 text-[0.85rem] opacity-50">No notes yet. Add one above.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
