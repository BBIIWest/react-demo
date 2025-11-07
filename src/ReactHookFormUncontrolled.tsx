import { useForm } from "react-hook-form";
import RenderCounter from "./RenderCounter";

interface FormData {
  count: number;
  name: string;
  hasNotes?: boolean;
  notes?: string;
}

const ReactHookFormUncontrolled = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    // mode: "onChange"
  });

  const hasNotes = watch("hasNotes");

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
    alert(`Count: ${data.count}, Name: ${data.name}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <RenderCounter name="ReactHookFormUncontrolled" color="pink" />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">React Hook Form (Uncontrolled)</h1>
      <p className="text-gray-600 mb-4">
        Uses react-hook-form with uncontrolled inputs via <code className="bg-gray-100 px-1 rounded">register()</code>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <div className="mb-3">
          <RenderCounter name="Form" color="pink" />
        </div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">React Hook Form (Uncontrolled)</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Count <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Count"
              {...register("count", {
                required: "Please fill out this field.",
                min: {
                  value: 1,
                  message: "Value must be greater than or equal to 1.",
                },
                valueAsNumber: true,
              })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                errors.count ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.count && (
              <p className="mt-1 text-sm text-red-600">{errors.count.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "Please fill out this field.",
                minLength: {
                  value: 3,
                  message: "Please lengthen this text to 3 characters or more.",
                },
              })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("hasNotes")}
                className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:outline-none focus:ring-pink-500"
              />
              <span className="text-sm font-medium text-gray-700">Add notes</span>
            </label>
          </div>
          {hasNotes && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                placeholder="Enter your notes..."
                {...register("notes")}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition-colors font-medium cursor-pointer"
          >
            Submit
          </button>
        </div>
        <div className="mt-4 p-3 bg-pink-50 rounded-md text-sm text-gray-700">
          <strong>Note:</strong> Uses <code className="bg-pink-100 px-1 rounded">useForm</code> and <code className="bg-pink-100 px-1 rounded">register()</code> for uncontrolled inputs. Validation happens on submit by default.
        </div>
      </form>
    </div>
  );
};

export default ReactHookFormUncontrolled;
