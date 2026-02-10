import { useEffect, useState } from 'react';

export function App() {
  const [health, setHealth] = useState<string>('checking...');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data: { status: string }) => setHealth(data.status))
      .catch(() => setHealth('error'));
  }, []);

  return (
    <div>
      <h1>CellarSync</h1>
      <p>API status: {health}</p>
    </div>
  );
}
