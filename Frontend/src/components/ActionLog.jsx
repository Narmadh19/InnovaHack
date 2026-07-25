const logs = [
  "10:30 Goal Understood",
  "10:31 Planner Created",
  "10:32 Searching Flights",
  "10:33 Searching Hotels",
];

function ActionLog() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
      <h2 className="text-xl text-white font-bold mb-6">
        Live Action Log
      </h2>

      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log}
            className="bg-slate-800 p-3 rounded-lg text-gray-300"
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActionLog;