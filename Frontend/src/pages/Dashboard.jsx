import Navbar from "../components/Navbar";
import WorkflowProgress from "../components/WorkflowProgress";
import ActionLog from "../components/ActionLog";
import ResultsGrid from "../components/ResultsGrid";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl text-white font-bold">
          Travel Workflow Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Workflow ID : trip001
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <WorkflowProgress />
          <ActionLog />
        </div>

        <ResultsGrid />

      </div>
    </div>
  );
}

export default Dashboard;