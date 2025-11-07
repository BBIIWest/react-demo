import { useState } from "react";
import RenderCounter from "./RenderCounter";

const StateExample = () => {
  const [count, setCount] = useState("");
  const [name, setName] = useState("");
  const [hasNotes, setHasNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ count?: string; name?: string }>({});
  const [touched, setTouched] = useState<{ count?: boolean; name?: boolean }>({});

  const validateCount = (value: string) => {
    if (!value) {
      return "Please fill out this field.";
    }
    const num = Number(value);
    if (num < 1) {
      return "Value must be greater than or equal to 1.";
    }
    return "";
  };

  const validateName = (value: string) => {
    if (!value) {
      return "Please fill out this field.";
    }
    if (value.length < 3) {
      return "Please lengthen this text to 3 characters or more (you are currently using " + value.length + " characters).";
    }
    return "";
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCount(value);

    if (touched.count) {
      const error = validateCount(value);
      setErrors(prev => ({ ...prev, count: error }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    if (touched.name) {
      const error = validateName(value);
      setErrors(prev => ({ ...prev, name: error }));
    }
  };

  const handleCountBlur = () => {
    setTouched(prev => ({ ...prev, count: true }));
    const error = validateCount(count);
    setErrors(prev => ({ ...prev, count: error }));
  };

  const handleNameBlur = () => {
    setTouched(prev => ({ ...prev, name: true }));
    const error = validateName(name);
    setErrors(prev => ({ ...prev, name: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const countError = validateCount(count);
    const nameError = validateName(name);

    setErrors({ count: countError, name: nameError });
    setTouched({ count: true, name: true });

    if (!countError && !nameError) {
      console.log("Submitted:", { count, name });
      alert(`Count: ${count}, Name: ${name}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <RenderCounter name="StateExample" color="teal" />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">State Example (Controlled)</h1>
      <p className="text-gray-600 mb-4">
        Uses controlled inputs with real-time validation (shows errors immediately)
      </p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <div className="mb-3">
          <RenderCounter name="Form" color="teal" />
        </div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">State Form with Validation</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Count <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Count"
              value={count}
              onChange={handleCountChange}
              onBlur={handleCountBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.count && touched.count ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.count && touched.count && (
              <p className="mt-1 text-sm text-red-600">{errors.count}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.name && touched.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && touched.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasNotes}
                onChange={e => setHasNotes(e.target.checked)}
                className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:outline-none focus:ring-teal-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors font-medium cursor-pointer"
          >
            Submit
          </button>
        </div>
        <div className="mt-4 p-3 bg-teal-50 rounded-md text-sm text-gray-700">
          <strong>Note:</strong> This form uses controlled inputs with <code className="bg-teal-100 px-1 rounded">useState</code>. Validation errors appear immediately as you type after first blur.
        </div>
      </form>
    </div>
  );
};

export default StateExample;
