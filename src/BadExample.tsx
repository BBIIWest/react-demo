import { useState } from "react";

const BadExample = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [hasNotes, setHasNotes] = useState(false);
  const [notes, setNotes] = useState('');
  //a bunch of stuff here, effects to fetch data etc.

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const Form = () => {
    return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Form Component</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
            <input
              type="number"
              placeholder="Count"
              value={count}
              onChange={e => setCount(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasNotes}
                onChange={e => setHasNotes(e.target.checked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:outline-none focus:ring-red-500"
              />
              <span className="text-sm font-medium text-gray-700">Add notes</span>
            </label>
          </div>
          {hasNotes && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                placeholder="Enter your notes..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors font-medium cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    );
  };


  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Bad Example</h1>
      <p className="text-gray-600 mb-4">Component defined inside parent (causes re-renders)</p>
      <Form />
    </div>
  );
};

export default BadExample;