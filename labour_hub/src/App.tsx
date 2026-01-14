import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">
        Vite + React + Tailwind 🚀
      </h1>

      <button
        onClick={() => setCount(count + 1)}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition"
      >
        Count is {count}
      </button>

      <p className="mt-6 text-gray-400">
        Edit <code className="text-blue-400">src/App.jsx</code> and save to test HMR
      </p>
    </div>
  );
}

export default App;
