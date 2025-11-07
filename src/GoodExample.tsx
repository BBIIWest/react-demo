import { useState } from "react";

const Form = ({ handleSubmit, count, setCount, name, setName }) => {
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors font-medium"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const GoodExample = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  //a bunch of stuff here, effects to fetch data etc.

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Good Example</h1>
      <p className="text-gray-600 mb-4">Component defined outside parent (proper pattern)</p>
      <Form
        handleSubmit={handleSubmit}
        count={count}
        setCount={setCount}
        name={name}
        setName={setName}
      />
    </div>
  );
};

export default GoodExample;