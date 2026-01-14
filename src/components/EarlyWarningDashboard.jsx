// // import React, { useEffect, useState } from "react";

// // const EarlyWarningDashboard = () => {
// //   const [alerts, setAlerts] = useState([]);
// //   const [error, setError] = useState("");
// //   const [formData, setFormData] = useState({
// //     centerId: "",
// //     district: "",
// //     riskLevel: "",
// //     issue: "",
// //     recommendation: "",
// //   });

// //   // Fetch alerts from backend
// //   const fetchAlerts = () => {
// //     fetch("http://localhost:9090/api/alerts/early-warning")
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Backend error");
// //         return res.json();
// //       })
// //       .then((data) => {
// //         setAlerts(Array.isArray(data) ? data : []);
// //       })
// //       .catch(() => {
// //         setError("Unable to load alerts");
// //         setAlerts([]);
// //       });
// //   };

// //   useEffect(() => {
// //     fetchAlerts();
// //   }, []);

// //   // Handle form input changes
// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   // Add new alert
// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     setError("");

// //     fetch("http://localhost:9090/api/alerts/early-warning", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(formData),
// //     })
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Failed to save alert");
// //         return res.json();
// //       })
// //       .then((data) => {
// //         setAlerts((prev) => [...prev, data]); // Add to table immediately
// //         setFormData({
// //           centerId: "",
// //           district: "",
// //           riskLevel: "",
// //           issue: "",
// //           recommendation: "",
// //         });
// //       })
// //       .catch(() => setError("Failed to add alert"));
// //   };

// //   // Delete alert
// //   const handleDelete = (centerId) => {
// //     fetch(`http://localhost:9090/api/alerts/early-warning/${centerId}`, {
// //       method: "DELETE",
// //     })
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Failed to delete alert");
// //         // Remove alert from state
// //         setAlerts((prev) => prev.filter((a) => a.centerId !== centerId));
// //       })
// //       .catch(() => setError("Failed to delete alert"));
// //   };

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>UIDAI Early Warning & Action System</h2>

// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       {/* ALERT TABLE */}
// //       <table border="1" width="100%" cellPadding="10">
// //         <thead>
// //           <tr>
// //             <th>Center ID</th>
// //             <th>District</th>
// //             <th>Risk</th>
// //             <th>Issue</th>
// //             <th>Recommended Action</th>
// //             <th>Action</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {alerts.length === 0 ? (
// //             <tr>
// //               <td colSpan="6">No high-risk centres detected</td>
// //             </tr>
// //           ) : (
// //             alerts.map((a, i) => (
// //               <tr key={i}>
// //                 <td>{a.centerId}</td>
// //                 <td>{a.district}</td>
// //                 <td style={{ color: "red" }}>{a.riskLevel}</td>
// //                 <td>{a.issue}</td>
// //                 <td>{a.recommendation}</td>
// //                 <td>
// //                   <button
// //                     style={{ color: "white", backgroundColor: "red", border: "none", padding: "5px 10px", cursor: "pointer" }}
// //                     onClick={() => handleDelete(a.centerId)}
// //                   >
// //                     Delete
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))
// //           )}
// //         </tbody>
// //       </table>

// //       {/* ADD ALERT FORM */}
// //       <div style={{ marginTop: "30px", padding: "15px", border: "1px solid #ccc" }}>
// //         <h3>Add New Alert</h3>
// //         <form onSubmit={handleSubmit}>
// //           <input
// //             type="text"
// //             name="centerId"
// //             placeholder="Center ID"
// //             value={formData.centerId}
// //             onChange={handleChange}
// //             required
// //             style={{ marginRight: "10px" }}
// //           />
// //           <input
// //             type="text"
// //             name="district"
// //             placeholder="District"
// //             value={formData.district}
// //             onChange={handleChange}
// //             required
// //             style={{ marginRight: "10px" }}
// //           />
// //           <input
// //             type="text"
// //             name="riskLevel"
// //             placeholder="Risk Level"
// //             value={formData.riskLevel}
// //             onChange={handleChange}
// //             required
// //             style={{ marginRight: "10px" }}
// //           />
// //           <input
// //             type="text"
// //             name="issue"
// //             placeholder="Issue"
// //             value={formData.issue}
// //             onChange={handleChange}
// //             required
// //             style={{ marginRight: "10px" }}
// //           />
// //           <input
// //             type="text"
// //             name="recommendation"
// //             placeholder="Recommendation"
// //             value={formData.recommendation}
// //             onChange={handleChange}
// //             required
// //             style={{ marginRight: "10px" }}
// //           />
// //           <button type="submit">Add Alert</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EarlyWarningDashboard;

