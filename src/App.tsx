import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BadExample from "./BadExample";
import BetterExample from "./BetterExample";
import RefExample from "./RefExample";
import FormDataExample from "./FormDataExample";
import StateExample from "./StateExample";
import ReactHookFormUncontrolled from "./ReactHookFormUncontrolled";
import ReactHookFormControlled from "./ReactHookFormControlled";
import ReactHookFormFieldArray from "./ReactHookFormFieldArray";
import ZodExample from "./ZodExample";
import RenderCounter from "./RenderCounter";

function Home() {
  const dependencies = [
    { name: "react", version: "^19.1.1", description: "UI library" },
    { name: "react-dom", version: "^19.1.1", description: "React DOM renderer" },
    { name: "react-router-dom", version: "^7.9.5", description: "Client-side routing" },
    { name: "react-hook-form", version: "^7.66.0", description: "Performant form library" },
    { name: "zod", version: "^4.1.12", description: "TypeScript-first schema validation" },
  ];

  const devDependencies = [
    { name: "@tailwindcss/postcss", version: "^4.1.17", description: "Tailwind PostCSS plugin" },
    { name: "tailwindcss", version: "^4.1.17", description: "Utility-first CSS framework" },
    { name: "vite", version: "^7.1.7", description: "Fast build tool with HMR" },
    { name: "@vitejs/plugin-react", version: "^5.0.4", description: "React plugin for Vite" },
    { name: "typescript", version: "~5.9.3", description: "Type-safe JavaScript" },
    { name: "@types/react", version: "^19.1.16", description: "TypeScript types for React" },
    { name: "@types/react-dom", version: "^19.1.9", description: "TypeScript types for React DOM" },
    { name: "eslint", version: "^9.36.0", description: "JavaScript linter" },
    { name: "typescript-eslint", version: "^8.45.0", description: "ESLint for TypeScript" },
    { name: "autoprefixer", version: "^10.4.21", description: "PostCSS plugin for vendor prefixes" },
    { name: "postcss", version: "^8.5.6", description: "CSS transformation tool" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">React Demo</h1>
        <p className="text-gray-600 mb-8">
          Navigate using the buttons above to see the examples
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Dependencies</h2>
          <p className="text-sm text-gray-600 mb-4">Production packages</p>
          <div className="space-y-3">
            {dependencies.map((dep) => (
              <div key={dep.name} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{dep.name}</h3>
                    <p className="text-sm text-gray-600">{dep.description}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded ml-2">
                    {dep.version}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">Dev Dependencies</h2>
          <p className="text-sm text-gray-600 mb-4">Development & build tools</p>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {devDependencies.map((dep) => (
              <div key={dep.name} className="border-l-4 border-purple-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">{dep.name}</h3>
                    <p className="text-sm text-gray-600">{dep.description}</p>
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded ml-2 whitespace-nowrap">
                    {dep.version}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  console.log('App rendered at', new Date().toISOString());
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-4">
          <RenderCounter name="App" color="gray" />
        </div>
        <nav className="bg-white shadow-md mb-8 mt-4">
          <div className="container mx-auto px-4 py-4">
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                  Home
                </button>
              </Link>
              <Link to="/bad-example">
                <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer">
                  Bad Example
                </button>
              </Link>
              <Link to="/better-example">
                <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer">
                  Better Example
                </button>
              </Link>
              <Link to="/ref-example">
                <button className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors cursor-pointer">
                  Ref Example
                </button>
              </Link>
              <Link to="/formdata-example">
                <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors cursor-pointer">
                  FormData Example
                </button>
              </Link>
              <Link to="/state-example">
                <button className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors cursor-pointer">
                  State Example
                </button>
              </Link>
              <Link to="/rhf-uncontrolled">
                <button className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors cursor-pointer">
                  RHF Uncontrolled
                </button>
              </Link>
              <Link to="/rhf-controlled">
                <button className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer">
                  RHF Controlled
                </button>
              </Link>
              <Link to="/rhf-field-array">
                <button className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors cursor-pointer">
                  RHF Field Array
                </button>
              </Link>
              <Link to="/zod-example">
                <button className="px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors cursor-pointer">
                  Zod Validation
                </button>
              </Link>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bad-example" element={<BadExample />} />
            <Route path="/better-example" element={<BetterExample />} />
            <Route path="/ref-example" element={<RefExample />} />
            <Route path="/formdata-example" element={<FormDataExample />} />
            <Route path="/state-example" element={<StateExample />} />
            <Route path="/rhf-uncontrolled" element={<ReactHookFormUncontrolled />} />
            <Route path="/rhf-controlled" element={<ReactHookFormControlled />} />
            <Route path="/rhf-field-array" element={<ReactHookFormFieldArray />} />
            <Route path="/zod-example" element={<ZodExample />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
