import Navbar from "../components/Navbar";
import { FaMicrophone } from "react-icons/fa";
import PromptCards from "../components/PromptCards";
import AgentSection from "../components/AgentSection";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Landing() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleGenerate = async () => {
    try {
      // If backend is not ready, comment these lines and use navigate("/dashboard/demo")
      const res = await api.post("/workflow", {
        message,
      });

      const workflowId = res.data.workflowId;

      navigate(`/dashboard/${workflowId}`);
    } catch (err) {
      console.log(err);

      // Temporary navigation for UI testing
      navigate("/dashboard/demo");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <div className="flex flex-col items-center mt-24">

        <h1 className="text-6xl font-extrabold text-cyan-400">
          TravelGenie AI
        </h1>

        <p className="text-gray-400 text-xl mt-5">
          Plan your entire journey using autonomous AI agents
        </p>

        <div className="mt-12 flex items-center bg-slate-800 rounded-xl border border-slate-700 p-2 w-[700px]">

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Plan a Goa trip under ₹30,000..."
            className="bg-transparent outline-none flex-1 text-white px-4"
          />

          <button className="text-cyan-400 p-3">
            <FaMicrophone />
          </button>

        </div>

        <button
          onClick={handleGenerate}
          className="mt-8 bg-cyan-500 px-8 py-3 rounded-xl text-white hover:bg-cyan-600"
        >
          Generate Plan
        </button>

        <PromptCards />

        <AgentSection />

      </div>

    </div>
  );
}

export default Landing;