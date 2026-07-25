const workflow = [
  { step: "Goal Understanding", status: "completed" },
  { step: "Planner Agent", status: "completed" },
  { step: "Flight Agent", status: "running" },
  { step: "Hotel Agent", status: "pending" },
  { step: "Weather Agent", status: "pending" },
  { step: "Budget Agent", status: "pending" },
];

const getStatus = (status) => {
  if (status === "completed") return "✅";
  if (status === "running") return "🔄";
  return "⏳";
};

function WorkflowProgress() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
      <h2 className="text-xl text-white font-bold mb-6">
        Workflow Progress
      </h2>

      <div className="w-full h-3 bg-slate-700 rounded-full">
        <div className="w-[65%] h-3 bg-cyan-400 rounded-full"></div>
      </div>

      <p className="text-cyan-400 mt-3 font-semibold">65%</p>

      <div className="mt-8 space-y-4">
        {workflow.map((item) => (
          <div
            key={item.step}
            className="flex justify-between text-gray-200"
          >
            <span>{item.step}</span>
            <span>{getStatus(item.status)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkflowProgress;