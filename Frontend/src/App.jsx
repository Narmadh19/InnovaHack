import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TravelProvider } from './context/TravelContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import Weather from './pages/Weather';
import Budget from './pages/Budget';
import Itinerary from './pages/Itinerary';
import Report from './pages/Report';
import { Compass, Activity, FileCheck2 } from 'lucide-react';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#04060f] text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <Navbar />
      
      {/* Main Container */}
      <div className="flex-1 flex pt-[73px] pb-[60px] md:pb-0">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 md:pl-64 p-4 sm:p-6 overflow-x-hidden min-h-[calc(100vh-73px)]">
          <div className="max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/flights" element={<Flights />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/itinerary" element={<Itinerary />} />
              <Route path="/report" element={<Report />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Mobile Navigation bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#070a16]/95 backdrop-blur-md border-t border-white/5 flex items-center justify-around py-3 px-2">
        <Link to="/" className="text-slate-400 hover:text-cyan-400 flex flex-col items-center gap-1 transition-all">
          <Compass className="w-5 h-5 text-slate-400" />
          <span className="text-[9px] font-bold uppercase tracking-wider">Home</span>
        </Link>
        <Link to="/dashboard" className="text-slate-400 hover:text-cyan-400 flex flex-col items-center gap-1 transition-all">
          <Activity className="w-5 h-5 text-slate-400" />
          <span className="text-[9px] font-bold uppercase tracking-wider">Swarm</span>
        </Link>
        <Link to="/report" className="text-slate-400 hover:text-cyan-400 flex flex-col items-center gap-1 transition-all">
          <FileCheck2 className="w-5 h-5 text-slate-400" />
          <span className="text-[9px] font-bold uppercase tracking-wider">Dossier</span>
        </Link>
      </div>
    </div>
  );
};

function App() {
  return (
    <TravelProvider>
      <Router>
        <AppLayout />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0a0f1d',
              color: '#f8fafc',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '13px'
            },
            success: {
              iconTheme: {
                primary: '#06b6d4',
                secondary: '#0a0f1d',
              },
            },
            error: {
              iconTheme: {
                primary: '#f43f5e',
                secondary: '#0a0f1d',
              },
            },
          }}
        />
      </Router>
    </TravelProvider>
  );
}

export default App;
