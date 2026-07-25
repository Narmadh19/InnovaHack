const agents = [
  "Goal Agent",
  "Planner",
  "Flight",
  "Hotel",
  "Weather",
  "Budget",
];

function AgentSection() {
  return (
    <div className="mt-16 text-center">
      <h2 className="text-white text-2xl font-bold mb-8">
        Powered by Autonomous AI Agents
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {agents.map((agent) => (
          <div
            key={agent}
            className="px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-400 text-cyan-300"
          >
            {agent}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgentSection;