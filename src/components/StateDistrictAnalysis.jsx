

// import React, { useEffect, useState } from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer
// } from 'recharts';
// import axios from 'axios';

// const API_BASE = 'http://localhost:9090/api';

// const StateDistrictAnalysis = () => {
//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [stateData, setStateData] = useState({});
//   const [districtData, setDistrictData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios
//       .get(`${API_BASE}/states`)
//       .then(res => {
//         // Handle both [{state: "Chhattisgarh"}] and ["Chhattisgarh"] formats
//         const stateList = Array.isArray(res.data) 
//           ? res.data.map(item => item.state || item).filter(Boolean)
//           : [];
//         setStates(stateList);
//       })
//       .catch(err => {
//         console.error('Failed to load states:', err);
//         setError('Failed to load states');
//       });
//   }, []);

//   const loadDistricts = async (state) => {
//     if (!state || state.trim() === '') {
//       setDistricts([]);
//       setStateData({});
//       setSelectedState('');
//       setError('');
//       return;
//     }

//     setLoading(true);
//     setError('');
    
//     try {
//       const districtsRes = await axios.get(`${API_BASE}/districts/${encodeURIComponent(state.trim())}`);
      
//       // Safely handle districts response - convert to strings array
//       let districtList = [];
//       if (Array.isArray(districtsRes.data)) {
//         districtList = districtsRes.data.map(item => item.district || item).filter(Boolean);
//       }
      
//       setDistricts(districtList);
//       setSelectedState(state);
//       setSelectedDistrict(''); // Reset district selection

//       if (districtList.length > 0) {
//         // Only load state analysis if districts exist
//         const stateRes = await axios.get(`${API_BASE}/analysis/state/${encodeURIComponent(state.trim())}`);
//         setStateData(stateRes.data || {});
//       } else {
//         setStateData({ state: state.trim(), totalEnrol: 0, totalDemo: 0, districts: [] });
//       }
//     } catch (err) {
//       console.error('State load error:', err.response?.data || err.message);
//       setError(`No districts found for ${state}`);
//       setDistricts([]);
//       setStateData({ state: state.trim(), totalEnrol: 0, totalDemo: 0, districts: [] });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadDistrict = async (district) => {
//     if (!district || district.trim() === '') {
//       setDistrictData({});
//       setSelectedDistrict('');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const res = await axios.get(`${API_BASE}/analysis/district/${encodeURIComponent(district.trim())}`);
//       setDistrictData(res.data || {});
//       setSelectedDistrict(district);
//     } catch (err) {
//       console.error('District load error:', err.response?.data || err.message);
//       setError(`No data for ${district}`);
//       setDistrictData({});
//     } finally {
//       setLoading(false);
//     }
//   };

//   const HEAT_COLORS = {
//     "🔴 High": "#ef4444",
//     "🟡 Medium": "#f59e0b",
//     "🟢 Low": "#10b981"
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 to-blue-50">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-5xl font-black mb-16 text-center bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
//           State & District Analysis
//         </h1>

//         {/* Dropdowns */}
//         <div className="flex flex-col lg:flex-row gap-8 mb-12 p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl">
//           <div className="flex-1">
//             <label className="block text-xl font-semibold mb-4 text-gray-800">Select State</label>
//             <select
//               className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-400 focus:outline-none focus:ring-4 ring-blue-100 transition-all"
//               value={selectedState}
//               onChange={e => loadDistricts(e.target.value)}
//             >
//               <option value="">Choose State...</option>
//               {states.length === 0 ? (
//                 <option disabled>No states available</option>
//               ) : (
//                 states.map((state, i) => (
//                   <option key={`${state}-${i}`} value={state}>
//                     {state}
//                   </option>
//                 ))
//               )}
//             </select>
//           </div>

//           <div className="flex-1">
//             <label className="block text-xl font-semibold mb-4 text-gray-800">Select District</label>
//             <select
//               className={`w-full p-4 border-2 rounded-2xl text-lg transition-all ${
//                 districts.length === 0 
//                   ? 'border-gray-300 bg-gray-50 cursor-not-allowed text-gray-500' 
//                   : 'border-gray-200 focus:border-purple-400 focus:outline-none focus:ring-4 ring-purple-100'
//               }`}
//               value={selectedDistrict}
//               onChange={e => loadDistrict(e.target.value)}
//               disabled={districts.length === 0}
//             >
//               <option value="">
//                 {districts.length === 0 
//                   ? selectedState ? `No districts for ${selectedState}` : 'Choose State first...' 
//                   : 'Choose District...'
//                 }
//               </option>
//               {districts.length > 0 && districts.map((dist, i) => (
//                 <option key={`${dist}-${i}`} value={dist}>
//                   {dist}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-8 p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-xl">
//             ⚠️ {error}
//           </div>
//         )}

