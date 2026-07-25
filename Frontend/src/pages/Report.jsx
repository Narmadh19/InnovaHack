import React from 'react';
import { useTravel } from '../context/TravelContext';
import ReportCard from '../components/ReportCard';
import { FileCheck2, Download, Share2, Lock, Landmark, Plane, Hotel, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

const Report = () => {
  const { report, selectedFlight, selectedHotel, sessionId } = useTravel();

  if (!sessionId) {
    return (
      <div className="glass-card border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-4 py-20">
        <Lock className="w-12 h-12 text-slate-600 opacity-60" />
        <h3 className="text-lg font-bold text-slate-200">Summary Report Locked</h3>
        <p className="text-xs text-slate-400 max-w-sm">
          Please initialize the agent swarm on the homepage first to view the final travel report.
        </p>
        <Link to="/" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs uppercase tracking-wide">
          Unlock Swarm
        </Link>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    const element = document.getElementById('report-download-area');
    if (!element) return;

    const toastId = toast.loading('Generating travel packet PDF...');
    try {
      // Generate canvas using high resolution scale
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#05070f', // Match app background color
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`TravelGenie_${report.summary.destination.replace(/[\s,]+/g, '_')}_Itinerary.pdf`);
      toast.success('Travel PDF downloaded successfully!', { id: toastId });
    } catch (err) {
      toast.error('Failed to generate PDF.', { id: toastId });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'TravelGenie AI Travel Packet',
        text: `Check out my autonomous travel plan to ${report?.summary.destination}!`,
        url: window.location.href,
      })
      .then(() => toast.success('Shared successfully!'))
      .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col gap-6 py-4">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-100 flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-cyan-400" />
            Consolidated Swarm Report
          </h2>
          <p className="text-xs text-slate-400">Final dossier compiling all flights, lodgings, weather charts, and budget statements</p>
        </div>

        {/* Action Panel */}
        <div className="flex items-center gap-3 self-start">
          <button
            onClick={handleShare}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition-all flex items-center gap-2"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>Share Plan</span>
          </button>
          
          <button
            onClick={handleDownloadPDF}
            className="glow-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center gap-2 border border-cyan-400/20 shadow-md shadow-cyan-500/25"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Target area to capture in PDF */}
      <div id="report-download-area" className="p-6 rounded-3xl bg-[#05070f] flex flex-col gap-6">
        {/* Dossier Header (For PDF context) */}
        <div className="border-b border-white/5 pb-4 mb-2 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black text-slate-200 uppercase tracking-widest">TravelGenie AI Dossier</h1>
            <span className="text-[9px] text-slate-500 font-mono">AUTONOMOUS MULTI-AGENT SYNTHESIS • SESSION: {sessionId}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-cyan-400 font-bold tracking-wider uppercase block">Status</span>
            <span className="text-xs font-bold text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded">Consensus Achieved</span>
          </div>
        </div>

        <ReportCard 
          report={report} 
          selectedFlight={selectedFlight} 
          selectedHotel={selectedHotel} 
        />

        {/* Selected flight item summary in PDF */}
        <div className="glass-card border border-white/10 rounded-2xl p-5">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-3">Flight Confirmation</span>
          {selectedFlight ? (
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-200 block">{selectedFlight.airline} ({selectedFlight.flightNo})</span>
                <span className="text-slate-400 font-mono mt-0.5 block">{selectedFlight.depCode} → {selectedFlight.arrCode} ({selectedFlight.depTime} - {selectedFlight.arrTime})</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-200 font-mono block">₹{selectedFlight.price}</span>
                <span className="text-[9px] text-slate-500 block">Stops: {selectedFlight.stops}</span>
              </div>
            </div>
          ) : (
            <span className="text-xs text-slate-500">No flight selected.</span>
          )}
        </div>

        {/* Selected Hotel summary in PDF */}
        <div className="glass-card border border-white/10 rounded-2xl p-5">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-3">Lodging Confirmation</span>
          {selectedHotel ? (
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-200 block">{selectedHotel.name}</span>
                <span className="text-slate-400 mt-0.5 block">{selectedHotel.distance} • Rating: {selectedHotel.rating} / 5.0</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-200 font-mono block">₹{selectedHotel.price} / night</span>
                <span className="text-[9px] text-slate-500 block">Free Wi-Fi Included</span>
              </div>
            </div>
          ) : (
            <span className="text-xs text-slate-500">No hotel selected.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
