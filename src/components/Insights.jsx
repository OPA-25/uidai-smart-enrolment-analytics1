// import React, { useEffect, useState } from "react";
// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid
// } from "recharts";

// const Insights = () => {
//   const [insights, setInsights] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:9090/api/insights")
//       .then(res => {
//         if (!res.ok) throw new Error("Failed to fetch insights");
//         return res.json();
//       })
//       .then(data => {
//         setInsights(data.insights || []);
//         setChartData(data.chartData || []);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError("Unable to load insights");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p style={{ padding: "20px" }}>Loading insights…</p>;
//   }

//   if (error) {
//     return <p style={{ padding: "20px", color: "red" }}>{error}</p>;
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>📊 UIDAI Insights & Recommendations</h2>

//       {insights.length === 0 ? (
//         <p>No insights available for selected data.</p>
//       ) : (
//         <ul>
//           {insights.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       )}

//       <h3>📈 Enrolment vs Update Delays (District-wise)</h3>

//       {chartData.length === 0 ? (
//         <p>No chart data available.</p>
//       ) : (
//         <ScatterChart width={700} height={400}>
//           <CartesianGrid />
//           <XAxis dataKey="enrolment" name="Enrolment" />
//           <YAxis dataKey="updates" name="Updates" />
//           <Tooltip />
//           <Scatter data={chartData} />
//         </ScatterChart>
//       )}
//     </div>
//   );
// };

// export default Insights;


import React, { useEffect, useState } from "react";
import ExportButtons from "./ExportButtons";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

/* ---------- Custom Tooltip (UI only) ---------- */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-xl p-5 text-sm min-w-[220px]">
        <div className="flex items-center mb-3 pb-3 border-b border-slate-100">
          <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mr-3"></div>
          <p className="font-bold text-slate-900 text-base">
            📍 {data.district}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-slate-700">
            👥 <span className="font-semibold text-slate-900">Enrolment:</span> {data.enrolment.toLocaleString()}
          </p>
          <p className="text-slate-700">
            ⏳ <span className="font-semibold text-slate-900">Update Delays:</span> {data.updates} days
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const Insights = () => {
  const [insights, setInsights] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------- Data Fetch (UNCHANGED LOGIC) ---------- */
  useEffect(() => {
    fetch("http://localhost:9090/api/insights")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch insights");
        return res.json();
      })
      .then(data => {
        setInsights(data.insights || []);
        setChartData(data.chartData || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load insights");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/50 max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-xl font-semibold text-slate-800">Loading insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-red-100 max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl text-white">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.034 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-slate-900 mb-2">{error}</p>
          <p className="text-slate-600">Please check your connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12 mb-12">
          <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight">
            📊 UIDAI Insights & Recommendations
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl">District-wise analysis of enrolment trends and update delays</p>
        </div>


        <ExportButtons insights={insights} />
        <br>
        </br>
        <br>
        </br> 

        {/* ---------- Insights Cards ---------- */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            🎯 Actionable Insights
          </h3>

          {insights.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-16 text-center border border-dashed border-slate-300">
              <svg className="w-20 h-20 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h4 className="text-2xl font-bold text-slate-500 mb-2">No insights available</h4>
              <p className="text-slate-500 max-w-md mx-auto">Insights will appear here when data is available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-3xl border border-white/50 hover:border-indigo-200 p-6 transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Only one bolded point */}
                  <h4 className="text-lg font-bold text-slate-900 leading-tight break-words">
                    {typeof item === 'string' ? item : item.title || 'Insight'}
                  </h4>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---------- Chart Section (unchanged) ---------- */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8 lg:p-12">
          <div className="flex items-center mb-8 pb-8 border-b border-slate-200">
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mr-4"></div>
            <h3 className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              📈 Enrolment vs Update Delays (District-wise)
            </h3>
          </div>

          {chartData.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-24 h-24 text-slate-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <h4 className="text-2xl font-bold text-slate-500 mb-2">No chart data available</h4>
              <p className="text-slate-500 max-w-lg mx-auto">Scatter plot will display district enrolment vs update delays</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border-4 border-slate-100/50 shadow-2xl">
              <div className="p-8 bg-gradient-to-b from-slate-50 to-white">
                <ScatterChart width={900} height={500} className="w-full h-[500px]">
                  <CartesianGrid stroke="#f8fafc" strokeDasharray="4 4" strokeWidth={1.5} />
                  <XAxis 
                    dataKey="enrolment" 
                    name="Enrolment" 
                    stroke="#64748b" 
                    strokeWidth={2}
                    tickLine={false}
                    axisLine={false}
                    tick={{fontSize: 13, fill: '#64748b'}}
                  />
                  <YAxis 
                    dataKey="updates" 
                    name="Update Delays (days)" 
                    stroke="#64748b" 
                    strokeWidth={2}
                    tickLine={false}
                    axisLine={false}
                    tick={{fontSize: 13, fill: '#64748b'}}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter 
                    name="Districts" 
                    data={chartData} 
                    fill="#4f46e5"
                    shape="circle"
                  />
                </ScatterChart>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Insights;
