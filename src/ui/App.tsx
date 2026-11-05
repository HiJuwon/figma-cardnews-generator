import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(5);
  const send = (type: string) =>
    parent.postMessage({ pluginMessage: { type, count } }, '*');

  return (
    <div className="flex flex-col gap-3 p-4 text-sm">
      <h2 className="text-base font-bold">Rectangle Creator</h2>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="rounded border px-2 py-1"
      />
      <div className="flex gap-2">
        <button
          onClick={() => send('create-shapes')}
          className="flex-1 rounded bg-blue-600 py-1.5 text-white hover:bg-blue-700"
        >
          Create
        </button>
        <button
          onClick={() => send('cancel')}
          className="flex-1 rounded border py-1.5 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}