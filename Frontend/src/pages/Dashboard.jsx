import Navbar from "../components/Navbar";
import WorkflowProgress from "../components/WorkflowProgress";
import ActionLog from "../components/ActionLog";
import ResultsGrid from "../components/ResultsGrid";
import ItineraryCard from "../components/ItineraryCard";
import { useParams } from "react-router-dom";
import AgentStatus from "../components/AgentStatus";
function Dashboard() {

const { workflowId } = useParams();
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl text-white font-bold">
          Travel Workflow Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
  Workflow ID : {workflowId}
</p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <WorkflowProgress />
          <ActionLog />
        </div>

        <ResultsGrid />
        <AgentStatus />
        <ItineraryCard />
        <div className="flex gap-4 mt-8">

  <button className="bg-cyan-500 px-6 py-3 rounded-xl text-white hover:bg-cyan-600">
    Download PDF
  </button>

  <button className="bg-slate-800 border border-slate-700 px-6 py-3 rounded-xl text-white hover:border-cyan-400">
    Share Report
  </button>
  

</div>

      </div>
    </div>
  );
}

export default Dashboard;