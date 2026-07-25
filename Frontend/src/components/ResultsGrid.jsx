function Card({ title, emoji }) {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 text-center hover:border-cyan-400 transition">
      <div className="text-4xl">{emoji}</div>
      <h3 className="text-white font-semibold mt-4">{title}</h3>
      <p className="text-gray-400 mt-2">Waiting for backend...</p>
    </div>
  );
}

function ResultsGrid() {
  return (
    <div className="grid md:grid-cols-4 gap-6 mt-10">
      <Card title="Flights" emoji="✈️" />
      <Card title="Hotels" emoji="🏨" />
      <Card title="Weather" emoji="🌦️" />
      <Card title="Budget" emoji="💰" />
    </div>
  );
}

export default ResultsGrid;