// import React, { useEffect, useState } from "react";

// const EarlyWarningDashboard = () => {
//   const [alerts, setAlerts] = useState([]);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({
//     centerId: "",
//     district: "",
//     riskLevel: "",
//     issue: "",
//     recommendation: "",
//   });

//   // Fetch alerts from backend
//   const fetchAlerts = () => {
//     fetch("http://localhost:9090/api/alerts/early-warning")
//       .then((res) => {
//         if (!res.ok) throw new Error("Backend error");
//         return res.json();
//       })
//       .then((data) => {
//         setAlerts(Array.isArray(data) ? data : []);
//       })
//       .catch(() => {
//         setError("Unable to load alerts");
//         setAlerts([]);
//       });
//   };

//   useEffect(() => {
//     fetchAlerts();
//   }, []);

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Add new alert
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     fetch("http://localhost:9090/api/alerts/early-warning", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to save alert");
//         return res.json();
//       })
//       .then((data) => {
//         setAlerts((prev) => [...prev, data]);
//         setFormData({
//           centerId: "",
//           district: "",
//           riskLevel: "",
//           issue: "",
//           recommendation: "",
//         });
//       })
//       .catch(() => setError("Failed to add alert"));
//   };

//   // Delete alert
//   const handleDelete = (centerId) => {
//     fetch(`http://localhost:9090/api/alerts/early-warning/${centerId}`, {
//       method: "DELETE",
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to delete alert");
//         setAlerts((prev) => prev.filter((a) => a.centerId !== centerId));
//       })
//       .catch(() => setError("Failed to delete alert"));
//   };

//   // Get risk color
//   const getRiskColor = (riskLevel) => {
//     switch (riskLevel?.toLowerCase()) {
//       case 'high': return 'bg-red-500 text-white';
//       case 'medium': return 'bg-yellow-500 text-white';
//       case 'low': return 'bg-green-500 text-white';
//       default: return 'bg-gray-500 text-white';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 py-8 px-4 sm:px-6 lg:px-8">
//       {/* Header */}
//       <div className="max-w-7xl mx-auto mb-8">
//         <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 mb-6">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//               </svg>
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent">
//                 UIDAI Early Warning System
//               </h1>
//               <p className="text-slate-600 mt-1">Real-time monitoring of high-risk Aadhaar centers</p>
//             </div>
//           </div>
          
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="bg-gradient-to-br from-orange-400/20 to-red-400/20 backdrop-blur-xl p-6 rounded-2xl border border-orange-200/50">
//               <div className="text-2xl font-bold text-orange-600">{alerts.length}</div>
//               <div className="text-sm text-slate-600 font-medium">Active Alerts</div>
//             </div>
//             <div className="bg-gradient-to-br from-emerald-400/20 to-teal-400/20 backdrop-blur-xl p-6 rounded-2xl border border-emerald-200/50">
//               <div className="text-2xl font-bold text-emerald-600">0</div>
//               <div className="text-sm text-slate-600 font-medium">Resolved</div>
//             </div>
//             <div className="bg-gradient-to-br from-slate-400/20 to-gray-400/20 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/50">
//               <div className="text-2xl font-bold text-slate-600">{alerts.length}</div>
//               <div className="text-sm text-slate-600 font-medium">Total Actions</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
//         {/* Alerts Table */}
//         <div className="lg:col-span-3">
//           {/* Error Alert */}
//           {error && (
//             <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-xl">
//               <div className="flex items-center">
//                 <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                 </svg>
//                 <span className="text-red-800 font-medium">{error}</span>
//               </div>
//             </div>
//           )}

//           {/* Table Card */}
//           <div className="bg-white/80 backdrop-blur-xl shadow-2xl border border-white/50 rounded-3xl overflow-hidden">
//             <div className="bg-gradient-to-r from-slate-900/10 to-orange-500/10 border-b border-slate-200/50 p-6">
//               <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
//                 <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                 </svg>
//                 High-Risk Centers
//               </h2>
//             </div>
            
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gradient-to-r from-slate-50 to-orange-50/50">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Center ID</th>
//                     <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">District</th>
//                     <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Risk Level</th>
//                     <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Issue</th>
//                     <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Action Required</th>
//                     <th className="px-6 py-4 text-center text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100">
//                   {alerts.length === 0 ? (
//                     <tr>
//                       <td colSpan="6" className="px-6 py-12 text-center">
//                         <div className="flex flex-col items-center space-y-4 py-12">
//                           <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                           </svg>
//                           <div className="text-slate-500">
//                             <p className="text-lg font-medium">No high-risk centers detected</p>
//                             <p className="text-sm mt-1">All centers operating normally</p>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   ) : (
//                     alerts.map((alert, index) => (
//                       <tr key={alert.centerId || index} className="hover:bg-orange-50/50 transition-colors">
//                         <td className="px-6 py-4 whitespace-nowrap font-mono text-sm font-semibold text-slate-900">
//                           {alert.centerId}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-slate-900 font-medium">
//                           {alert.district}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${getRiskColor(alert.riskLevel)} shadow-lg`}>
//                             {alert.riskLevel || 'Unknown'}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-slate-900 max-w-md">
//                           <div className="line-clamp-2">{alert.issue}</div>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-slate-700 max-w-lg">
//                           <div className="line-clamp-2 font-medium">{alert.recommendation}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                           <button
//                             onClick={() => handleDelete(alert.centerId)}
//                             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-200 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//                           >
//                             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Add Alert Form */}
//         <div>
//           <div className="bg-white/80 backdrop-blur-xl shadow-2xl border border-white/50 rounded-3xl p-8 sticky top-8">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-slate-900">Add New Alert</h3>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Center ID</label>
//                 <input
//                   type="text"
//                   name="centerId"
//                   placeholder="e.g., MH-001"
//                   value={formData.centerId}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">District</label>
//                 <input
//                   type="text"
//                   name="district"
//                   placeholder="e.g., Mumbai Suburban"
//                   value={formData.district}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Risk Level</label>
//                 <select
//                   name="riskLevel"
//                   value={formData.riskLevel}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white/50 backdrop-blur-sm appearance-none"
//                 >
//                   <option value="">Select Risk Level</option>
//                   <option value="High">High 🚨</option>
//                   <option value="Medium">Medium ⚠️</option>
//                   <option value="Low">Low ℹ️</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Issue Description</label>
//                 <input
//                   type="text"
//                   name="issue"
//                   placeholder="e.g., High rejection rate"
//                   value={formData.issue}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Recommended Action</label>
//                 <input
//                   type="text"
//                   name="recommendation"
//                   placeholder="e.g., Send additional operator"
//                   value={formData.recommendation}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
//                 />
//               </div>
              
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
//               >
//                 <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                 </svg>
//                 Add Alert
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EarlyWarningDashboard;

import React, { useEffect, useState } from "react";

const EarlyWarningDashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    centerId: "",
    district: "",
    riskLevel: "",
    issue: "",
    recommendation: "",
  });

  // Fetch alerts from backend
  const fetchAlerts = () => {
    fetch("http://localhost:9090/api/alerts/early-warning")
      .then((res) => {
        if (!res.ok) throw new Error("Backend error");
        return res.json();
      })
      .then((data) => {
        setAlerts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setError("Unable to load alerts");
        setAlerts([]);
      });
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new alert
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    fetch("http://localhost:9090/api/alerts/early-warning", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save alert");
        return res.json();
      })
      .then((data) => {
        setAlerts((prev) => [...prev, data]);
        setFormData({
          centerId: "",
          district: "",
          riskLevel: "",
          issue: "",
          recommendation: "",
        });
      })
      .catch(() => setError("Failed to add alert"));
  };

  // Delete alert
  const handleDelete = (centerId) => {
    fetch(`http://localhost:9090/api/alerts/early-warning/${centerId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete alert");
        setAlerts((prev) => prev.filter((a) => a.centerId !== centerId));
      })
      .catch(() => setError("Failed to delete alert"));
  };

  // Get risk color
  const getRiskColor = (riskLevel) => {
    switch (riskLevel?.toLowerCase()) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-6 xl:px-8">
      {/* Header & Stats */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8 lg:mb-12">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl lg:rounded-[2rem] shadow-2xl border border-white/50 p-4 sm:p-6 lg:p-8 xl:p-10">
          <div className="flex flex-col sm:flex-row sm:items-start lg:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl shrink-0">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black bg-gradient-to-r from-gray-900 via-slate-800 to-orange-700 bg-clip-text text-transparent leading-tight">
                UIDAI Early Warning
              </h1>
              <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg font-medium">Real-time high-risk Aadhaar center monitoring</p>
            </div>
          </div>
          
          {/* Stats Cards - Fully Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            <div className="group bg-gradient-to-br from-orange-400/20 via-red-400/20 to-orange-500/20 backdrop-blur-xl p-4 sm:p-5 lg:p-6 rounded-2xl border border-orange-200/50 hover:border-orange-300/70 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-orange-600 group-hover:text-orange-700 mb-1">
                {alerts.length}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-slate-600 font-semibold tracking-tight">Active Alerts</div>
            </div>
            <div className="group bg-gradient-to-br from-emerald-400/20 to-teal-400/20 backdrop-blur-xl p-4 sm:p-5 lg:p-6 rounded-2xl border border-emerald-200/50 hover:border-emerald-300/70 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-emerald-600 group-hover:text-emerald-700 mb-1">
                0
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-slate-600 font-semibold tracking-tight">Resolved</div>
            </div>
            <div className="group bg-gradient-to-br from-slate-400/20 to-gray-400/20 backdrop-blur-xl p-4 sm:p-5 lg:p-6 rounded-2xl border border-slate-200/50 hover:border-slate-300/70 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-slate-700 group-hover:text-slate-800 mb-1">
                {alerts.length}
              </div>
              <div className="text-xs sm:text-sm lg:text-base text-slate-600 font-semibold tracking-tight">Total Actions</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Alerts Table */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50/90 border-l-4 border-red-400 p-3 sm:p-4 lg:p-6 mb-6 rounded-2xl shadow-lg backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-red-800 font-semibold text-sm sm:text-base">{error}</span>
              </div>
            </div>
          )}

          {/* Table Card */}
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl lg:shadow-3xl border border-white/50 rounded-3xl lg:rounded-[2rem] overflow-hidden sticky top-4 lg:top-6 z-10">
            <div className="bg-gradient-to-r from-slate-900/5 via-orange-500/5 to-red-500/5 backdrop-blur-sm border-b border-slate-200/50 p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 flex items-center gap-3">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-orange-600 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                High-Risk Centers
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-slate-100">
                <thead className="bg-gradient-to-r from-slate-50/80 to-orange-50/80 backdrop-blur-sm sticky top-0 z-20">
                  <tr>
                    <th className="px-4 sm:px-6 lg:px-8 py-4 text-left text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">Center ID</th>
                    <th className="px-4 sm:px-6 lg:px-8 py-4 text-left text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">District</th>
                    <th className="px-4 sm:px-6 lg:px-8 py-4 text-left text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">Risk Level</th>
                    <th className="px-4 sm:px-6 lg:px-8 py-4 text-left text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">Issue</th>
                    <th className="px-4 sm:px-6 lg:px-8 py-4 text-left text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">Action Required</th>
                    <th className="px-4 sm:px-6 lg:px-8 py-4 text-center text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {alerts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 sm:py-16 lg:py-20 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <div className="text-slate-500 space-y-1">
                            <p className="text-lg sm:text-xl lg:text-2xl font-bold">No High-Risk Centers</p>
                            <p className="text-sm sm:text-base lg:text-lg mt-1">All centers operating normally ✅</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    alerts.map((alert, index) => (
                      <tr key={alert.centerId || index} className="hover:bg-orange-50/70 hover:shadow-sm transition-all duration-200 group">
                        <td className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 whitespace-nowrap font-mono text-sm sm:text-base font-semibold text-slate-900 bg-slate-50/50 group-hover:bg-orange-50/50">
                          {alert.centerId}
                        </td>
                        <td className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-sm sm:text-base text-slate-900 font-semibold">
                          {alert.district}
                        </td>
                        <td className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 whitespace-nowrap">
                          <span className={`inline-flex px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wide shadow-md ${getRiskColor(alert.riskLevel)} transform group-hover:scale-105 group-hover:shadow-lg transition-all duration-200`}>
                            {alert.riskLevel || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-sm sm:text-base text-slate-900 max-w-xs sm:max-w-md lg:max-w-lg">
                          <div className="line-clamp-2 pr-4">{alert.issue}</div>
                        </td>
                        <td className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 text-sm sm:text-base text-slate-700 max-w-xs sm:max-w-md lg:max-w-lg font-medium">
                          <div className="line-clamp-2 pr-4">{alert.recommendation}</div>
                        </td>
                        <td className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 whitespace-nowrap text-center text-sm sm:text-base font-semibold">
                          <button
                            onClick={() => handleDelete(alert.centerId)}
                            className="inline-flex items-center px-3 sm:px-4 py-2 sm:py-2.5 border border-transparent text-xs sm:text-sm font-bold rounded-xl shadow-sm bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 group-hover:shadow-red-500/25"
                          >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Alert Form - Sticky on Desktop */}
        <div className="lg:col-span-1 order-1 lg:order-2">
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl lg:shadow-3xl border border-white/50 rounded-3xl lg:rounded-[2rem] p-4 sm:p-6 lg:p-8 xl:p-10 sticky top-4 lg:top-6 z-20">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-xl shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900">Add New Alert</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 lg:space-y-6">
              <div>
                <label className="block text-sm sm:text-base lg:text-lg font-semibold text-slate-700 mb-2 sm:mb-3">
                  Center ID
                </label>
                <input
                  type="text"
                  name="centerId"
                  placeholder="e.g., MH-001"
                  value={formData.centerId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 lg:py-4 border border-slate-200/70 rounded-xl lg:rounded-2xl shadow-sm focus:ring-3 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300 bg-white/60 backdrop-blur-sm text-sm sm:text-base placeholder-slate-400 hover:shadow-md hover:border-slate-300"
                />
              </div>
              
              <div>
                <label className="block text-sm sm:text-base lg:text-lg font-semibold text-slate-700 mb-2 sm:mb-3">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  placeholder="e.g., Mumbai Suburban"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 lg:py-4 border border-slate-200/70 rounded-xl lg:rounded-2xl shadow-sm focus:ring-3 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300 bg-white/60 backdrop-blur-sm text-sm sm:text-base placeholder-slate-400 hover:shadow-md hover:border-slate-300"
                />
              </div>
              
              <div>
                <label className="block text-sm sm:text-base lg:text-lg font-semibold text-slate-700 mb-2 sm:mb-3">
                  Risk Level
                </label>
                <select
                  name="riskLevel"
                  value={formData.riskLevel}
                  onChange={handleChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 lg:py-4 border border-slate-200/70 rounded-xl lg:rounded-2xl shadow-sm focus:ring-3 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300 bg-white/60 backdrop-blur-sm text-sm sm:text-base appearance-none cursor-pointer hover:shadow-md hover:border-slate-300"
                >
                  <option value="">Select Risk Level</option>
                  <option value="High">High 🚨</option>
                  <option value="Medium">Medium ⚠️</option>
                  <option value="Low">Low ℹ️</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm sm:text-base lg:text-lg font-semibold text-slate-700 mb-2 sm:mb-3">
                  Issue Description
                </label>
                <input
                  type="text"
                  name="issue"
                  placeholder="e.g., High rejection rate"
                  value={formData.issue}
                  onChange={handleChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 lg:py-4 border border-slate-200/70 rounded-xl lg:rounded-2xl shadow-sm focus:ring-3 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300 bg-white/60 backdrop-blur-sm text-sm sm:text-base placeholder-slate-400 hover:shadow-md hover:border-slate-300"
                />
              </div>
              
              <div>
                <label className="block text-sm sm:text-base lg:text-lg font-semibold text-slate-700 mb-2 sm:mb-3">
                  Recommended Action
                </label>
                <input
                  type="text"
                  name="recommendation"
                  placeholder="e.g., Send additional operator"
                  value={formData.recommendation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 lg:py-4 border border-slate-200/70 rounded-xl lg:rounded-2xl shadow-sm focus:ring-3 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300 bg-white/60 backdrop-blur-sm text-sm sm:text-base placeholder-slate-400 hover:shadow-md hover:border-slate-300"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:via-teal-700 hover:to-emerald-700 text-white font-black py-4 sm:py-4.5 lg:py-5 px-6 sm:px-8 rounded-xl lg:rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 text-sm sm:text-base lg:text-lg"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 inline mr-2 sm:mr-2.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Alert Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyWarningDashboard;