//         {loading && (
//           <div className="text-center py-12">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="mt-4 text-lg text-gray-600">Loading data...</p>
//           </div>
//         )}

//         {/* State Overview */}
//         {stateData.state && !loading && (
//           <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl mb-12">
//             <h2 className="text-4xl font-bold mb-8 text-gray-800">{stateData.state} Overview</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//               <div className="text-center p-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white shadow-xl hover:scale-105 transition-transform">
//                 <div className="text-3xl font-black">{(stateData.totalEnrol || 0).toLocaleString()}</div>
//                 <div className="text-lg opacity-90">Enrolments</div>
//               </div>
//               <div className="text-center p-8 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl text-white shadow-xl hover:scale-105 transition-transform">
//                 <div className="text-3xl font-black">{(stateData.totalDemo || 0).toLocaleString()}</div>
//                 <div className="text-lg opacity-90">Updates</div>
//               </div>
//               <div className="text-center p-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white shadow-xl hover:scale-105 transition-transform">
//                 <div className="text-3xl font-black">
//                   {(((stateData.totalEnrol || 0) + (stateData.totalDemo || 0)) / 1000000).toFixed(1)}M
//                 </div>
//                 <div className="text-lg opacity-90">Total Load</div>
//               </div>
//             </div>

//             <h3 className="text-2xl font-bold mb-6 text-gray-800">Top Districts ({stateData.districts?.length || 0})</h3>
//             <div className="overflow-x-auto rounded-2xl shadow-md">
//               <table className="w-full bg-white">
//                 <thead>
//                   <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
//                     <th className="p-4 text-left font-bold text-lg text-gray-700">District</th>
//                     <th className="p-4 text-right font-bold text-lg text-gray-700">Enrolments</th>
//                     <th className="p-4 text-right font-bold text-lg text-gray-700">Updates</th>
//                     <th className="p-4 text-right font-bold text-lg text-gray-700">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {stateData.districts && stateData.districts.length > 0 ? (
//                     stateData.districts.map((d, i) => (
//                       <tr key={i} className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
//                         <td className="p-4 font-semibold text-gray-900">{d.district}</td>
//                         <td className="p-4 text-right font-mono text-blue-600 font-bold">{(d.enrol || 0).toLocaleString()}</td>
//                         <td className="p-4 text-right font-mono text-green-600 font-bold">{(d.updates || 0).toLocaleString()}</td>
//                         <td className="p-4 text-right font-mono text-purple-600 font-bold">
//                           {((d.enrol || 0) + (d.updates || 0)).toLocaleString()}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="p-8 text-center text-gray-500 py-12">
//                         No district data available for this state
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* District Detail */}
//         {districtData.district && !loading && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl">
//               <div className="flex items-center mb-8">
//                 <h2 className="text-4xl font-black text-gray-800 mr-4">{districtData.district}</h2>
//                 <span 
//                   className="text-xl px-6 py-3 font-bold shadow-lg rounded-full text-white"
//                   style={{ backgroundColor: HEAT_COLORS[districtData.heatLevel] || '#6b7280' }}
//                 >
//                   {districtData.heatLevel || 'N/A'} Load {(districtData.loadScore || 0).toFixed(1)}M
//                 </span>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
//                 <div className="p-8 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors">
//                   <div className="text-4xl font-black text-blue-600">{(districtData.enrolments || 0).toLocaleString()}</div>
//                   <div className="text-xl text-blue-700 mt-2">Enrolments</div>
//                 </div>
//                 <div className="p-8 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors">
//                   <div className="text-4xl font-black text-green-600">{(districtData.updates || 0).toLocaleString()}</div>
//                   <div className="text-xl text-green-700 mt-2">Updates</div>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl">
//               <ResponsiveContainer width="100%" height={400}>
//                 <BarChart 
//                   data={[
//                     { type: 'Enrolments', value: districtData.enrolments || 0 },
//                     { type: 'Updates', value: districtData.updates || 0 }
//                   ]}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
//                   <XAxis dataKey="type" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" fill="#3b82f6" radius={[10, 10, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StateDistrictAnalysis;

 

import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';

const API_BASE = 'http://localhost:9090/api';

