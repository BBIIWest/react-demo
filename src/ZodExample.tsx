import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RenderCounter from "./RenderCounter";

// Define Zod schema
const signupFormSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  age: z.number()
    .min(18, "Must be at least 18 years old")
    .max(100, "Must be at most 100 years old"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string()
    .min(1, "Please confirm your password"),
  hasNotes: z.boolean().optional(),
  notes: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => {
  // Conditional validation: if hasNotes is true, notes must have content
  if (data.hasNotes && (!data.notes || data.notes.trim().length === 0)) {
    return false;
  }
  return true;
}, {
  message: "Notes are required when 'Add notes' is checked",
  path: ["notes"],
});

// Infer TypeScript type from Zod schema
type FormData = z.infer<typeof signupFormSchema>;

const ZodExample = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      age: undefined,
      password: "",
      confirmPassword: "",
      hasNotes: false,
      notes: "",
    },
    mode: "onChange",
  });

  const hasNotes = watch("hasNotes");

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
    alert(`Email: ${data.email}\nAge: ${data.age}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <RenderCounter name="ZodExample" color="violet" />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Zod Validation Example</h1>
      <p className="text-gray-600 mb-4">
        Uses <code className="bg-gray-100 px-1 rounded">Zod</code> for type-safe schema validation with React Hook Form
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <div className="mb-3">
          <RenderCounter name="Form" color="violet" />
        </div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Zod Validated Form</h2>
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="email@example.com"
              {...register("email")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Age"
              {...register("age", { valueAsNumber: true })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Must be 8+ characters with uppercase, lowercase, and number
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Conditional Field */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                {...register("hasNotes")}
                className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:outline-none focus:ring-violet-500"
              />
              <span className="text-sm font-medium text-gray-700">Add notes</span>
            </label>
          </div>
          {hasNotes && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Enter your notes..."
                {...register("notes")}
                rows={3}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                  errors.notes ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.notes && (
                <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-2 px-4 rounded-md hover:bg-violet-600 transition-colors font-medium cursor-pointer"
          >
            Submit
          </button>
        </div>
        <div className="mt-4 p-3 bg-violet-50 rounded-md text-sm text-gray-700">
          <strong>Note:</strong> Uses <code className="bg-violet-100 px-1 rounded">Zod</code> schema with{" "}
          <code className="bg-violet-100 px-1 rounded">zodResolver</code> for type-safe validation including regex patterns, cross-field validation, and conditional requirements.
        </div>
      </form>
    </div>
  );
};

export default ZodExample;
