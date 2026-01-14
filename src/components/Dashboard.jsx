import React,{useEffect,useState} from 'react';
import {LineChart,Line,PieChart,Pie,Cell,BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer} from 'recharts';
import axios from 'axios';


const API_BASE='http://localhost:9090/api';

const Dashboard=()=>{
  const[totals,setTotals]=useState({});const[trends,setTrends]=useState([]);const[states,setStates]=useState([]);const[topDistricts,setTopDistricts]=useState([]);const[loading,setLoading]=useState(true);

  useEffect(()=>{
    axios.all([axios.get(`${API_BASE}/dashboard/totals`),axios.get(`${API_BASE}/dashboard/trends`),axios.get(`${API_BASE}/dashboard/states`),axios.get(`${API_BASE}/dashboard/top-districts`)]).then(axios.spread((t,tr,st,d)=>{
      setTotals(t.data);setTrends(tr.data);setStates(st.data);setTopDistricts(d.data);setLoading(false);
    })).catch(e=>console.error(e));
  },[]);

  const COLORS=['#0088FE','#00C49F','#FFBB28','#FF8042'];

  // if(loading)return<div className="flex justify-center items-center h-screen text-2xl text-white animate-pulse"><span>🚀 Loading UIDAI Dashboard...</span></div>;
if (loading)
  return (
    <div className="flex justify-center items-center h-screen text-2xl text-black animate-pulse">
      <span>🚀 Loading UIDAI Dashboard...</span>
    </div>
  );

  return(

    

  <div className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent drop-shadow-2xl">
        UIDAI Aadhaar<span className="text-yellow-500"> Analytics</span> Dashboard
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="group bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-blue-100 hover:border-blue-200 hover:-translate-y-2">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Total Enrolments</h3>
          <p className="text-4xl lg:text-5xl font-black text-blue-600 group-hover:text-blue-700">{totals.totalEnrolments?.toLocaleString()}</p>
        </div>
        <div className="group bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-green-100 hover:border-green-200 hover:-translate-y-2">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>Demographic Updates</h3>
          <p className="text-4xl lg:text-5xl font-black text-green-600 group-hover:text-green-700">{totals.totalUpdates?.toLocaleString()}</p>
        </div>
        <div className="group bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-emerald-100 hover:border-emerald-200 hover:-translate-y-2">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>Approval Rate</h3>
          <p className="text-4xl lg:text-5xl font-black text-emerald-600 group-hover:text-emerald-700">{totals.approveRate?.toFixed(1)}%</p>
        </div>
        <div className="group bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-red-100 hover:border-red-200 hover:-translate-y-2">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>Total Rejections</h3>
          <p className="text-4xl lg:text-5xl font-black text-red-600 group-hover:text-red-700">{totals.rejected?.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
        <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-100">
          <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>📈 Monthly Trends</h3>
          <ResponsiveContainer width="100%" height={450}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="5 5" stroke="#f1f5f9"/>
              <XAxis dataKey="period" angle={-25} height={80} tick={{fontSize:13,fill:"#64748b"}}/>
              <YAxis tick={{fontSize:12,fill:"#64748b"}}/>
              <Tooltip contentStyle={{background:"#f8fafc",border:"1px solid #e2e8f0"}}/>
              <Legend/>
              <Line type="monotone" dataKey="enrolments" stroke="#3b82f6" strokeWidth={4} dot={{fill:"#3b82f6",strokeWidth:2}} activeDot={{r:8}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-100">
          <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>✅ Approval Distribution</h3>
          <ResponsiveContainer width="100%" height={450}>
            <PieChart>
              <Pie dataKey="value" data={[
                {name:'Approved',value:totals.approved},
                {name:'Rejected',value:totals.rejected}
              ]} cx="55%" cy="50%" outerRadius={130} label={({name,value,percent})=>`${name} ${percent*100<=10?'':(percent*100).toFixed(0)}%`} minAngle={15}>
                <Cell fill="#10b981"/>
                <Cell fill="#ef4444"/>
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl mb-16 border border-gray-100">
        <h3 className="text-3xl font-bold mb-8 text-gray-800 flex items-center"><span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>🏛️ Top States by Volume</h3>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart data={states.slice(0,12)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="state" angle={-45} height={90} tick={{fontSize:12,fill:"#64748b"}}/>
            <YAxis tick={{fontSize:12,fill:"#64748b"}}/>
            <Tooltip/>
            <Bar dataKey="enrolments" fill="#8b5cf6" radius={[8,8,0,0]} barSize={30}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-10 rounded-3xl shadow-2xl border-4 border-amber-200">
        <h3 className="text-4xl font-black mb-8 text-amber-900 text-center flex items-center justify-center"><span className="w-4 h-4 bg-amber-500 rounded-full mr-4 animate-pulse"></span>HACKATHON INSIGHTS: Top 5 Districts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topDistricts.map((d,i)=>(<div key={i} className={`p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-4 ${d.reject_rate>10?'border-red-300 bg-red-50':'border-green-300 bg-green-50'} hover:-translate-y-3`}>
            <h4 className="font-bold text-xl mb-4 truncate">{d.district}</h4>
            <p className="text-3xl font-black mb-3 text-gray-800">{d.volume?.toLocaleString()}</p>
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${d.reject_rate>10?'bg-red-100 text-red-800':'bg-green-100 text-green-800'}`}>
              {d.reject_rate}% Reject Rate
            </div>
          </div>))}
        </div>
      </div>
    </div>
  </div>
  
);
};

export default Dashboard;

