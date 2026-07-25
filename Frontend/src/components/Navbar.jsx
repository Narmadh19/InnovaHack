import { Plane } from "lucide-react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6">

      <div className="flex items-center gap-2">

        <Plane className="text-cyan-400" size={30}/>

        <h1 className="text-white text-2xl font-bold">
          TravelGenie AI
        </h1>

      </div>

      <Link to="/dashboard">
    <button className="bg-cyan-500 px-5 py-2 rounded-lg text-white hover:bg-cyan-600">
        Dashboard
    </button>
</Link>

    </nav>
  );
}

export default Navbar;