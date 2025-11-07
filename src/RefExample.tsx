import { useRef, useState } from "react";

const RefExample = () => {
  const countRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const [hasNotes, setHasNotes] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check validation using Constraint Validation API
    const countValid = countRef.current?.checkValidity();
    const nameValid = nameRef.current?.checkValidity();

    if (countValid && nameValid) {
      // Access values directly from refs
      const countValue = countRef.current?.value;
      const nameValue = nameRef.current?.value;
      console.log("Submitted:", { count: countValue, name: nameValue });
      alert(`Count: ${countValue}, Name: ${nameValue}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Ref Example (Uncontrolled)</h1>
      <p className="text-gray-600 mb-4">
        Uses refs to access form values (not controlled by React state)
      </p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Ref Form</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Count <span className="text-red-500">*</span>
            </label>
            <input
              ref={countRef}
              type="number"
              placeholder="Count"
              defaultValue=""
              required
              min={1}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent border-gray-300`}
            />
  
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              ref={nameRef}
              type="text"
              placeholder="Name"
              defaultValue=""
              required
              minLength={3}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent border-gray-300`}
            />
          </div>
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasNotes}
                onChange={e => setHasNotes(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">Add notes?</span>
            </label>
          </div>
          {hasNotes && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                ref={notesRef}
                placeholder="Enter your notes..."
                defaultValue=""
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors font-medium cursor-pointer"
          >
            Submit
          </button>
        </div>
        <div className="mt-4 p-3 bg-purple-50 rounded-md text-sm text-gray-700">
          <strong>Note:</strong> This form uses <code className="bg-purple-100 px-1 rounded">useRef</code> and <code className="bg-purple-100 px-1 rounded">defaultValue</code>. Validation uses HTML5 Constraint Validation API.
        </div>
      </form>
    </div>
  );
};

export default RefExample;
