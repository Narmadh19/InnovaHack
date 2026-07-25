const agents = [
  {
    name: "Goal Understanding Agent",
    status: "Completed",
  },
  {
    name: "Planner Agent",
    status: "Completed",
  },
  {
    name: "Flight Agent",
    status: "Running",
  },
  {
    name: "Hotel Agent",
    status: "Pending",
  },
  {
    name: "Weather Agent",
    status: "Pending",
  },
  {
    name: "Budget Agent",
    status: "Pending",
  },
];

const color = (status) => {
  if (status === "Completed") return "text-green-400";
  if (status === "Running") return "text-yellow-400";
  return "text-gray-500";
};

function AgentStatus() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 mt-8">

      <h2 className="text-white text-xl font-bold">
        AI Agents
      </h2>

      <div className="mt-6 space-y-4">

        {agents.map((agent) => (

          <div
            key={agent.name}
            className="flex justify-between border-b border-slate-700 pb-3"
          >
            <span className="text-white">
              {agent.name}
            </span>

            <span className={color(agent.status)}>
              {agent.status}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AgentStatus;