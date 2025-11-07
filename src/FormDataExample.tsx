import { useState } from "react";

const FormDataExample = () => {
  const [errors, setErrors] = useState<{ count?: string; name?: string }>({});
  const [hasNotes, setHasNotes] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check form validity using HTML5 validation
    const form = e.currentTarget;
    const countInput = form.elements.namedItem('count') as HTMLInputElement;
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;

    const countValid = countInput.checkValidity();
    const nameValid = nameInput.checkValidity();

    const newErrors: { count?: string; name?: string } = {};
    if (!countValid) {
      newErrors.count = countInput.validationMessage;
    }
    if (!nameValid) {
      newErrors.name = nameInput.validationMessage;
    }

    setErrors(newErrors);

    if (countValid && nameValid) {
      // Access form data using FormData API
      const formData = new FormData(form);
      const count = formData.get('count');
      const name = formData.get('name');

      console.log("Submitted:", { count, name });
      alert(`Count: ${count}, Name: ${name}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">FormData Example (Uncontrolled)</h1>
      <p className="text-gray-600 mb-4">
        Uses FormData API to access form values (no refs, no state)
      </p>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">FormData Form</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Count <span className="text-red-500">*</span>
            </label>
            <input
              name="count"
              type="number"
              placeholder="Count"
              defaultValue=""
              required
              min={1}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.count ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.count && (
              <p className="mt-1 text-sm text-red-600">{errors.count}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              defaultValue=""
              required
              minLength={3}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasNotes}
                onChange={e => setHasNotes(e.target.checked)}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-gray-700">Add notes?</span>
            </label>
          </div>
          {hasNotes && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                placeholder="Enter your notes..."
                defaultValue=""
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors font-medium cursor-pointer"
          >
            Submit
          </button>
        </div>
        <div className="mt-4 p-3 bg-orange-50 rounded-md text-sm text-gray-700">
          <strong>Note:</strong> This form uses the <code className="bg-orange-100 px-1 rounded">FormData</code> API to access values. Validation uses HTML5 Constraint Validation API.
        </div>
      </form>
    </div>
  );
};

export default FormDataExample;
