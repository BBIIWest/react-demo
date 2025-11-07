import { useForm, useFieldArray } from "react-hook-form";

interface Task {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  isUrgent?: boolean;
  urgentNote?: string;
}

interface FormData {
  projectName: string;
  tasks: Task[];
}

const ReactHookFormFieldArray = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      projectName: "",
      tasks: [{ title: "", description: "", priority: "medium" }],
    },
    // mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
    alert(`Project: ${data.projectName}\nTasks: ${data.tasks.length}`);
  };

  const priorityColors = {
    low: "bg-green-100 border-green-300",
    medium: "bg-gray-100 border-gray-300",
    high: "bg-red-100 border-red-300",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        React Hook Form (Field Array)
      </h1>
      <p className="text-gray-600 mb-4">
        Uses <code className="bg-gray-100 px-1 rounded">useFieldArray</code> for
        dynamic form fields (add/remove tasks)
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Project Task Manager
        </h2>

        {/* Project Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter project name"
            {...register("projectName", {
              required: "Project name is required",
              minLength: {
                value: 3,
                message: "Project name must be at least 3 characters",
              },
            })}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
              errors.projectName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.projectName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.projectName.message}
            </p>
          )}
        </div>

        {/* Tasks Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Tasks ({fields.length})
            </h3>
            <button
              type="button"
              onClick={() =>
                append({ title: "", description: "", priority: "medium" })
              }
              className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors text-sm font-medium cursor-pointer"
            >
              + Add Task
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => {
              const priority = watch(`tasks.${index}.priority`) || "medium";
              // const priority = field.priority || "medium";
              const isUrgent = watch(`tasks.${index}.isUrgent`);
              return (
                <div
                  key={field.id}
                  className={`border-2 rounded-lg p-4 ${priorityColors[priority]}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold text-gray-800">
                      Task {index + 1}
                    </h4>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer"
                      >
                        ❌
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    {/* Task Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Task title"
                        {...register(`tasks.${index}.title`, {
                          required: "Task title is required",
                          minLength: {
                            value: 3,
                            message: "Title must be at least 3 characters",
                          },
                        })}
                        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white ${
                          errors.tasks?.[index]?.title
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.tasks?.[index]?.title && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.tasks[index]?.title?.message}
                        </p>
                      )}
                    </div>

                    {/* Task Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        placeholder="Task description (optional)"
                        rows={2}
                        {...register(`tasks.${index}.description`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white"
                      />
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <select
                        {...register(`tasks.${index}.priority`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    {/* Conditional Field */}
                    <div>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register(`tasks.${index}.isUrgent`)}
                          className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Mark as urgent?</span>
                      </label>
                    </div>
                    {isUrgent && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Urgent Note</label>
                        <input
                          type="text"
                          placeholder="Why is this urgent?"
                          {...register(`tasks.${index}.urgentNote`)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-cyan-500 text-white py-3 px-4 rounded-md hover:bg-cyan-600 transition-colors font-medium text-lg cursor-pointer"
        >
          Submit Project
        </button>

        <div className="mt-4 p-3 bg-cyan-50 rounded-md text-sm text-gray-700">
          <strong>Note:</strong> Uses{" "}
          <code className="bg-cyan-100 px-1 rounded">useFieldArray</code> to
          dynamically add/remove tasks. Uses{" "}
          <code className="bg-cyan-100 px-1 rounded">watch()</code> to update
          task colors in real-time based on priority selection.
        </div>
      </form>
    </div>
  );
};

export default ReactHookFormFieldArray;
