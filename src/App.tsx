import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BadExample from "./BadExample";
import GoodExample from "./GoodExample";
import RefExample from "./RefExample";
import FormDataExample from "./FormDataExample";
import ControlledValidationExample from "./ControlledValidationExample";

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">React Demo</h1>
      <p className="text-gray-600 mb-8">
        Navigate using the buttons above to see the examples
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md mb-8">
          <div className="container mx-auto px-4 py-4">
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Home
                </button>
              </Link>
              <Link to="/bad-example">
                <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Bad Example
                </button>
              </Link>
              <Link to="/good-example">
                <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Good Example
                </button>
              </Link>
              <Link to="/ref-example">
                <button className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  Ref Example
                </button>
              </Link>
              <Link to="/formdata-example">
                <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  FormData Example
                </button>
              </Link>
              <Link to="/controlled-validation">
                <button className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors">
                  Controlled Validation
                </button>
              </Link>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bad-example" element={<BadExample />} />
            <Route path="/good-example" element={<GoodExample />} />
            <Route path="/ref-example" element={<RefExample />} />
            <Route path="/formdata-example" element={<FormDataExample />} />
            <Route path="/controlled-validation" element={<ControlledValidationExample />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
