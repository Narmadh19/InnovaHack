import Navbar from "../components/Navbar";

function Dashboard() {

  const workflow = [
    { step: "Goal Understanding", status: "✅" },
    { step: "Planner Agent", status: "✅" },
    { step: "Flight Search", status: "🔄" },
    { step: "Hotel Search", status: "⏳" },
    { step: "Weather", status: "⏳" },
    { step: "Budget", status: "⏳" },
  ];

  const logs = [
    "10:30 Goal Understood",
    "10:31 Planner Created",
    "10:32 Searching Flights",
    "10:33 Searching Hotels",
  ];

  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold text-white">
          Workflow Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Workflow ID : trip001
        </p>

        <div className="grid grid-cols-2 gap-8 mt-10">

          {/* Progress */}

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">

            <h2 className="text-white text-xl font-bold">
              Workflow Progress
            </h2>

            <div className="w-full bg-slate-700 rounded-full h-4 mt-5">

              <div className="bg-cyan-400 h-4 rounded-full w-[65%]"></div>

            </div>

            <p className="text-cyan-400 mt-3">65%</p>

            <div className="mt-8 space-y-4">

              {workflow.map((item) => (

                <div
                  key={item.step}
                  className="flex justify-between text-white"
                >
                  <span>{item.step}</span>

                  <span>{item.status}</span>

                </div>

              ))}

            </div>

          </div>

          {/* Logs */}

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">

            <h2 className="text-white text-xl font-bold">

              Live Action Log

            </h2>

            <div className="space-y-4 mt-6">

              {logs.map((log) => (

                <div
                  key={log}
                  className="bg-slate-800 rounded-lg p-3 text-gray-300"
                >
                  {log}
                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;