const StateDistrictAnalysis = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [stateData, setStateData] = useState({});
  const [districtData, setDistrictData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${API_BASE}/states`)
      .then(res => {
        const stateList = Array.isArray(res.data) 
          ? res.data.map(item => item.state || item).filter(Boolean)
          : [];
        setStates(stateList);
      })
      .catch(err => {
        console.error('Failed to load states:', err);
        setError('Failed to load states');
      });
  }, []);

  const loadDistricts = async (state) => {
    if (!state || state.trim() === '') {
      setDistricts([]);
      setStateData({});
      setSelectedState('');
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const districtsRes = await axios.get(`${API_BASE}/districts/${encodeURIComponent(state.trim())}`);
      let districtList = [];
      if (Array.isArray(districtsRes.data)) {
        districtList = districtsRes.data.map(item => item.district || item).filter(Boolean);
      }
      setDistricts(districtList);
      setSelectedState(state);
      setSelectedDistrict('');

      if (districtList.length > 0) {
        const stateRes = await axios.get(`${API_BASE}/analysis/state/${encodeURIComponent(state.trim())}`);
        setStateData(stateRes.data || {});
      } else {
        setStateData({ state: state.trim(), totalEnrol: 0, totalDemo: 0, districts: [] });
      }
    } catch (err) {
      console.error('State load error:', err.response?.data || err.message);
      // setError(`No districts found for ${state}`);
      setDistricts([]);
      setStateData({ state: state.trim(), totalEnrol: 0, totalDemo: 0, districts: [] });
    } finally {
      setLoading(false);
    }
  };

  const loadDistrict = async (district) => {
    if (!district || district.trim() === '') {
      setDistrictData({});
      setSelectedDistrict('');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.get(`${API_BASE}/analysis/district/${encodeURIComponent(district.trim())}`);
      setDistrictData(res.data || {});
      setSelectedDistrict(district);
    } catch (err) {
      console.error('District load error:', err.response?.data || err.message);
      setError(`No data for ${district}`);
      setDistrictData({});
    } finally {
      setLoading(false);
    }
  };

  const HEAT_COLORS = {
    "🔴 High": "#ef4444",
    "🟡 Medium": "#f59e0b",
    "🟢 Low": "#10b981"
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black mb-16 text-center bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          State & District Analysis
        </h1>

        {/* Dropdowns */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12 p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl">
          <div className="flex-1">
            <label className="block text-xl font-semibold mb-4 text-gray-800">Select State</label>
            <select
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-400 focus:outline-none focus:ring-4 ring-blue-100 transition-all"
              value={selectedState}
              onChange={e => loadDistricts(e.target.value)}
            >
              <option value="">Choose State...</option>
              {states.length === 0 ? (
                <option disabled>No states available</option>
              ) : (
                states.map((state, i) => (
                  <option key={`${state}-${i}`} value={state}>
                    {state}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-xl font-semibold mb-4 text-gray-800">Select District</label>
            <select
              className={`w-full p-4 border-2 rounded-2xl text-lg transition-all ${
                districts.length === 0 
                  ? 'border-gray-300 bg-gray-50 cursor-not-allowed text-gray-500' 
                  : 'border-gray-200 focus:border-purple-400 focus:outline-none focus:ring-4 ring-purple-100'
              }`}
              value={selectedDistrict}
              onChange={e => loadDistrict(e.target.value)}
              disabled={districts.length === 0}
            >
              <option value="">
                {districts.length === 0 
                  ? selectedState ? `No districts for ${selectedState}` : 'Choose State first...' 
                  : 'Choose District...'
                }
              </option>
              {districts.length > 0 && districts.map((dist, i) => (
                <option key={`${dist}-${i}`} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-xl">
            ⚠️ {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading data...</p>
          </div>
        )}

        {/* State Overview */}
        {stateData.state && !loading && (
          <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl mb-12">
            <h2 className="text-4xl font-bold mb-8 text-gray-800">{stateData.state} Overview</h2>
            {/* Removed small table/stats here */}
          </div>
        )}

        {/* District Detail */}
        {districtData.district && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl">
              <div className="flex items-center mb-8">
                <h2 className="text-4xl font-black text-gray-800 mr-4">{districtData.district}</h2>
                <span 
                  className="text-xl px-6 py-3 font-bold shadow-lg rounded-full text-white"
                  style={{ backgroundColor: HEAT_COLORS[districtData.heatLevel] || '#6b7280' }}
                >
                  {districtData.heatLevel || 'N/A'} Load {(districtData.loadScore || 0).toFixed(1)}M
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                <div className="p-8 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors">
                  <div className="text-4xl font-black text-blue-600">{(districtData.enrolments || 0).toLocaleString()}</div>
                  <div className="text-xl text-blue-700 mt-2">Enrolments</div>
                </div>
                <div className="p-8 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors">
                  <div className="text-4xl font-black text-green-600">{(districtData.updates || 0).toLocaleString()}</div>
                  <div className="text-xl text-green-700 mt-2">Updates</div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={[
                    { type: 'Enrolments', value: districtData.enrolments || 0 },
                    { type: 'Updates', value: districtData.updates || 0 }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StateDistrictAnalysis;
