import { useForm, Controller } from "react-hook-form";

interface FormData {
  count: string;
  name: string;
  hasNotes?: boolean;
  notes?: string;
}

const ReactHookFormControlled = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      count: "",
      name: "",
      hasNotes: false,
      notes: "",
    },
    mode: "onChange", // Validate on every change
  });

  const hasNotes = watch("hasNotes");

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
    alert(`Count: ${data.count}, Name: ${data.name}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">React Hook Form (Controlled)</h1>
      <p className="text-gray-600 mb-4">
        Uses react-hook-form with controlled inputs via <code className="bg-gray-100 px-1 rounded">Controller</code>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">React Hook Form (Controlled)</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Count <span className="text-red-500">*</span>
            </label>
            <Controller
              name="count"
              control={control}
              rules={{
                required: "Please fill out this field.",
                validate: (value) => {
                  const num = Number(value);
                  if (num < 1) {
                    return "Value must be greater than or equal to 1.";
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Count"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.count ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              )}
            />
            {errors.count && (
              <p className="mt-1 text-sm text-red-600">{errors.count.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Please fill out this field.",
                minLength: {
                  value: 3,
                  message: "Please lengthen this text to 3 characters or more.",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Name"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              )}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Controller
              name="hasNotes"
              control={control}
              render={({ field }) => (
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={e => field.onChange(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:outline-none focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Add notes</span>
                </label>
              )}
            />
          </div>
          {hasNotes && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Enter your notes..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                )}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors font-medium cursor-pointer"
          >
            Submit
          </button>
        </div>
        <div className="mt-4 p-3 bg-indigo-50 rounded-md text-sm text-gray-700">
          <strong>Note:</strong> Uses <code className="bg-indigo-100 px-1 rounded">Controller</code> for controlled inputs with <code className="bg-indigo-100 px-1 rounded">mode: "onChange"</code> for real-time validation.
        </div>
      </form>
    </div>
  );
};

export default ReactHookFormControlled;
